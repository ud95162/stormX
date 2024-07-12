import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Event} from "../../../../../../../../_global/event";
import {
  InterCommunicationServiceService
} from "../../../../../../../../service/support-services/inter-communication-service.service";
import {LeaveServiceService} from "../../../../../../../../service/attendance-leave/leave-service.service";
import {AttendanceServiceService} from "../../../../../../../../service/attendance-service.service";
@Component({
  selector: 'app-attendance-dashboard',
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.css']
})
export class AttendanceDashboardComponent implements OnInit {

  selectedDateForDashboard = Event.setCurrentDateTime().processedFullDate;
  selectedDateAndTime = Event.setCurrentDateTime().processedFullDate + 'T' +
    Event.setCurrentDateTime().roundupHour + ':' + Event.setCurrentDateTime().roundupMinute + ':00';
  attendanceData;
  attendanceDataLoaded = true;
  presentPercentage;
  officePercentage;
  homePercentage;
  absentPercentage;
  leavePercentage;
  presentEmployeeList = [];
  absentEmployeeList = [];
  wfoEmployeeList = [];
  wfhEmployeeList = [];
  leaveEmployeeList = [];
  notAWorkingDay = false;
  constructor(private router: Router,
              private interCommunicationService: InterCommunicationServiceService,
              private leaveService: LeaveServiceService,
              private attendanceService: AttendanceServiceService) { }

  ngOnInit() {
    this.getDateSummary();
    this.getProjectsAttendanceData();
  }

  backToSummaryPage() {
    this.router.navigate(['./home/main']);
  }

  dateChangedFromHeader() {
    this.interCommunicationService.setAttendanceDashboardStartDate(this.selectedDateForDashboard);
    this.getDateSummary();
    if (this.selectedDateForDashboard < Event.setCurrentDateTime().processedFullDate) {
      this.selectedDateAndTime = this.selectedDateForDashboard + 'T23:59:00';
    } else {
      this.selectedDateAndTime = this.selectedDateForDashboard + 'T' +
        Event.setCurrentDateTime().roundupHour + ':' + Event.setCurrentDateTime().roundupMinute + ':00';
    }
    this.getProjectsAttendanceData();
  }

  getProjectsAttendanceData() {
    this.attendanceService.getProjectWiseAttendance(this.selectedDateAndTime, 0,
      0, 0, 0)
      .subscribe ((data: any) => {
      });
  }

  getDateSummary() {
    this.leaveService.getWorkingDays(this.selectedDateForDashboard, this.selectedDateForDashboard)
      .subscribe((data: any) => {
        this.notAWorkingDay = data.workingDays.count === 0;
      });
  }
}
