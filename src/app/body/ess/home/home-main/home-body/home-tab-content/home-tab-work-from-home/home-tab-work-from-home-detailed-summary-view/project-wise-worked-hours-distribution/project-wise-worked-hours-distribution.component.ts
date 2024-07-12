import { Component, OnInit } from '@angular/core';
import {System} from '../../../../../../../../../_global/system';
import {Profile} from '../../../../../../../../../_global/profile';
import {WorkFromHomeService} from '../../../../../../../../../service/work-from-home-services/work-from-home.service';
import {ProjectHrsResponse} from "../../models/ProjectHrsResponse";
import {GeneralOps} from "../../../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-project-wise-worked-hours-distribution',
  templateUrl: './project-wise-worked-hours-distribution.component.html',
  styleUrls: ['./project-wise-worked-hours-distribution.component.css']
})
export class ProjectWiseWorkedHoursDistributionComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  dataSources= [];

  responseDataLoaded: boolean;

  fromDate: any;
  toDate: any;

  selectedDate: any;

  response: any;
  responseForDay: any;
  responseForWeek: any;
  responseForMonth: any;
  workHoursForWeek = [];
  workHoursForMonth = [];
  responseDataLoadedForWeek: boolean;
  responseDataLoadedForMonth: boolean;
  selectedSystem;
  projectResponse;

  constructor(private workFromHomeService: WorkFromHomeService) { }

  ngOnInit() {
    this.getDataSources();
    this.selectedSystem = this.dataSources[0];
    const today = new Date();
    today.setDate(today.getDate());
    this.fromDate = this.toDate = this.selectedDate = today.toISOString().slice(0, 10);
    this.setDetailedSummaryReportObject();
  }

  setDetailedSummaryReportObject() {
    this.responseDataLoaded = false;
    this.responseDataLoadedForWeek = false;
    this.responseDataLoadedForMonth = false;
    this.workHoursForWeek = [];
    this.workHoursForMonth = [];

    this.fromDate = this.toDate = this.selectedDate;
    const selectionObj = {
      'fromDate' : this.fromDate,
      'toDate' : this.toDate,
      'range' : 'custom',
      'key' : System.generateRandomKey(32),
      'token' : Profile.USER_TOKEN,
      'searchSystem' : this.selectedSystem
    };
    this.getProjectWiseWorkedHoursDistributionData(selectionObj);
  }

  getProjectWiseWorkedHoursDistributionData(selectionObj) {
    this.workFromHomeService.getDetailedSummaryReportprojectWiseWorkHoursDistributionData(selectionObj).subscribe(
      (response) => {
        this.response = response[0];
        console.log(this.response);
        // this.responseForDay = this.response[0].daily;
        // this.responseForWeek = this.response[0].weekly;
        // this.responseForMonth = this.response[0].monthly;
        //
        // this.getWeekDetails();
        // this.getMonthDetails();
        this.responseDataLoaded = true;
      });

  }

  getWeekDetails() {
    let weekHours = new Map();
        for (let i = 0; i < this.responseForWeek.length; i++) {
          weekHours.set(this.responseForWeek[i].projectName, this.responseForWeek[i]);
        }
        for (let j = 0; j < this.responseForDay.length; j++) {
          this.workHoursForWeek.push(weekHours.get(this.responseForDay[j].project));
          this.responseDataLoadedForWeek = true;
        }
  }

  getMonthDetails() {
        let monthHours = new Map();
        for (let i = 0; i < this.responseForMonth.length; i++) {
          monthHours.set(this.responseForMonth[i].projectName, this.responseForMonth[i]);
        }
        for (let j = 0; j < this.responseForDay.length; j++) {
          this.workHoursForMonth.push(monthHours.get(this.responseForDay[j].project));
          this.responseDataLoadedForMonth = true;
        }
  }


  getDataSources() {
    if (this.checkPermission.checkUserHavePermissionForSection('WorkEffortProjectWiseWorkedHoursDistributionWwt')) {
      this.dataSources.push('WWT');
    }
    if (this.checkPermission.checkUserHavePermissionForSection('WorkEffortProjectWiseWorkedHoursDistributionFaceRec')) {
      this.dataSources.push('FaceRec');
    }
  }
}
