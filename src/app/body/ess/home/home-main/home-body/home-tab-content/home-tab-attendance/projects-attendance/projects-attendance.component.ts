import {Component, HostListener, OnInit} from '@angular/core';
import {Event} from '../../../../../../../../_global/event';
import {AttendanceServiceService} from '../../../../../../../../service/attendance-service.service';
import {
  EmployeeService
} from '../../../../../../../../new-design/hr-dashboard/hr-dashboard/service/employee/employee.service';
import {
  ProjectService
} from '../../../../../../../../new-design/hr-dashboard/hr-dashboard/service/project/project.service';
import {
  InterCommunicationServiceService
} from '../../../../../../../../service/support-services/inter-communication-service.service';
import {Router} from '@angular/router';
import {ModalUiServiceService} from '../../../../../../../../service/ui-services/modal-ui-service.service';
import {FileUploadServiceService} from '../../../../../../../../service/support-services/file-upload-service.service';
import {GeneralOps} from '../../../../../../../../utility/GeneralOps';
import {LeaveServiceService} from '../../../../../../../../service/attendance-leave/leave-service.service';

@Component({
  selector: 'app-projects-attendance',
  templateUrl: './projects-attendance.component.html',
  styleUrls: ['./projects-attendance.component.css']
})
export class ProjectsAttendanceComponent implements OnInit {

  componentPermission = new GeneralOps();
  allProjectsSummarySectionDisplay = true;
  selectedProjectAttendanceData;
  selectedDate = Event.setCurrentDateTime().processedFullDate;
  companiesList = [];
  businessUnitList = [];
  departmentList = [];
  cadresList = [];
  selectedCompanyID = 0;
  selectedBUID = 0;
  selectedDepID = 0;
  selectedCadreID = 0;
  preInsertDataLoaded = false;
  businessUnitsDataLoaded = false;
  departmentsDataLoaded = false;
  selectedDateAndTime = Event.setCurrentDateTime().processedFullDate + 'T' +
    Event.setCurrentDateTime().roundupHour + ':' + Event.setCurrentDateTime().roundupMinute + ':00';
  attendanceData;
  attendanceDataLoaded = true;
  presentPercentage;
  officePercentage;
  homePercentage;
  absentPercentage;
  leavePercentage;
  searchTerm = '';
  filterSectionDisplay = false;
  allProjects;
  modalHeader;
  modalSelectedSection;
  modalEmployeeList = [];
  presentEmployeeList = [];
  absentEmployeeList = [];
  wfoEmployeeList = [];
  wfhEmployeeList = [];
  leaveEmployeeList = [];
  notAWorkingDay = false;

  constructor(private attendanceService: AttendanceServiceService,
              private employeeService: EmployeeService,
              private projectService: ProjectService,
              private communicationService: InterCommunicationServiceService,
              private router: Router,
              private modalService: ModalUiServiceService,
              private fileUploadService: FileUploadServiceService,
              private leaveService: LeaveServiceService) { }

  ngOnInit() {
    this.getProjectsAttendanceData();
    this.getPreInsertData();
    this.getProjectsData();
    this.getDateSummary();
  }

  /**
   * this method used to get details about selected date
   * this will call on onInit & date change action
   * need to hide absent & leave cards if date is not a working day
   */
  getDateSummary() {
    this.leaveService.getWorkingDays(this.selectedDate, this.selectedDate)
      .subscribe((data: any) => {
        this.notAWorkingDay = data.workingDays.count === 0;
      });
  }

  /**
   * get all projects data to pass child component
   */
  getProjectsData() {
    this.projectService.getProjectsData(this.selectedCompanyID)
    // this.projectService.getProjectsData(1)
      .subscribe((data: any) => {
        this.allProjects = data;
      });
  }

  /**
   * call pre insert data get endpoint for set
   * company list and cadres list...
   * after retrieve companies data call the
   * getBusinessUnitsData() method
   */
  getPreInsertData() {
    this.employeeService.getEmployeePreInsertData(1)
      .subscribe((data: any) => {
        this.companiesList = data.workCompanies;
        this.cadresList = data.cadres;
        this.preInsertDataLoaded = true;
        this.getBusinessUnitsData();
      });
  }

  /**
   * this will call after set value to this.selectedCompanyID
   * it also call when company change from dropdown.
   * after set value to this.selectedBUID then call endpoint to get departments data
   */
  getBusinessUnitsData() {
    this.businessUnitsDataLoaded = false;
    this.selectedBUID = 0;
    this.selectedDepID = 0;
    this.employeeService.getBusinessUnits(this.selectedCompanyID)
      .subscribe((data: any) => {
        this.businessUnitList = data;
        this.businessUnitsDataLoaded = true;
        this.getDepartmentsData();
      });
  }

  /**
   * this will call after data set to this.selectedBUID
   * it will call again when business unit change from dropdown
   */
  getDepartmentsData() {
    this.selectedDepID = 0;
    this.departmentsDataLoaded = false;
    this.employeeService.getDepartments(this.selectedCompanyID, this.selectedBUID)
      .subscribe((data: any) => {
        this.departmentList = data;
        this.departmentsDataLoaded = true;
      });
  }

  /**
   * this will call on onInit
   * also it will call on dateChange, companyChange, businessUnitChange & depChange actions
   * after set data to this.attendanceData it will call interCommunicationService to update attendance records there
   * for reuse.
   */
  getProjectsAttendanceData() {
    this.absentEmployeeList = [];
    this.leaveEmployeeList = [];
    this.wfoEmployeeList = [];
    this.wfhEmployeeList = [];
    this.presentEmployeeList = [];
    this.attendanceService.getProjectWiseAttendance(this.selectedDateAndTime, this.selectedBUID,
      this.selectedCadreID, this.selectedCompanyID, this.selectedDepID)
      .subscribe((data: any) => {
        this.attendanceData =  data;
        this.presentPercentage = Math.floor(data.presentCount / data.totalCount * 100);
        this.absentPercentage = Math.floor(data.absentCount / data.totalCount * 100);
        this.officePercentage = Math.floor(data.officeCount / data.totalCount * 100);
        this.homePercentage = Math.floor(data.homeCount / data.totalCount * 100);
        this.leavePercentage = Math.floor(data.leaveCount / data.totalCount * 100);
        this.attendanceDataLoaded = true;
        this.communicationService.updateProjectsAttendanceData({status: true, data: this.attendanceData});


        for (const element of this.attendanceData.currentAttendanceProjectWiseResponseList) {
          this.absentEmployeeList = this.absentEmployeeList.concat(element.currentAttendanceResponse.absentAttendances);
          this.leaveEmployeeList = this.leaveEmployeeList.concat(element.currentAttendanceResponse.leaveAttendances);
          this.wfoEmployeeList = this.wfoEmployeeList.concat(element.currentAttendanceResponse.officeAttendances);
          this.wfhEmployeeList = this.wfhEmployeeList.concat(element.currentAttendanceResponse.homeAttendances);
          this.presentEmployeeList = this.presentEmployeeList.concat(element.currentAttendanceResponse.officeAttendances,
            element.currentAttendanceResponse.homeAttendances);
        }
        this.presentEmployeeList = this.removeDuplicates(this.presentEmployeeList, 'profileID');
        this.absentEmployeeList = this.removeDuplicates(this.absentEmployeeList, 'profileID');
        this.wfoEmployeeList = this.removeDuplicates(this.wfoEmployeeList, 'profileID');
        this.wfhEmployeeList = this.removeDuplicates(this.wfhEmployeeList, 'profileID');
        this.leaveEmployeeList = this.removeDuplicates(this.leaveEmployeeList, 'profileID');
      });
  }

  /**
   * JavaScript code to remove duplicates from an array based on a specified property.
   *
   * @param {any[]} array - The array from which duplicates are to be removed.
   * @param {string} property - The property based on which duplicates are to be checked.
   * @returns {any[]} - The array with duplicates removed.
   */
  removeDuplicates(array: any[], property: string) {
    const uniqueItems = new Map();
    const result = [];

    for (const item of array) {
      const value = item[property];
      if (!uniqueItems.has(value)) {
        uniqueItems.set(value, true);
        result.push(item);
      }
    }
    return result;
  }

  /**
   * need to download some fields from json we got.
   * then it will set data here and call common service about excel download to download those
   */
  downloadExcel() {
    const requiredFields = ['empName', 'empNo', 'empMobileNo', 'projectName'];
    const filteredData = this.modalEmployeeList.map(item => requiredFields.reduce((acc, curr) => ({ ...acc, [curr]: item[curr] }), {}));
    this.fileUploadService.exportJsonAsExcelFile(filteredData, this.modalSelectedSection + '_Employees_On_' + this.selectedDate);
  }

  /**
   * this will call when date change from date input.
   * if selected date < current date then time set to '23:59:00' to get data for that day.
   * if selected date is same as current date current time will send to backend.
   * after set date & time accordingly then call this.getProjectsAttendanceData() to get attendance data
   */
  dateChanged() {
    this.attendanceDataLoaded = false;
    this.getDateSummary();
    if (this.selectedDate < Event.setCurrentDateTime().processedFullDate) {
      this.selectedDateAndTime = this.selectedDate + 'T23:59:00';
    } else {
      this.selectedDateAndTime = this.selectedDate + 'T' +
        Event.setCurrentDateTime().roundupHour + ':' + Event.setCurrentDateTime().roundupMinute + ':00';
    }
    this.getProjectsAttendanceData();
  }

  displayHideFilterSection($event) {
    $event.stopPropagation();
    this.filterSectionDisplay = !this.filterSectionDisplay;
  }

  viewSelectedProjectSummary(project) {
    this.selectedProjectAttendanceData = project;
    this.allProjectsSummarySectionDisplay = false;
  }

  backToSummaryPage() {
    if (!this.allProjectsSummarySectionDisplay) {
      this.allProjectsSummarySectionDisplay = true;
    } else {
      this.router.navigate(['./home/main']);
    }
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.filterSectionDisplay = false;
  }

  /**
   * if there's no image for project we will display common image in here
   * @param event
   */
  setDefaultPic(event: any) {
    event.target.src = '/assets/images/shuttle.png';
  }

  showModal(modalID, modalHeaderName, section) {
    switch (section) {
      case 'Present':
        this.modalEmployeeList = this.presentEmployeeList;
        break;
      case 'WFO':
        this.modalEmployeeList = this.wfoEmployeeList;
        break;
      case 'WFH':
        this.modalEmployeeList = this.wfhEmployeeList;
        break;
      case 'Absent':
        this.modalEmployeeList = this.absentEmployeeList;
        break;
      case 'Leave':
        this.modalEmployeeList = this.leaveEmployeeList;
        break;
    }
    this.modalSelectedSection = section;
    this.modalHeader = modalHeaderName + ' On ' + this.selectedDate;
    this.modalService.showModal(modalID);
  }

  hideModal(modalID) {
    this.modalHeader = '';
    this.modalEmployeeList = [];
    this.modalService.hideModal(modalID);
  }

}
