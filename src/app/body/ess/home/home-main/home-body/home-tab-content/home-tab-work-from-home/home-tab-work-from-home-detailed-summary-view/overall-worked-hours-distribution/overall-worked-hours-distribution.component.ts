import { Component, OnInit } from '@angular/core';
import {System} from '../../../../../../../../../_global/system';
import {Profile} from '../../../../../../../../../_global/profile';
import {WorkFromHomeService} from '../../../../../../../../../service/work-from-home-services/work-from-home.service';
import {GeneralOps} from "../../../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-overall-worked-hours-distribution',
  templateUrl: './overall-worked-hours-distribution.component.html',
  styleUrls: ['./overall-worked-hours-distribution.component.css']
})
export class OverallWorkedHoursDistributionComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  dataSources= [];

  wwtResponseDataLoadedForToday: boolean;
  wwtResponseDataLoadedForWeek: boolean;
  wwtResponseDataLoadedForMonth: boolean;

  faceRecResponseDataLoadedForToday: boolean;
  faceRecResponseDataLoadedForWeek: boolean;
  faceRecResponseDataLoadedForMonth: boolean;

  fromDate: any;
  toDate: any;
  startDateOfWeek: any;
  endDateOfWeek: any;
  startDateOfMonth: any;
  endDateOfMonth: any;

  startDateOfWeekToDisplay: any;
  endDateOfWeekToDisplay: any;
  startDateOfMonthToDisplay: any;
  endDateOfMonthToDisplay: any;
  selectedDateToDisplay: any;

  selectedDate: any;
  selectionObj: any;

  WWTResponseToday: any;
  WWTResponseWeek: any;
  WWTResponseMonth: any;

  WWTResponsesForDay: any;
  WWTResponsesForWeek: any;
  WWTResponsesForMonth: any;

  faceRecResponseToday: any;
  faceRecResponseWeek: any;
  faceRecResponseMonth: any;

  faceRecResponsesForDay: any;
  faceRecResponsesForWeek: any;
  faceRecResponsesForMonth: any;

  dateVariable = 'Today';

  monthMap = new Map();
  selectedSystem;
  constructor(private workFromHomeService: WorkFromHomeService) { }

  ngOnInit() {
    this.getDataSources();
    this.selectedSystem = this.dataSources[0];
    this.setMonthMapValues();
    const curr = new Date();
    // today
    curr.setDate(curr.getDate());
    this.fromDate = this.toDate = this.selectedDate = curr.toISOString().slice(0, 10);
    this.getWorkedHoursAnalysisDataForToday();
    this.getWorkedHoursAnalysisDataForTodayFromFaceRec();

    // week
    this.startDateOfWeek = new Date(curr.setDate(curr.getDate() - curr.getDay())).toISOString().slice(0, 10);
    this.endDateOfWeek = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6)).toISOString().slice(0, 10);
    this.getWorkedHoursAnalysisDataForWeek();
    this.getWorkedHoursAnalysisDataForWeekFromFaceRec();


    // month
    this.startDateOfMonth = new Date(curr.getFullYear(), curr.getMonth(), 2).toISOString().slice(0, 10);
    this.endDateOfMonth = new Date(curr.getFullYear(), curr.getMonth() + 1, 1).toISOString().slice(0, 10);
    this.getWorkedHoursAnalysisDataForMonth();
    this.getWorkedHoursAnalysisDataForMonthFromFaceRec();
  }

  // set month value for month number
  setMonthMapValues() {
    this.monthMap.set( '01', 'Jan');
    this.monthMap.set( '02', 'Feb');
    this.monthMap.set( '03', 'Mar');
    this.monthMap.set( '04', 'Apr');
    this.monthMap.set( '05', 'May');
    this.monthMap.set( '06', 'Jun');
    this.monthMap.set( '07', 'Jul');
    this.monthMap.set( '08', 'Aug');
    this.monthMap.set( '09', 'Sep');
    this.monthMap.set( '10', 'Oct');
    this.monthMap.set( '11', 'Nov');
    this.monthMap.set( '12', 'Dec');
  }

  filterByDate() {
    this.wwtResponseDataLoadedForToday = false;
    this.wwtResponseDataLoadedForWeek = false;
    this.wwtResponseDataLoadedForMonth = false;
    this.faceRecResponseDataLoadedForToday = false;
    this.faceRecResponseDataLoadedForWeek = false;
    this.faceRecResponseDataLoadedForMonth = false;
    const filterDate = new Date(this.selectedDate);
    const selectDate = new Date(this.selectedDate);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (filterDate.toISOString().slice(0, 10) === yesterday.toISOString().slice(0, 10)) {
      this.dateVariable = 'Yesterday';
    } else if (filterDate.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)) {
      this.dateVariable = 'Today';
    } else {
      this.dateVariable = 'Day';
    }
    // today
    filterDate.setDate(filterDate.getDate());
    this.fromDate = this.toDate = this.selectedDate = filterDate.toISOString().slice(0, 10);
    this.getWorkedHoursAnalysisDataForToday();
    this.getWorkedHoursAnalysisDataForTodayFromFaceRec();


    // week
    this.startDateOfWeek = new Date(selectDate.setDate(selectDate.getDate() - selectDate.getDay())).toISOString().slice(0, 10);
    this.endDateOfWeek = new Date(selectDate.setDate(selectDate.getDate() + 6)).toISOString().slice(0, 10);
    this.getWorkedHoursAnalysisDataForWeek();
    this.getWorkedHoursAnalysisDataForWeekFromFaceRec();

    // month
    this.startDateOfMonth = new Date(filterDate.getFullYear(), filterDate.getMonth(), 2).toISOString().slice(0, 10);
    this.endDateOfMonth = new Date(filterDate.getFullYear(), filterDate.getMonth() + 1, 1).toISOString().slice(0, 10);
    this.getWorkedHoursAnalysisDataForMonth();
    this.getWorkedHoursAnalysisDataForMonthFromFaceRec();
  }
  timeRangeAPICalls() {

  }

  getWorkedHoursAnalysisDataForToday() {
    const payload = {
      'fromDate' : this.fromDate,
      'toDate' : this.toDate,
      'range' : 'custom',
      'key' : System.generateRandomKey(32),
      'token' : Profile.USER_TOKEN,
      'yesterdayWeekMonth' : 'DAY',
      'projectName' : 'All',
      'searchEmail' : 'All',
      'searchSystem' : 'WWT'
    };
    this.workFromHomeService.getDetailedSummaryReportWorkedHoursAnalysisWWTData(payload).subscribe(
      (response) => {
        this.WWTResponsesForDay = response;
        this.WWTResponseToday = this.WWTResponsesForDay.lineChartData;
        this.wwtResponseDataLoadedForToday = true;
      }
    );
  }
  getWorkedHoursAnalysisDataForTodayFromFaceRec() {
    const payload = {
      'fromDate' : this.fromDate,
      'toDate' : this.toDate,
      'range' : 'custom',
      'key' : System.generateRandomKey(32),
      'token' : Profile.USER_TOKEN,
      'yesterdayWeekMonth' : 'DAY',
      'projectName' : 'All',
      'searchEmail' : 'All',
      'searchSystem' : 'FaceRec'
    };
    this.workFromHomeService.getDetailedSummaryReportWorkedHoursAnalysisWWTData(payload).subscribe(
      (response) => {
        this.faceRecResponsesForDay = response;
        this.faceRecResponseToday = this.faceRecResponsesForDay.lineChartData;
        this.faceRecResponseDataLoadedForToday = true;
      }
    );
  }
  getWorkedHoursAnalysisDataForWeekFromFaceRec() {
    const payload = {
      'fromDate' : this.startDateOfWeek,
      'toDate' : this.endDateOfWeek,
      'range' : 'custom',
      'key' : System.generateRandomKey(32),
      'token' : Profile.USER_TOKEN,
      'yesterdayWeekMonth' : 'WEEK',
      'projectName' : 'All',
      'searchEmail' : 'All',
      'searchSystem' : 'FaceRec'
    };
    this.workFromHomeService.getDetailedSummaryReportWorkedHoursAnalysisWWTData(payload).subscribe(
      (response) => {
        this.faceRecResponsesForWeek = response;
        this.faceRecResponseWeek = this.faceRecResponsesForWeek.lineChartData;
        this.faceRecResponseDataLoadedForWeek = true;
      }
    );
  }

  getWorkedHoursAnalysisDataForWeek() {
    const selectionObj = {
      'fromDate' : this.startDateOfWeek,
      'toDate' : this.endDateOfWeek,
      'range' : 'custom',
      'key' : System.generateRandomKey(32),
      'token' : Profile.USER_TOKEN,
      'yesterdayWeekMonth' : 'WEEK',
      'projectName' : 'All',
      'searchEmail' : 'All',
      'searchSystem' : 'WWT'
    };
    this.workFromHomeService.getDetailedSummaryReportWorkedHoursAnalysisWWTData(selectionObj).subscribe(
      (response) => {
        this.WWTResponsesForWeek = response;
        this.WWTResponseWeek = this.WWTResponsesForWeek.lineChartData;
        this.wwtResponseDataLoadedForWeek = true;
      }
    );
  }

  getWorkedHoursAnalysisDataForMonth() {
    this.selectedDateToDisplay = this.selectedDate.slice(8, 10) + '-' + this.monthMap.get(this.selectedDate.slice(5, 7));
    this.startDateOfWeekToDisplay = this.startDateOfWeek.slice(8, 10) + '-' + this.endDateOfWeek.slice(8, 10) + ','
      + this.monthMap.get(this.endDateOfWeek.slice(5, 7));

    // this.startDateOfWeekToDisplay =
    //   this.startDateOfWeek.slice(8, 10) + '-' + this.monthMap.get(this.startDateOfWeek.slice(5, 7)) + '-' + this.startDateOfWeek.slice(0, 4)
    //   + ' : ' +
    //   this.endDateOfWeek.slice(8, 10) + '-' + this.monthMap.get(this.endDateOfWeek.slice(5, 7)) + '-' + this.startDateOfWeek.slice(0, 4);


    this.startDateOfMonthToDisplay = this.monthMap.get(this.endDateOfMonth.slice(5, 7)) + '-' + this.endDateOfMonth.slice(0, 4);

    const selectionObj = {
      'fromDate' : this.startDateOfMonth,
      'toDate' : this.endDateOfMonth,
      'range' : 'custom',
      'key' : System.generateRandomKey(32),
      'token' : Profile.USER_TOKEN,
      'yesterdayWeekMonth' : 'MONTH',
      'projectName' : 'All',
      'searchEmail' : 'All',
      'searchSystem' : 'WWT'
    };
    this.workFromHomeService.getDetailedSummaryReportWorkedHoursAnalysisWWTData(selectionObj).subscribe(
      (response) => {
        this.WWTResponsesForMonth = response;
        this.WWTResponseMonth = this.WWTResponsesForMonth.lineChartData;
        this.wwtResponseDataLoadedForMonth = true;
      }
    );
  }
  getWorkedHoursAnalysisDataForMonthFromFaceRec() {
    const selectionObj = {
      'fromDate' : this.startDateOfMonth,
      'toDate' : this.endDateOfMonth,
      'range' : 'custom',
      'key' : System.generateRandomKey(32),
      'token' : Profile.USER_TOKEN,
      'yesterdayWeekMonth' : 'MONTH',
      'projectName' : 'All',
      'searchEmail' : 'All',
      'searchSystem' : 'FaceRec'
    };
    this.workFromHomeService.getDetailedSummaryReportWorkedHoursAnalysisWWTData(selectionObj).subscribe(
      (response) => {
        this.faceRecResponsesForMonth = response;
        this.faceRecResponseMonth = this.faceRecResponsesForMonth.lineChartData;
        this.faceRecResponseDataLoadedForMonth = true;
      }
    );
  }


  getDataSources() {
    if (this.checkPermission.checkUserHavePermissionForSection('WorkEffortOverallWorkedHoursDistributionWwt')) {
      this.dataSources.push('WWT');
    }
    if(this.checkPermission.checkUserHavePermissionForSection('WorkEffortOverallWorkedHoursDistributionFaceRec')) {
      this.dataSources.push('FaceRec');
    }
  }

  getDataForSelectedSystem(selectedSystem) {


  }
}
