import {Component, Input, OnInit} from '@angular/core';
import {
  InterCommunicationServiceService
} from '../../../../../../../../../service/support-services/inter-communication-service.service';
import {ModalUiServiceService} from '../../../../../../../../../service/ui-services/modal-ui-service.service';
import {
  FileUploadServiceService
} from '../../../../../../../../../service/support-services/file-upload-service.service';
import {Event} from '../../../../../../../../../_global/event';
@Component({
  selector: 'app-project-wise',
  templateUrl: './project-wise.component.html',
  styleUrls: ['./project-wise.component.css']
})
export class ProjectWiseComponent implements OnInit {

  @Input() allProjects;
  @Input() selectedProjectData;
  @Input() allProjectAttendanceData;
  selectedProjectName = 'Not Assigned';
  selectedStatus = 'All';
  searchTerm = '';
  searchProject = '';
  modalHeader;
  modalEmployeeList = [];
  modalSelectedSection;
  selectedDate = Event.setCurrentDateTime().processedFullDate;
  presentEmployeeList = [];
  absentEmployeeList = [];
  wfoEmployeeList = [];
  wfhEmployeeList = [];
  leaveEmployeeList = [];

  constructor(private communicationService: InterCommunicationServiceService,
              private modalService: ModalUiServiceService,
              private fileUploadService: FileUploadServiceService) { }

  ngOnInit() {
    this.selectedProjectName = this.allProjects.find(o => o.projectID === this.selectedProjectData.projectID).projectName;
    this.communicationService.OnUpdateProjectsAttendanceData.subscribe((result: any) => {
      if (result.status) {
        this.setSelectedProjectDataWithFilters(result.data);
      }
    });
  }

  setSelectedProjectDataWithFilters(response) {
    this.presentEmployeeList = [];
    this.absentEmployeeList = [];
    this.wfoEmployeeList = [];
    this.wfhEmployeeList = [];
    this.leaveEmployeeList = [];


    this.selectedProjectData = response.currentAttendanceProjectWiseResponseList
      .find(o => o.projectName === this.selectedProjectName);
    this.allProjectAttendanceData = response;


    this.absentEmployeeList = this.selectedProjectData.currentAttendanceResponse.absentAttendances;
    this.wfoEmployeeList = this.selectedProjectData.currentAttendanceResponse.officeAttendances;
    this.wfhEmployeeList = this.selectedProjectData.currentAttendanceResponse.homeAttendances;
    this.leaveEmployeeList = this.selectedProjectData.currentAttendanceResponse.leaveAttendances;
    this.presentEmployeeList = this.selectedProjectData.currentAttendanceResponse.officeAttendances.concat(
      this.selectedProjectData.currentAttendanceResponse.homeAttendances);
  }

  /**
   * get selected project data
   * @param project
   */
  setSelectedProjectData(project) {
    this.selectedProjectName = project.projectName;
    this.selectedProjectData =
      this.allProjectAttendanceData.currentAttendanceProjectWiseResponseList.find(o => o.projectName === project.projectName);
  }

  setDefaultPic(event: any) {
    event.target.src = '/assets/images/shuttle.png';
  }

  downloadExcel() {
    const requiredFields = ['empName', 'empNo', 'empMobileNo', 'projectName'];
    const filteredData = this.modalEmployeeList.map(item => requiredFields.reduce((acc, curr) => ({ ...acc, [curr]: item[curr] }), {}));
    this.fileUploadService.exportJsonAsExcelFile(filteredData, this.modalSelectedSection + '_Employees_On_' + this.selectedDate);
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
