import {Component, OnInit, ViewChild} from '@angular/core';
import {AttendanceLogSummaryComponent} from './attendance-log-summary/attendance-log-summary.component';

@Component({
  selector: 'app-profile-attendance',
  templateUrl: './profile-attendance.component.html',
  styleUrls: ['./profile-attendance.component.css']
})
export class ProfileAttendanceComponent implements OnInit {

  @ViewChild('attendanceLogSummaryComponent', {static: false}) logSummaryComponent: AttendanceLogSummaryComponent;
  startDate = new Date(new Date().getTime() - (14 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
  endDate = new Date().toISOString().slice(0, 10);

  constructor() { }

  ngOnInit() {
  }

  changeDates() {
    if (this.startDate > this.endDate) {
      this.endDate = this.startDate;
    }
    this.logSummaryComponent.getAttendanceLogs(this.startDate, this.endDate);
  }

}
