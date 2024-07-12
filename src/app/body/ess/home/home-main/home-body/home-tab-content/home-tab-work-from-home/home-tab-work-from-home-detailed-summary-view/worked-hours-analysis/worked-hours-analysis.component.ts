import { Component, OnInit } from '@angular/core';
import {WorkFromHomeService} from '../../../../../../../../../service/work-from-home-services/work-from-home.service';
import {System} from '../../../../../../../../../_global/system';
import {Profile} from '../../../../../../../../../_global/profile';
import {GeneralOps} from "../../../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-worked-hours-analysis',
  templateUrl: './worked-hours-analysis.component.html',
  styleUrls: ['./worked-hours-analysis.component.css']
})
export class WorkedHoursAnalysisComponent implements OnInit {


  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  dataSources= [];

  fromDate: any;
  toDate: any;
  projectName = 'All';
  array = [];

  projects: any;
  response: any;
  lineChartResponseForRange;
  workedHourAnalysisData: any;

  responseDataLoaded: boolean;

  chartLabels = [];

  notRecorded: any;
  belowTwoHours: any;
  twoHoursToFourHours: any;
  fourHoursToSixHours: any;
  sixHoursToEightHours: any;
  eightHoursToTenHours: any;
  tenHoursToTwelveHours: any;
  twelveHoursToFifteenHours: any;
  fifteenHoursToTwentyHours: any;
  moreThanTwentyHours: any;

  lastWeekClicked = true;
  otherWeekClicked = false;
  weekRadiosClicked: boolean;
  defaultMonthToOtherMonthClicked = false;
  otherYearClicked = false;
  lastMonthClicked = true;
  lastYearClicked = true;
  weekSelections = 'ThisWeek';
  monthSelections = 'ThisMonth';
  yearSelections = 'This Year';

  lastWeekChecked = false;
  lastMonthChecked = false;
  lastYearChecked = false;
  dataLoaded = false;
  selectedDateForWeek: any;
  selectedDateForMonth;
  selectedDateForYear;

  DAILY_IDENTIFIER = 'DAY';
  WEEK_IDENTIFIER = 'WEEK';
  MONTH_IDENTIFIER = 'MONTH';
  YEAR_IDENTIFIER = 'YEAR';

  selectedEmail = 'All';
  users = [];

  public chartData = [
    {
      label: 'Daily        ',
      data: []
    },
    {
      label: 'Weekly        ',
      data: []
    },
    {
      label: 'Monthly        ',
      data: []
    },
    {
      label: 'Yearly        ',
      data: []
    }
  ];


  public barChartLabels: string[] = [];
  public barChartData = [{data: [], backgroundColor: []}];
  public barChartColors = [];
  barChartMaximum: number;
  taskTimeDataForBar;
  taskTimeResponse = false;

  userWorkTimeDoughnutChartLabels = [];
  userWorkTimeDoughnutChartData = [];
  timeGaps = [];
  doughnutChartDataLoaded: boolean;
  finalSelectionObjKey: any;
  private zeroValue: number;
  selectedSystem;


  constructor(private workFromHomeService: WorkFromHomeService) {
  }

  ngOnInit() {
    this.getDataSoutces();
    this.selectedSystem = this.dataSources[0];
    const today = new Date();
    today.setDate(today.getDate());
    this.fromDate = this.toDate = today.toISOString().slice(0, 10);
    this.finalSelectionObjKey = System.generateRandomKey(32);
    this.getUserData();
    this.getProjectData();
    this.setDetailedSummaryReportObject();
    this.dataLoaded = true;
  }

  getUserData() {
    this.workFromHomeService.getWfhUsers().subscribe(
      (response) => {
        this.users = response;
      }
    );
  }
  getProjectData() {
    this.workFromHomeService.getWfhProjects().subscribe(
      (response) => {
        this.projects = response;
      }
    );
  }

  getWorkDataForSelectedProject() {
    if (this.projectName !== 'All') {
      this.workFromHomeService.getSelectedProjectMembers(this.fromDate, this.projectName)
        .subscribe(response => {
          this.users = response;
        });
    }
    this.setDetailedSummaryReportObject();
  }

  setDetailedSummaryReportObject() {
    this.loadingChartData();
    this.responseDataLoaded = false;
    this.doughnutChartDataLoaded = false;
    this.taskTimeResponse = false;
    this.barChartData[0].data = [];
    this.barChartData[0].backgroundColor = [];
    this.userWorkTimeDoughnutChartData = [];
    this.userWorkTimeDoughnutChartLabels = [];
    const selectionObj = {
      'fromDate' : this.fromDate,
      'toDate' : this.fromDate,
      'range' : 'custom',
      'key' : this.finalSelectionObjKey,
      'token' : Profile.USER_TOKEN,
      'yesterdayWeekMonth' : this.DAILY_IDENTIFIER,
      'emp_no' : Profile.EMPLOYEE_ID,
      'today' : new Date(),
      'projectName' : this.projectName,
      'searchEmail' : this.selectedEmail,
      'searchSystem' : this.selectedSystem
    };
    this.getWorkedHoursAnalysisData(selectionObj);
    this.getTimeAnalysisData(selectionObj);
  }
  getWorkedHoursAnalysisData(selectionObj) {
    this.workFromHomeService.getDetailedSummaryReportWorkedHoursAnalysisWWTData(selectionObj).subscribe(
      (response) => {
        this.workedHourAnalysisData = response;
        this.response = this.workedHourAnalysisData.lineChartData;
        this.array  = [];
        this.getDataFromOriginalResponse(this.DAILY_IDENTIFIER);
        this.setSummaryReportResponse(this.workedHourAnalysisData.pieChartData);
        this.responseDataLoaded = true;
      }
    );
  }

  setSummaryReportResponse(response) {
    this.timeGaps = response;

    this.timeGaps.forEach((timeGap) => {
      this.userWorkTimeDoughnutChartLabels.push(timeGap[0].split('-')[0] + '-' + timeGap[0].split('-')[1] + 'hrs');
      this.userWorkTimeDoughnutChartData.push(timeGap[1]);
    });
    this.doughnutChartDataLoaded = true;
  }
  getTimeAnalysisData(selectionObj) {
    this.workFromHomeService.getDetailedSummaryReportTimeAnalysisWWTData(selectionObj)
      .subscribe(response => {
        this.taskTimeDataForBar =  response;
          this.displayBarChartData();
      });
  }
  displayBarChartData() {
    const actual = [];
    const expected = [];
    expected.length = 0;
    actual.push(this.taskTimeDataForBar.avgForDate);
    actual.push(this.taskTimeDataForBar.avgForWeek);
    actual.push(this.taskTimeDataForBar.avgForMonth);
    actual.push(this.taskTimeDataForBar.avgForYear);

    this.barChartData[0].data = actual;
    this.barChartMaximum = Math.max(...this.barChartData[0].data) + 1;
    this.barChartLabels = ['Day', 'Week', 'Month', 'Year'];
    this.barChartColors = ['#22a6f9', '#aad18e', '#ffe69b' , '#ff99ff'];
    this.barChartData[0].backgroundColor = ['#22a6f9', '#aad18e', '#ffe69b' , '#ff99ff'];
    this.taskTimeResponse = true;
  }

  getDataFromOriginalResponse(selectedTimePeriod) {
    this.zeroValue = 0;
    this.notRecorded = this.response['notRecorded'];
    this.belowTwoHours = this.response['belowTwoHours'];
    this.twoHoursToFourHours = this.response['twoHoursToFourHours'];
    this.fourHoursToSixHours = this.response['fourHoursToSixHours'];
    this.sixHoursToEightHours = this.response['sixHoursToEightHours'];
    this.eightHoursToTenHours = this.response['eightHoursToTenHours'];
    this.tenHoursToTwelveHours = this.response['tenToTwelveHours'];
    this.twelveHoursToFifteenHours = this.response['twelveHoursToFifteenHours'];
    this.fifteenHoursToTwentyHours = this.response['fifteenHoursToTwentyHours'];
    this.moreThanTwentyHours = this.response['overTwentyHours'];
    this.forgeChartData(selectedTimePeriod);
  }

  forgeChartData(selectedTimePeriod) {
    this.array.push( [this.zeroValue, this.notRecorded, this.belowTwoHours, this.twoHoursToFourHours, this.fourHoursToSixHours,
      this.sixHoursToEightHours, this.eightHoursToTenHours, this.tenHoursToTwelveHours, this.twelveHoursToFifteenHours,
      this.fifteenHoursToTwentyHours, this.moreThanTwentyHours]);

    if (selectedTimePeriod === this.DAILY_IDENTIFIER ) {
        this.chartData[0].data = this.array[this.array.length - 1];
    }
    if (selectedTimePeriod === this.WEEK_IDENTIFIER ) {
      if (this.lastWeekChecked === true) {
        this.chartData[1].data = this.array[this.array.length - 1];
      } else {
        this.chartData[1].data = [];
      }

    }
    if (selectedTimePeriod === this.MONTH_IDENTIFIER) {
      if (this.lastMonthChecked) {
        this.chartData[2].data = this.array[this.array.length - 1];
      } else {
        this.chartData[2].data = [];
      }
    }
    if (selectedTimePeriod === this.YEAR_IDENTIFIER) {
      if (this.lastYearChecked) {
        this.chartData[3].data = this.array[this.array.length - 1];
      } else {
        this.chartData[3].data = [];
      }
    }
    this.chartLabels = [' ' , 'Absent', '< 2hrs', '2-4hrs', '4-6hrs', '6-8hrs', '8-10hrs',
      '10-12hrs', '12-15hrs', '15-20hrs', '> 20hrs'];
  }

  loadingChartData() {
    this.zeroValue = 0;
    this.notRecorded = 0;
    this.belowTwoHours = 0;
    this.twoHoursToFourHours = 0;
    this.fourHoursToSixHours = 0;
    this.sixHoursToEightHours = 0;
    this.eightHoursToTenHours = 0;
    this.tenHoursToTwelveHours = 0;
    this.twelveHoursToFifteenHours = 0;
    this.fifteenHoursToTwentyHours = 0;
    this.moreThanTwentyHours = 0;

    this.array = [];
    this.forgeChartData(this.DAILY_IDENTIFIER);
  }

  getWorkedAnalysisForLastWeek() {
    this.lastWeekClicked = true;
    this.otherWeekClicked = false;
  }

  getRadiosForWeekSelection() {
    this.weekRadiosClicked = true;
  }

  getDataForLastWeek() {
  }

  getDataForPeriod(selectedPeriod) {
    const today = new Date();
    today.setDate(today.getDate());
    const currentDate = today.toISOString().slice(0, 10);

    const selectionObj = {
      'fromDate' : currentDate,
      'toDate' : currentDate,
      'range' : 'custom',
      'key' : this.finalSelectionObjKey,
      'token' : Profile.USER_TOKEN,
      'yesterdayWeekMonth' : selectedPeriod,
      'projectName' : 'All',
      'searchEmail' : 'All',
      'searchSystem' : this.selectedSystem
    };
      this.workFromHomeService.getDetailedSummaryReportWorkedHoursAnalysisWWTData(selectionObj)
        .subscribe(response => {
          this.lineChartResponseForRange = response;
          this.response = this.lineChartResponseForRange.lineChartData;
          this.getDataFromOriginalResponse(selectedPeriod);
        });
  }

  ChangeDefaultYearToOtherYear() {
    this.otherYearClicked = true;
  }

  ChangeDefaultWeekToOtherWeek() {
    this.otherWeekClicked = true;
    this.lastWeekClicked = false;
  }
  getWorkedAnalysisDataWhenWeekChange(selectedPeriod) {
    const selectionObj = {
      'fromDate' : this.selectedDateForWeek,
      'toDate' : this.selectedDateForWeek,
      'range' : 'custom',
      'key' : this.finalSelectionObjKey,
      'token' : Profile.USER_TOKEN,
      'yesterdayWeekMonth' : selectedPeriod,
      'projectName' : 'All',
      'searchEmail' : 'All'
    };
    this.workFromHomeService.getDetailedSummaryReportWorkedHoursAnalysisWWTData(selectionObj)
      .subscribe(response => {
        this.lineChartResponseForRange = response;
        this.response = this.lineChartResponseForRange.lineChartData;
        this.getDataFromOriginalResponse(selectedPeriod);
      });
  }

  ChangeOtherWeekToThisWeek() {
    this.otherWeekClicked = false;
    this.weekSelections = 'ThisWeek';
    this.getDataForPeriod(this.WEEK_IDENTIFIER);
  }

  ChangeDefaultMonthToOtherMonth() {
    this.defaultMonthToOtherMonthClicked = true;
    this.lastMonthClicked = false;
  }

  getWorkedAnalysisDataWhenMonthChange(selectedPeriod) {
    const selectionObj = {
      'fromDate' : this.selectedDateForMonth,
      'toDate' : this.selectedDateForMonth,
      'range' : 'custom',
      'key' : this.finalSelectionObjKey,
      'token' : Profile.USER_TOKEN,
      'yesterdayWeekMonth' : selectedPeriod,
      'projectName' : 'All',
      'searchEmail' : 'All'
    };
    this.workFromHomeService.getDetailedSummaryReportWorkedHoursAnalysisWWTData(selectionObj)
      .subscribe(response => {
        this.lineChartResponseForRange = response;
        this.response = this.lineChartResponseForRange.lineChartData;
        this.getDataFromOriginalResponse(selectedPeriod);
      });
  }

  ChangeOtherMonthToThisMonth() {
    this.defaultMonthToOtherMonthClicked = false;
    this.monthSelections = 'ThisMonth';
    this.getDataForPeriod(this.MONTH_IDENTIFIER);
  }

  getDataSoutces(){
    if (this.checkPermission.checkUserHavePermissionForSection('WorkEffortWorkedHoursAnalysisWwt')) {
      this.dataSources.push('WWT');
    }
    if (this.checkPermission.checkUserHavePermissionForSection('WorkEffortWorkedHoursAnalysisFaceRec')) {
      this.dataSources.push('FaceRec');
    }
  }

  getDataForSelectedSystem(selectedSystem) {

  }
}
