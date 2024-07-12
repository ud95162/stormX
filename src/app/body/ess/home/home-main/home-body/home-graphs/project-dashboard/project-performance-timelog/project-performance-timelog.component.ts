import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../../../../../../../../service/project-service.service";
import {ProfileUserServiceService} from "../../../../../../../../service/profile-user-service.service";
import {AttendanceServiceService} from "../../../../../../../../service/attendance-service.service";
import {LeaveServiceService} from "../../../../../../../../service/attendance-leave/leave-service.service";
import {Project} from "../../../../../../../../_global/project";

@Component({
  selector: 'app-project-performance-timelog',
  templateUrl: './project-performance-timelog.component.html',
  styleUrls: ['./project-performance-timelog.component.css']
})
export class ProjectPerformanceTimelogComponent implements OnInit {


  loadedMonthFilters: string[] = [];
  selectedMonthFilter: string;
  overallPerformanceMonthFilter: string;
  isMonthFilter = false;

  monthNameToValueMap = new Map();
  monthLastDateMap = new Map();

  expectedHrsDataLoaded= false;
  monthExpectedProjectHrs;
  actualHrsDataLoaded = false;
  monthActualProjectHrs;

  constructor(private httpService: ProjectServiceService,
              private holidayService: ProfileUserServiceService,
              private attendanceService: AttendanceServiceService,
              private leaveService: LeaveServiceService) { }

  ngOnInit() {
  }

  getTimeLogData(date) {
    this.getMonthNumFromName();
    let dateSummaryResponse;
    let workingDaysOfMonth;
    // const monthStartDate = '01-' + this.monthNameToValueMap.get(date.substring(3, 6)) + '-' + date.substring(7, 11);
    const monthStartDate = date.substring(7, 11) + '-' + this.monthNameToValueMap.get(date.substring(3, 6)) + '-01';
    const monthEndDate = date.substring(7, 11) + '-' + this.monthNameToValueMap.get(date.substring(3, 6)) + '-'
      + this.getMonthEndDateFromMonth( date.substring(3, 6));

    this.leaveService.getWorkingDays(monthStartDate, monthEndDate).subscribe(
      data => {
        dateSummaryResponse = data;
        workingDaysOfMonth = dateSummaryResponse.workingDays.count;
        this.monthExpectedProjectHrs = workingDaysOfMonth * Project.PROJECT_COUNT * 8;
        this.expectedHrsDataLoaded = true;
      });
    this.httpService.getProjectTimeLogs(Project.PROJECT_CODE , date)
      .subscribe( ( response1) => {
        this.monthActualProjectHrs = Math.round(response1[1] / 60 / 60);
        this.actualHrsDataLoaded = true;
      });
  }

  loadAttendanceMonthFilter() {
    // const arr = this.selectedMonthFilter.split(' ');
    // const monthEndDate = this.getMonthEndDateFromMonth(this.monthNameToValueMap.get(arr[2].substring(0, 3))) +
    //   this.monthNameToValueMap.get(arr[2].substring(0, 3)) + '-' + arr[0];
    // const monthStartDate = '01' + this.monthNameToValueMap.get(arr[2].substring(0, 3)) + '-' + arr[0];
    // console.log(monthEndDate)
    this.attendanceService.getMonthFilterAttendanceMainDashboard().subscribe((data: any) => {
      this.loadedMonthFilters = data;
      this.selectedMonthFilter = this.loadedMonthFilters[0];
      this.overallPerformanceMonthFilter = this.loadedMonthFilters[0];
      this.isMonthFilter = true;
    });
  }

  getMonthNumFromName() {
    this.monthNameToValueMap.set('Jan', '01');
    this.monthNameToValueMap.set('Feb', '02');
    this.monthNameToValueMap.set('Mar', '03');
    this.monthNameToValueMap.set('Apr', '04');
    this.monthNameToValueMap.set('May', '05');
    this.monthNameToValueMap.set('Jun', '06');
    this.monthNameToValueMap.set('Jul', '07');
    this.monthNameToValueMap.set('Aug', '08');
    this.monthNameToValueMap.set('Sep', '09');
    this.monthNameToValueMap.set('Oct', '10');
    this.monthNameToValueMap.set('Nov', '11');
    this.monthNameToValueMap.set('Dec', '12');
  }

  getMonthEndDateFromMonth(month) {
    switch (month)  {
      case 'Jan' :
      case 'Mar' :
      case 'May' :
      case 'Jul' :
      case 'Aug' :
      case 'Oct' :
      case 'Dec' :
        return '31';
      case 'Apr' :
      case 'Jun' :
      case 'Sep' :
      case 'Nov' :
        return '30';
      case 'Feb' :
        return '28';
      default :
        break;
    }
  }

  changeActiveMonth() {
    const arr = this.selectedMonthFilter.split(' ');
    const monthFirstDate = '01-' + arr[2].substring(0, 3) + '-' + arr[0];
    this.getTimeLogData(monthFirstDate);
  }
}
