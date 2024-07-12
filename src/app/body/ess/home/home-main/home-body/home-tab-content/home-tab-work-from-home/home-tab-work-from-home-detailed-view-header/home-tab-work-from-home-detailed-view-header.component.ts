import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {WorkFromHomeService} from '../../../../../../../../service/work-from-home-services/work-from-home.service';
import {AttendanceServiceService} from '../../../../../../../../service/attendance-service.service';
import {InterCommunicationServiceService} from '../../../../../../../../service/support-services/inter-communication-service.service';
import {System} from '../../../../../../../../_global/system';
import {Profile} from '../../../../../../../../_global/profile';

@Component({
  selector: 'app-home-tab-work-from-home-detailed-view-header',
  templateUrl: './home-tab-work-from-home-detailed-view-header.component.html',
  styleUrls: ['./home-tab-work-from-home-detailed-view-header.component.css']
})
export class HomeTabWorkFromHomeDetailedViewHeaderComponent implements OnInit {

  activeDashboard: boolean;
  detailedViewRangeType = 'R111';
  selectedTimeGapForDetailedView = '88';
  rangeCustomWidget = false;
  rangeSingleMonthWidget = false;
  selectedFromDate = moment().format('YYYY-MM-DD');
  selectedToDate = moment().format('YYYY-MM-DD');
  loadedMonthFilters: string[] = [];
  selectedMonthFilter: string;
  isMonthFilter = false;
  fromDate: any;
  toDate: any;
  selectedEmail: any;
  selectedProjectName: any;
  users = [];
  projects = [];
  errorMessage: string;
  totalWWTUsers: any;
  showCustomTimeGapWidget: boolean;
  timeGapFrom: any;
  timeGapTo: any;

  detailedViewRangeTypeTrue: any;
  selectedTimeGapForDetailedViewTrue: any;
  constructor(private workFromHomeService: WorkFromHomeService,
              private attendanceService: AttendanceServiceService,
              private interCommunicationService: InterCommunicationServiceService) { }

  ngOnInit() {
    this.detailedViewRangeTypeTrue = 'yesterday';
    this.selectedTimeGapForDetailedViewTrue = 8;
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

  setDateRange(detailedViewRangeType: any) {
    if (detailedViewRangeType === 'R5') {
      this.detailedViewRangeType = 'R5';
      this.rangeCustomWidget = true;
      this.rangeSingleMonthWidget = false;
    } else if (detailedViewRangeType === 'R6') {
      this.rangeSingleMonthWidget = true;
      this.rangeCustomWidget = false;
    }else {
      this.rangeCustomWidget = false;
      this.rangeSingleMonthWidget = false;
    }
    if (detailedViewRangeType === 'R1') {
      this.detailedViewRangeTypeTrue = 'last 7 days';
    }else if (detailedViewRangeType === 'R2') {
      this.detailedViewRangeTypeTrue = 'last week';
    }else if (detailedViewRangeType === 'R3') {
      this.detailedViewRangeTypeTrue = 'this week';
    }else if (detailedViewRangeType === 'R4') {
      this.detailedViewRangeTypeTrue = 'today';
    }else if (detailedViewRangeType === 'R6') {
      this.detailedViewRangeTypeTrue = 'month';
    }else if (detailedViewRangeType === 'R5') {
      this.detailedViewRangeTypeTrue = 'custom';
      this.fromDate = this.selectedFromDate;
      this.toDate = this.selectedToDate;
    }else if (detailedViewRangeType === 'R11') {
      this.detailedViewRangeTypeTrue = 'yesterday';
    }else if (detailedViewRangeType === 'R8') {
      this.detailedViewRangeTypeTrue = 'this month';
    }else if (detailedViewRangeType === 'R9') {
      this.detailedViewRangeTypeTrue = 'last month';
    }else if (detailedViewRangeType === 'R10') {
      this.detailedViewRangeTypeTrue = 'this year';
    }else if (detailedViewRangeType === 'R7') {
      this.detailedViewRangeTypeTrue = 'quarter';
    } else {
      this.errorMessage = 'An Error Occurred while setting the Time Range!';
      return null;
    }
    this.setWorkFromHomeObject();
  }

  async setTimeGap(timeGap: string) {
    if (timeGap === '9') {
      this.showCustomTimeGapWidget = true;
    } else {
      this.showCustomTimeGapWidget = false;
    }
    this.selectedTimeGapForDetailedViewTrue = timeGap;
    this.setWorkFromHomeObject();
  }

  setWorkFromHomeObject() {
    this.activeDashboard = false;
    if (!this.selectedEmail) {
      this.selectedEmail = null;
    }
    if (!this.selectedProjectName) {
      this.selectedProjectName = null;
    }
    const selectionObj = {
      'fromDate': this.fromDate,
      'toDate': this.toDate,
      'fromTime': this.timeGapFrom,
      'toTime': this.timeGapTo,
      'month': this.selectedMonthFilter,
      'range': this.detailedViewRangeTypeTrue,
      'timeGap': this.selectedTimeGapForDetailedViewTrue,
      'email': this.selectedEmail,
      'projectName': this.selectedProjectName,
      'key': System.generateRandomKey(32),
      'token': Profile.USER_TOKEN,
      'today': new Date(),
      'emp_no': Profile.EMPLOYEE_ID
    };
    this.interCommunicationService.updateWorkFromHomeRecordsForDetailedView(selectionObj);
    this.activeDashboard = true;
  }

  ngOnDestroy() {
    this.interCommunicationService.updateWorkFromHomeRecordsForDetailedView('');
  }


}
