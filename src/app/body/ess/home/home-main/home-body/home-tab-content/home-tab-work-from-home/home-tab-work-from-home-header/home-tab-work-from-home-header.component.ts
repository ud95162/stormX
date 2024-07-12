import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {WorkFromHomeService} from '../../../../../../../../service/work-from-home-services/work-from-home.service';
import {AttendanceServiceService} from '../../../../../../../../service/attendance-service.service';
import {InterCommunicationServiceService} from '../../../../../../../../service/support-services/inter-communication-service.service';
import {System} from '../../../../../../../../_global/system';
import {WWTUserData} from '../models/wwtuser-data';
import {Profile} from '../../../../../../../../_global/profile';

@Component({
  selector: 'app-home-tab-work-from-home-header',
  templateUrl: './home-tab-work-from-home-header.component.html',
  styleUrls: ['./home-tab-work-from-home-header.component.css']
})
export class HomeTabWorkFromHomeHeaderComponent implements OnInit, OnDestroy {

  activeDashboard: boolean;
  rangeType = 'R11';
  selectedTimeGap = '8';
  rangeCustomWidget = false;
  rangeSingleMonthWidget = false;
  selectedFromDate = moment().format('YYYY-MM-DD');
  selectedToDate = moment().format('YYYY-MM-DD');
  currentDate = moment().format('YYYY-MM-DD');
  loadedMonthFilters: string[] = [];
  selectedMonthFilter: string;
  isMonthFilter = false;
  fromDate: any;
  toDate: any;
  selectedEmail: any;
  selectedProjectName: 'All';
  users = [];
  projects = [];
  errorMessage: string;
  totalWWTUsers: any;
  showCustomTimeGapWidget: boolean;
  timeGapFrom: any;
  timeGapTo: any;

  rangeTypeTrue: any;

  constructor(private workFromHomeService: WorkFromHomeService,
              private attendanceService: AttendanceServiceService,
              private interCommunicationService: InterCommunicationServiceService) { }

  ngOnInit() {
    this.rangeTypeTrue = 'yesterday';
    this.loadInitialData();
    this.loadAttendanceMonthFilter();
  }

  loadInitialData() {
    this.getProjectData();
    this.getUserData();
    this.setWorkFromHomeObject();
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

  loadAttendanceMonthFilter() {
    this.attendanceService.getMonthFilterAttendanceMainDashboard().subscribe((data: any) => {
      this.loadedMonthFilters = data;
      this.selectedMonthFilter = this.loadedMonthFilters[0];
      this.isMonthFilter = true;
    });
  }

  setDateRange(rangeType: any) {
    if (rangeType === 'R5') {
      this.rangeCustomWidget = true;
      if (this.selectedFromDate > this.selectedToDate) {
        this.selectedToDate = this.selectedFromDate;
      }
      this.rangeSingleMonthWidget = false;
    } else if (rangeType === 'R6') {
      this.rangeSingleMonthWidget = true;
      this.rangeCustomWidget = false;
    }else {
      this.rangeCustomWidget = false;
      this.rangeSingleMonthWidget = false;
    }
    if (rangeType === 'R1') {
      this.rangeTypeTrue = 'last 7 days';
    }else if (rangeType === 'R2') {
      this.rangeTypeTrue = 'last week';
    }else if (rangeType === 'R3') {
      this.rangeTypeTrue = 'this week';
    }else if (rangeType === 'R4') {
      this.rangeTypeTrue = 'today';
    }else if (rangeType === 'R6') {
      this.rangeTypeTrue = 'month';
    }else if (rangeType === 'R5') {
      this.rangeTypeTrue = 'custom';
      this.fromDate = this.selectedFromDate;
      this.toDate = this.selectedToDate;
    }else if (rangeType === 'R11') {
      this.rangeTypeTrue = 'yesterday';
    }else if (rangeType === 'R8') {
      this.rangeTypeTrue = 'this month';
    }else if (rangeType === 'R9') {
      this.rangeTypeTrue = 'last month';
    }else if (rangeType === 'R10') {
      this.rangeTypeTrue = 'this year';
    }else if (rangeType === 'R7') {
      this.rangeTypeTrue = 'quarter';
    } else {
      this.errorMessage = 'An Error Occurred while setting the Time Range!';
      return null;
    }
    this.setWorkFromHomeObject();
  }

  setTimeGap(timeGap: string) {
    if (timeGap === '9') {
      this.showCustomTimeGapWidget = true;
    } else {
      this.showCustomTimeGapWidget = false;
    }
    this.selectedTimeGap = timeGap;
    this.setWorkFromHomeObject();
  }

  setWorkFromHomeObject() {
    this.activeDashboard = false;
    if (!this.selectedEmail) {
      this.selectedEmail = null;
    }
    if (!this.selectedProjectName) {
      this.selectedProjectName = 'All';
    }
    const selectionObj = {
      'fromDate': this.fromDate,
      'toDate': this.toDate,
      'fromTime': this.timeGapFrom,
      'toTime': this.timeGapTo,
      'month': this.selectedMonthFilter,
      'range': this.rangeTypeTrue,
      'timeGap': this.selectedTimeGap,
      'email': this.selectedEmail,
      'projectName': this.selectedProjectName,
      'key': System.generateRandomKey(32),
      'token': Profile.USER_TOKEN,
      'today': new Date(),
      'emp_no': Profile.EMPLOYEE_ID,
      'searchEmail' : 'All'
    };
    // const selectionObj = {
    //   'fromDate': '2020-07-28',
    //   'toDate': '2020-08-27',
    //   'fromTime': this.timeGapFrom,
    //   'toTime': this.timeGapTo,
    //   'month': this.selectedMonthFilter,
    //   'range': 'custom',
    //   'timeGap': this.selectedTimeGap,
    //   'email': this.selectedEmail,
    //   'projectName': this.selectedProjectName,
    //   'key': System.generateRandomKey(32),
    //   'token': Profile.USER_TOKEN,
    //   'today': new Date()
    // };
    this.interCommunicationService.updateWorkFromHomeRecords(selectionObj);
    this.activeDashboard = true;
  }

  ngOnDestroy() {
    this.interCommunicationService.updateWorkFromHomeRecords('');
  }

}


