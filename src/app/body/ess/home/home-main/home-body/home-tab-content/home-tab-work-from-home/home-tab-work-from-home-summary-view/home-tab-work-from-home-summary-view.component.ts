import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WorkFromHomeService} from '../../../../../../../../service/work-from-home-services/work-from-home.service';
import {Subscription} from 'rxjs';
import {InterCommunicationServiceService} from '../../../../../../../../service/support-services/inter-communication-service.service';
import * as jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import * as moment from 'moment';
import {Profile} from '../../../../../../../../_global/profile';
import {AttendanceServiceService} from '../../../../../../../../service/attendance-service.service';
import {ModalUiServiceService} from '../../../../../../../../service/ui-services/modal-ui-service.service';
import {GeneralOps} from '../../../../../../../../utility/GeneralOps';

@Component({
  selector: 'app-home-tab-work-from-home-summary-view',
  templateUrl: './home-tab-work-from-home-summary-view.component.html',
  styleUrls: ['./home-tab-work-from-home-summary-view.component.css']
})
export class HomeTabWorkFromHomeSummaryViewComponent implements OnInit, OnDestroy {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  wwtHeaderData: Subscription;
  userCustomConfigurationsData: Subscription;
  selectionObj: any;
  finalSelectionObjKey: any;
  message: string;
  gettingDataMessage: string;
  summaryDataLoaded: boolean;

  total: any;
  absentCount: any;
  lessThanSixAndHalfTimeCompleteData: any;
  leaveDetails: any;
  totalLeaves: any;
  totalRegistered: any;
  totalUsersProjectWise: any;

  projectNamesWithUsersLessThanSixAndHalfHours = new Array<any>();
  projectCountsWithUsersLessThanSixAndHalfHours = new Array<any>();

  projectNameAsc: boolean;
  projectNameDsc: boolean;

  barChart = [];
  pieChart = [];

  doughnutChartDataLoaded: boolean;
  userWorkTimeDoughnutChartLabels = [];
  userWorkTimeDoughnutChartData = [];

  barChartDataLoaded: boolean;
  projectWiseUserCountBarChartLabels = [];
  projectWiseUserCountBarChartData = [];
  projectWiseUserCountBarChartResponse = [];

  usersWithProjectTimeFilter: any;
  selectedProjectName: any;
  showLessWorkedUsers: boolean;
  dateRange: any;

  users = [];
  userEmailsLoaded: boolean;
  selectionObjectSet: boolean;

  timeGaps = [];
  groupsAndProjectsExcluded = [];

  sumCount = 0;

  rangeCustomWidget = false;
  rangeSingleMonthWidget = false;
  rangeTypeTrue: any;
  selectedFromDate = moment().format('YYYY-MM-DD');
  selectedToDate = moment().format('YYYY-MM-DD');
  fromDate: any;
  toDate: any;
  errorMessage: string;
  activeDashboard: boolean;
  selectedEmail: any;
  selectedMonthFilter: string;
  rangeType = 'R11';
  loadedMonthFilters: string[] = [];
  isMonthFilter = false;
  timeGapFrom: any;
  timeGapTo: any;
  selectedTimeGap = '8';


  @ViewChild('summaryReportContent', {static: false}) summaryReportContent: ElementRef;
  printing: boolean;
  messages = [];
  selectedLeaveTypeDetails = [];

  constructor(private workFromHomeService: WorkFromHomeService,
              private interCommunicationService: InterCommunicationServiceService,
              private attendanceService: AttendanceServiceService,
              private modalUiService: ModalUiServiceService) { }

  ngOnInit() {
    this.rangeTypeTrue = 'yesterday';
    this.showLessWorkedUsers = false;
    this.barChartDataLoaded = false;
    this.doughnutChartDataLoaded = false;
    // this.setWorkFromHomeObject();
    // this.loadAttendanceMonthFilter();
    this.getSummaryReportDataWithSystemFilterConfigurations();
    this.getSummaryReportDataWithCustomFilterConfigurations();
  }

  // loadAttendanceMonthFilter() {
  //   this.attendanceService.getMonthFilterAttendanceMainDashboard().subscribe((data: any) => {
  //     this.loadedMonthFilters = data;
  //     this.selectedMonthFilter = this.loadedMonthFilters[0];
  //     this.isMonthFilter = true;
  //   });
  // }

  getSummaryReportDataWithSystemFilterConfigurations() {
    this.wwtHeaderData = this.interCommunicationService.workFromHomeObjectToUpdate.subscribe(
      selectionObj => {
          if (selectionObj.hasOwnProperty('key') && selectionObj['key'] !== this.finalSelectionObjKey &&
            (selectionObj['range'] !== this.dateRange || this.dateRange === 'custom')) {
            this.selectionObj = selectionObj;
            this.selectionObjectSet = true;
            this.gettingDataMessage = 'Obtaining Data from the APIs';
            this.summaryReportInitialDataSetting(selectionObj);
            this.workFromHomeService.generateSummaryReportWithSystemSavedFilterConfigurations(this.selectionObj).subscribe(
              (response) => {
                if (response) {
                  if (this.finalSelectionObjKey === response['key']) {
                    this.setSummaryReportResponse(response);
                  }
                } else {
                  this.gettingDataMessage = '';
                  this.message = 'No Data Available!';
                }
              }, (errors) => {
                this.message = '';
                this.gettingDataMessage = 'An Error Occurred while Reading Data From the API ';
              });
          }
      });
  }

  getSummaryReportDataWithCustomFilterConfigurations() {
    this.userCustomConfigurationsData = this.interCommunicationService.summaryReportToUpdate.subscribe(
      configurationObject => {
        if (configurationObject) {
          if (configurationObject['selectionObj'].hasOwnProperty('key') && configurationObject['selectionObj']['key'] !== undefined) {
            this.gettingDataMessage = 'Obtaining Data from the API with Custom User Configurations';
            this.selectionObj =   configurationObject['selectionObj'];
            this.selectionObjectSet = true;
            this.summaryReportInitialDataSetting(this.selectionObj);
            this.workFromHomeService.generateSummaryReportWithFilterConfigurations(configurationObject).subscribe (
              (response) => {
                if (response) {
                  if (this.finalSelectionObjKey === response['key']) {
                    this.setSummaryReportResponse(response);
                  }
                } else {
                  this.gettingDataMessage = '';
                  this.message = 'No Data Available!';
                }
              }, (errors) => {
                this.message = '';
                this.gettingDataMessage = 'An Error Occurred while Reading Data From the API ';
              });
          }
        }
      });
  }

  private summaryReportInitialDataSetting(selectionObj) {
    this.userWorkTimeDoughnutChartLabels = [];
    this.userWorkTimeDoughnutChartData = [];
    this.summaryDataLoaded = false;
    this.barChartDataLoaded = false;
    this.doughnutChartDataLoaded = false;
    this.showLessWorkedUsers = false;
    this.finalSelectionObjKey = selectionObj.key;
    this.dateRange = this.selectionObj['range'];
  }

  private setSummaryReportResponse(response: Object) {
    this.total = response['total'];
    this.timeGaps = response['timeGaps'];
    this.absentCount = response['absentCount'];
    this.lessThanSixAndHalfTimeCompleteData = response['lessThanSixAndHalfTimeCompleteData'];
    // this.lessThanSixAndHalfTimeCompleteData.forEach((packet, index) => {
    //   if (packet[0] === 'HRM') {
    //     this.lessThanSixAndHalfTimeCompleteData.splice(index, 1);
    //   }
    // });
    this.leaveDetails = response['leaveDetails'];
    this.totalLeaves = response['totalLeaves'];
    this.totalRegistered = response['totalRegistered'];
    this.totalUsersProjectWise = response['totalUsersProjectWise'];
    this.groupsAndProjectsExcluded = response['groupsAndProjectsExcluded'];
    this.messages = response['messages'];
    this.summaryDataLoaded = true;
    this.gettingDataMessage = '';
    this.setUserWorkTimeDoughnutChartParameters();
    // this.drawProjectTimeChart();
    this.setProjectWiseUserCountBarChartParameters();
    this.displayUsersWithLessTime(this.lessThanSixAndHalfTimeCompleteData[0][1], this.lessThanSixAndHalfTimeCompleteData[0][0]);
  }

  setUserWorkTimeDoughnutChartParameters() {
    this.timeGaps.forEach((timeGap) => {
      this.userWorkTimeDoughnutChartLabels.push(timeGap[0].split('-')[0] + 'hrs - ' + timeGap[0].split('-')[1] + 'hrs');
      this.userWorkTimeDoughnutChartData.push(timeGap[1]);
    });

    // this.userWorkTimeDoughnutChartLabels =
    // ['12hrs or Above', '10hrs to 12hrs',	'8hrs to 10hrs',	'6.5hrs to 8hrs', '4hrs to 6.5hrs', 'less than 4 hrs',
    //   'Offline'];
    // this.userWorkTimeDoughnutChartData = [this.twelveHoursOrAbove , this.tenHoursToTwelveHours, this.eightHoursToTenHoursCount,
    //   this.sixAndHalfHoursToEightHoursCount, this.fourHoursToSixAndHalfHoursCount,
    //   this.lessThanFourHoursCount, this.absentCount];

    this.doughnutChartDataLoaded = true;
  }

  setProjectWiseUserCountBarChartParameters() {
    this.projectWiseUserCountBarChartData = [];
    this.projectWiseUserCountBarChartLabels = [];
    this.projectWiseUserCountBarChartResponse = [];
    this.lessThanSixAndHalfTimeCompleteData.forEach((value) => {
      const packet: string[] = [];
      packet.push(value[0]);
      packet.push(value[2]);
      this.projectWiseUserCountBarChartResponse.push(packet);
      this.projectWiseUserCountBarChartLabels.push(value[0]);
      const count = +value[2];
      this.projectWiseUserCountBarChartData.push(count);
    });
    this.barChartDataLoaded = true;
  }

  sortByProjectNameAsc() {
    this.projectNameAsc = true;
    this.projectNameDsc = false;
    this.lessThanSixAndHalfTimeCompleteData = this.lessThanSixAndHalfTimeCompleteData.sort((a, b) => (a[0] < b[0] ? -1 : 1));
  }

  sortByProjectNameDsc() {
    this.projectNameAsc = false;
    this.projectNameDsc = true;
    this.lessThanSixAndHalfTimeCompleteData = this.lessThanSixAndHalfTimeCompleteData.sort((a, b) => (b[0] < a[0] ? -1 : 1));
  }

  displayUsersWithLessTime(data, projectName) {
    // let array = [];
    // data.forEach((value) => {
    //   let v = [];
    //   var splitted = value.split('#');
    //   v.push(splitted[0]);
    //   v.push(splitted[1]);
    //   array.push(v);
    // });
    this.selectedProjectName = projectName;
    this.usersWithProjectTimeFilter = data;
    this.showLessWorkedUsers = true;
    // window.scrollTo(0,document.body.scrollHeight);
  }

  printPage() {
    window.print();
  }

  downloadAsPDF() {
    this.printing = true;
    htmlToImage.toCanvas(document.getElementById('summaryReportContent'),  {
      backgroundColor: 'white',
      cacheBust: true
    })
      .then(function (canvas) {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        const position = 0;
        pdf.addImage(canvas, 'PNG', 0, position, width, (height + imgHeight) / 2);
        pdf.save(new Date().toLocaleDateString());
      }).then((blob) => {
        this.printing = false;
    });
  }

  ngOnDestroy() {
    if (this.wwtHeaderData) {
      this.wwtHeaderData.unsubscribe();
    }
    if (this.userCustomConfigurationsData) {
      this.userCustomConfigurationsData.unsubscribe();
    }
  }
  showSaveQuoteModal(modalId, leaveData) {
    this.selectedLeaveTypeDetails = leaveData;
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }


  // setDateRange(rangeType: any) {
  //   if (rangeType === 'R5') {
  //     this.rangeCustomWidget = true;
  //     this.rangeSingleMonthWidget = false;
  //   } else if (rangeType === 'R6') {
  //     this.rangeSingleMonthWidget = true;
  //     this.rangeCustomWidget = false;
  //   }else {
  //     this.rangeCustomWidget = false;
  //     this.rangeSingleMonthWidget = false;
  //   }
  //   if (rangeType === 'R1') {
  //     this.rangeTypeTrue = 'last 7 days';
  //   }else if (rangeType === 'R2') {
  //     this.rangeTypeTrue = 'last week';
  //   }else if (rangeType === 'R3') {
  //     this.rangeTypeTrue = 'this week';
  //   }else if (rangeType === 'R4') {
  //     this.rangeTypeTrue = 'today';
  //   }else if (rangeType === 'R6') {
  //     this.rangeTypeTrue = 'month';
  //   }else if (rangeType === 'R5') {
  //     this.rangeTypeTrue = 'custom';
  //     this.fromDate = this.selectedFromDate;
  //     this.toDate = this.selectedToDate;
  //   }else if (rangeType === 'R11') {
  //     this.rangeTypeTrue = 'yesterday';
  //   }else if (rangeType === 'R8') {
  //     this.rangeTypeTrue = 'this month';
  //   }else if (rangeType === 'R9') {
  //     this.rangeTypeTrue = 'last month';
  //   }else if (rangeType === 'R10') {
  //     this.rangeTypeTrue = 'this year';
  //   }else if (rangeType === 'R7') {
  //     this.rangeTypeTrue = 'quarter';
  //   } else {
  //     this.errorMessage = 'An Error Occurred while setting the Time Range!';
  //     return null;
  //   }
  //   this.setWorkFromHomeObject();
  // }
  //
  // setWorkFromHomeObject() {
  //   this.activeDashboard = false;
  //   if (!this.selectedEmail) {
  //     this.selectedEmail = null;
  //   }
  //   if (!this.selectedProjectName) {
  //     this.selectedProjectName = 'All';
  //   }
  //   const selectionObj = {
  //     'fromDate': this.fromDate,
  //     'toDate': this.toDate,
  //     'fromTime': this.timeGapFrom,
  //     'toTime': this.timeGapTo,
  //     'month': this.selectedMonthFilter,
  //     'range': this.rangeTypeTrue,
  //     'timeGap': this.selectedTimeGap,
  //     'email': this.selectedEmail,
  //     'projectName': this.selectedProjectName,
  //     'key': System.generateRandomKey(32),
  //     'token': Profile.USER_TOKEN,
  //     'today': new Date(),
  //     'emp_no': Profile.EMPLOYEE_ID,
  //     'searchEmail' : 'All'
  //   };
  //   // const selectionObj = {
  //   //   'fromDate': '2020-07-28',
  //   //   'toDate': '2020-08-27',
  //   //   'fromTime': this.timeGapFrom,
  //   //   'toTime': this.timeGapTo,
  //   //   'month': this.selectedMonthFilter,
  //   //   'range': 'custom',
  //   //   'timeGap': this.selectedTimeGap,
  //   //   'email': this.selectedEmail,
  //   //   'projectName': this.selectedProjectName,
  //   //   'key': System.generateRandomKey(32),
  //   //   'token': Profile.USER_TOKEN,
  //   //   'today': new Date()
  //   // };
  //   this.interCommunicationService.updateWorkFromHomeRecords(selectionObj);
  //   this.activeDashboard = true;
  // }

}
