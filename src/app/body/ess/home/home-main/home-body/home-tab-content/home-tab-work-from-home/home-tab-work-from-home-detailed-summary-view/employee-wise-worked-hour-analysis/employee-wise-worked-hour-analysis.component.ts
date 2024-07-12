import { Component, OnInit } from '@angular/core';
import {WorkFromHomeService} from '../../../../../../../../../service/work-from-home-services/work-from-home.service';
import {Profile} from '../../../../../../../../../_global/profile';
import {CustomResponse} from '../../models/CustomResponse';
import {GeneralOps} from "../../../../../../../../../utility/GeneralOps";
@Component({
  selector: 'app-employee-wise-worked-hour-analysis',
  templateUrl: './employee-wise-worked-hour-analysis.component.html',
  styleUrls: ['./employee-wise-worked-hour-analysis.component.css']
})
export class EmployeeWiseWorkedHourAnalysisComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  dataSources= [];

  leaveDropDownIcon_down: boolean;
  employeeWiseWHA: boolean;
  employeeWiseWHAYesterday: boolean;
  employeeWiseWHAWeek: boolean;
  employeeWiseWHAMonth: boolean;

  fromDate;
  toDate;
  employeeWHADataForYesterday;
  employeeWHADataForWeek;
  employeeWHADataForMonth;
  finalResponseOfDay;
  finalResponseOfWeek;
  finalResponseOfMonth;
  emps = false;
  showLoggedHrs = true;
  loggedHrsValue = true;
  dataLoadedForDay = false;
  dataLoadedForWeek = false;
  dataLoadedForMonth = false;
  selectedSystem;

  constructor(private workFromHomeService: WorkFromHomeService) { }

  ngOnInit() {
    this.employeeWiseWHAYesterday = true;
    this.getDataSources();
    this.selectedSystem = this.dataSources[0];
    const today = new Date();
    today.setDate(today.getDate());
    this.fromDate = this.toDate = today.toISOString().slice(0, 10);
    this.employeeWorkHoursForWeekObj();
    this.employeeWorkHoursForMonthObj();
    this.employeeWorkHoursObj();


  }
  employeeWorkHoursObj() {
    const selectionObj = {
      fromDate : this.fromDate,
      toDate : this.toDate,
      token : Profile.USER_TOKEN,
      range : 'custom',
      yesterdayWeekMonth : 'DAY',
      searchSystem: this.selectedSystem
    };
    // this.employeeWHADataForYesterday = CustomResponse.response[0];
    // this.dataLoadedForDay = true;

    this.workFromHomeService.getDetailedSummaryReportEmployeeWiseWorkedHourAnalysisDataForYesterday(selectionObj)
      .subscribe(data => {
        this.finalResponseOfDay = data;
        this.employeeWHADataForYesterday = this.finalResponseOfDay[0];
        this.dataLoadedForDay = true;

      });
  }
  employeeWorkHoursForWeekObj() {
    const selectionObj = {
      fromDate : this.fromDate,
      toDate : this.toDate,
      token : Profile.USER_TOKEN,
      range : 'custom',
      yesterdayWeekMonth : 'WEEK',
      searchSystem: this.selectedSystem
    };
    // this.employeeWHADataForWeek = CustomResponse.response[0];
    // this.dataLoadedForWeek = true;

    this.workFromHomeService.getDetailedSummaryReportEmployeeWiseWorkedHourAnalysisDataForWeek(selectionObj)
      .subscribe(data => {
        this.finalResponseOfWeek = data;
        this.employeeWHADataForWeek = this.finalResponseOfWeek[0];
        this.dataLoadedForWeek = true;
      });
  }
  employeeWorkHoursForMonthObj() {
    const selectionObj = {
      fromDate : this.fromDate,
      toDate : this.toDate,
      token : Profile.USER_TOKEN,
      range : 'custom',
      yesterdayWeekMonth : 'MONTH',
      searchSystem: this.selectedSystem
    };
    // this.employeeWHADataForMonth = CustomResponse.response[0];

    this.workFromHomeService.getDetailedSummaryReportEmployeeWiseWorkedHourAnalysisDataForMonth(selectionObj)
      .subscribe(data => {
        this.finalResponseOfMonth = data;
        this.employeeWHADataForMonth = this.finalResponseOfMonth[0];
        this.dataLoadedForMonth = true;
      });
  }
  // show hide time range divs
  showEmployeeWiseWHAWeek() {
    this.employeeWiseWHAYesterday = false;
    this.employeeWiseWHAMonth = false;
    this.employeeWiseWHAWeek = true;

  }

  showEmployeeWiseWHAYesterday() {
    this.employeeWiseWHAWeek = false;
    this.employeeWiseWHAMonth = false;
    this.employeeWiseWHAYesterday = true;
  }

  showEmployeeWiseWHAMonth() {
    this.employeeWiseWHAYesterday = false;
    this.employeeWiseWHAWeek = false;
    this.employeeWiseWHAMonth = true;
  }

  loggedHrsClicked(event) {
    if (event.target.checked) {
      this.showLoggedHrs = true;
    } else {
      this.showLoggedHrs = false;
    }
  }

  getDataSources() {
    if (this.checkPermission.checkUserHavePermissionForSection('WorkEffortEmployeeWiseWorkedHoursAnalysisWwt')) {
      this.dataSources.push('WWT');
    }
    if (this.checkPermission.checkUserHavePermissionForSection('WorkEffortEmployeeWiseWorkedHoursAnalysisFaceRec')) {
      this.dataSources.push('FaceRec');
    }
  }

  getDataForSelectedSystem() {
    this.dataLoadedForDay = false;
    this.dataLoadedForWeek = false;
    this.dataLoadedForMonth = false;
    this.employeeWorkHoursForWeekObj();
    this.employeeWorkHoursForMonthObj();
    this.employeeWorkHoursObj();
  }
}
