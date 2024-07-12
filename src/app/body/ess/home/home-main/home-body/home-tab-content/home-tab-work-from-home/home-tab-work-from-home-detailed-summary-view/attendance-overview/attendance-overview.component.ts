import { Component, OnInit } from '@angular/core';
import {WorkFromHomeService} from '../../../../../../../../../service/work-from-home-services/work-from-home.service';
import {System} from '../../../../../../../../../_global/system';
import {Profile} from '../../../../../../../../../_global/profile';
import {inputs} from '@syncfusion/ej2-angular-heatmap/src/heatmap/heatmap.component';
import {GeneralOps} from "../../../../../../../../../utility/GeneralOps";
import {LeaveServiceService} from "../../../../../../../../../service/attendance-leave/leave-service.service";
import {CONSTANT} from "../../../../../../../../../utility/Constants";
import {ModalUiServiceService} from "../../../../../../../../../service/ui-services/modal-ui-service.service";
import {FileUploadServiceService} from "../../../../../../../../../service/support-services/file-upload-service.service";

@Component({
  selector: 'app-attendance-overview',
  templateUrl: './attendance-overview.component.html',
  styleUrls: ['./attendance-overview.component.css']
})
export class AttendanceOverviewComponent implements OnInit {

  projectName = 'All';
  fromDate: any;
  toDate: any;

  response;
  projects = [];
  responseDataLoaded = false;

  dailyHrs;
  weeklyHrs;
  utilizeLeavePercentage;
  unUsedLeaves;
  displayMessage;

  presentResponse;
  absentResponse;
  leaveResponse;
  activeHrsResponse;
  hrsPercentResponse;
  wfhPercentage;
  notLoggedEmployeeCount = 0;

  presentDataLoaded = false;
  absentDataLoaded = false;
  leaveDataLoaded = false;
  activeHrsDataLoaded = false;
  hrsPercentDataLoaded = false;

  offlineEmpDetails;
  offlineEmpDetailsLoad = false;
  selectedSystem;

  checkPermission = new GeneralOps();
  componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  // @ts-ignore
  // @input() dataSources ;
  dataSources = [];
  totalUnUsedLeaveCount = 0;
  totalUtilizedLeaveCount = 0;
  totalUnUsedAnnualCount = 0;
  totalUnUsedCasualCount = 0;
  totalUnUsedMedicalCount = 0;

  constructor(private workFromHomeService: WorkFromHomeService,
              private leaveService: LeaveServiceService,
              private modalService: ModalUiServiceService,
              private fileUploadService: FileUploadServiceService) {
  }

  ngOnInit() {
    this.getDataSoutces();
    this.selectedSystem = this.dataSources[0];
    const today = new Date();
    today.setDate(today.getDate());
    this.fromDate = this.toDate = today.toISOString().slice(0, 10);
    this.getMessageForAbsentOrHoliday();
    this.setDetailedSummaryReportObject();
    this.getProjectData();
    // this.getEmployeeLeaveDetails();
  }

  getEmployeeLeaveDetails() {
    this.leaveService.getProjectWiseEmployeesLeaveAllocations(0, 0,
      0, 0, 'Standard', 'ALL')
      .subscribe( data => {
        this.leaveResponse = data;
        for (const value of this.leaveResponse) {
          for (const lev of value.leaveDetails) {
            this.totalUnUsedLeaveCount = this.totalUnUsedLeaveCount + lev.remaining;
            this.totalUtilizedLeaveCount = this.totalUtilizedLeaveCount + lev.utilized;
            if (lev.leaveName === CONSTANT.LEAVE_NAMES.STANDARD.ANNUAL) {
              this.totalUnUsedAnnualCount = this.totalUnUsedAnnualCount + lev.remaining;
            } else if (lev.leaveName === CONSTANT.LEAVE_NAMES.STANDARD.CASUAL) {
              this.totalUnUsedCasualCount = this.totalUnUsedCasualCount + lev.remaining;
            } else if (lev.leaveName === CONSTANT.LEAVE_NAMES.STANDARD.MEDICAL) {
              this.totalUnUsedMedicalCount = this.totalUnUsedMedicalCount + lev.remaining;
            }
          }
        }
        this.totalUnUsedLeaveCount = Math.floor(this.totalUnUsedLeaveCount);
        this.utilizeLeavePercentage = Math.floor(this.totalUtilizedLeaveCount * 100 / (this.totalUnUsedLeaveCount + this.totalUtilizedLeaveCount));
        this.leaveDataLoaded = true;
      });
  }

  getMessageForAbsentOrHoliday() {
    const selectionObj = {
      'token' : Profile.USER_TOKEN
    };
    // this.workFromHomeService.getAttendanceOverviewHolidayOrAbsentMessage(selectionObj)
    //   .subscribe( data => {
    //     this.displayMessage = data;
    //   });
  }
  getProjectData() {
    this.workFromHomeService.getWfhProjects().subscribe(
      (response) => {
        this.projects = response;
      }
    );
  }

  setDetailedSummaryReportObject() {
    const selectionObj = {
      'fromDate': this.fromDate,
      'toDate': this.toDate,
      'range': 'custom',
      'key': System.generateRandomKey(32),
      'token': Profile.USER_TOKEN,
      'searchSystem' : this.dataSources[0]
    };
    // this.getAbsentEmployeeDetails(selectionObj);
    this.getLeaveCalculationData(selectionObj);
    this.getOverviewPresentData(selectionObj);
    this.getOverviewAbsentData(selectionObj);
    this.getOverviewActiveHrsData(selectionObj);
    this.getOverviewActiveHrsPercentages(selectionObj);
  }

  getOverviewPresentData(selectionObj) {
    this.workFromHomeService.getDetailedSummaryReportAttendanceOverviewPresentData(selectionObj)
      .subscribe(response => {
        this.presentResponse = response;
        this.wfhPercentage =  Math.floor(this.presentResponse.totalPresentCount / this.presentResponse.totalEmployeeCount * 100 );
        this.presentDataLoaded = true;
      });
  }

  getOverviewAbsentData(selectionObj) {
    this.workFromHomeService.getDetailedSummaryReportAttendanceOverviewAbsentData(selectionObj)
      .subscribe((response: any) => {
        this.absentResponse = response;
        this.notLoggedEmployeeCount = response.notLogged.length;
        this.absentDataLoaded = true;
    });
  }

  getOverviewActiveHrsData(selectionObj) {
    this.workFromHomeService.getDetailedSummaryReportAttendanceOverviewActiveHrsData(selectionObj)
      .subscribe(response => {
        this.activeHrsResponse = response;
        this.activeHrsDataLoaded = true;
    });
  }

  getOverviewActiveHrsPercentages(selectionObj) {
    this.workFromHomeService.getDetailedSummaryReportAttendanceOverviewActiveHrsPercentages(selectionObj)
      .subscribe(response => {
        this.hrsPercentResponse = response;
        this.dailyHrs = this.hrsPercentResponse.dailyPercentage;
        this.weeklyHrs = this.hrsPercentResponse.weeklyPercentage;
        this.hrsPercentDataLoaded = true;
    });
  }


  getAttendanceOverviewData(selectionObj: any) {
    this.workFromHomeService.getDetailedSummaryReportAttendanceOverviewData(selectionObj).subscribe(
      (response) => {
        this.response = response;
        this.dailyHrs = this.response.dailyPercent;
        this.weeklyHrs = this.response.weeklyPercent;
        this.responseDataLoaded = true;
      }
    );
  }

  getLeaveCalculationData(selectionObj: any) {
    this.workFromHomeService.getDetailedSummaryReportLeaveCalculations(selectionObj)
      .subscribe((response: any) => {
        this.leaveResponse = response;
        this.utilizeLeavePercentage =
          Math.floor((this.leaveResponse.totalUtilizedCount * 100 / this.leaveResponse.totalAllocatedCount));
        this.leaveDataLoaded = true;
      });
  }
  setDataForDateChanged() {
    this.presentDataLoaded = false;
    this.absentDataLoaded = false;
    this.activeHrsDataLoaded = false;
    this.hrsPercentDataLoaded = false;
    if (this.fromDate > this.toDate) {
      this.toDate = this.fromDate;
    }
    const selectionObj = {
      'fromDate': this.fromDate,
      'toDate': this.fromDate,
      'range': 'custom',
      'key': System.generateRandomKey(32),
      'token': Profile.USER_TOKEN,
      'searchSystem' : this.selectedSystem
    };
    // this.getAbsentEmployeeDetails(selectionObj);
    this.getLeaveCalculationData(selectionObj);
    this.getOverviewPresentData(selectionObj);
    this.getOverviewAbsentData(selectionObj);
    this.getOverviewActiveHrsData(selectionObj);
    this.getOverviewActiveHrsPercentages(selectionObj);
  }

  filterByProject() {

  }
  getAbsentEmployeeDetails(selectionObj) {
    this.workFromHomeService.getWWTOfflineEmployeeDetails(selectionObj)
        .subscribe( response => {
          this.offlineEmpDetails = response;
          this.offlineEmpDetailsLoad = true;
        });
  }

  getDataSoutces() {
    if (this.checkPermission.checkUserHavePermissionForSection('WorkEffortAttendanceOverviewWwt')) {
      this.dataSources.push('WWT');
    }
    if (this.checkPermission.checkUserHavePermissionForSection('WorkEffortAttendanceOverviewFaceRec')) {
      this.dataSources.push('FaceRec');
    }
  }

  getDataForSelectedSystem(datasource) {
    this.presentDataLoaded = false;
    this.absentDataLoaded = false;
    this.activeHrsDataLoaded = false;
    this.hrsPercentDataLoaded = false;
    if (this.fromDate > this.toDate) {
      this.toDate = this.fromDate;
    }
    const selectionObj = {
      'fromDate': this.fromDate,
      'toDate': this.toDate,
      'range': 'custom',
      'key': System.generateRandomKey(32),
      'token': Profile.USER_TOKEN,
      'searchSystem' : datasource
    };
    this.getAbsentEmployeeDetails(selectionObj);
    this.getOverviewPresentData(selectionObj);
    this.getOverviewAbsentData(selectionObj);
    this.getOverviewActiveHrsData(selectionObj);
    this.getOverviewActiveHrsPercentages(selectionObj);
  }
  formatNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  showModal(modalId) {
    this.modalService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalService.hideModal(modalId);
  }

  downloadExcel() {
    this.fileUploadService.exportAsExcelFile(this.absentResponse.notLogged, 'NotLoggedEmployeesOn_' + this.fromDate);
  }
}
