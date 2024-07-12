import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AttendanceServiceService} from '../../../../service/attendance-service.service';
import * as moment from 'moment';
import {ModalUiServiceService} from "../../../../service/ui-services/modal-ui-service.service";
import {FileUploadServiceService} from "../../../../service/support-services/file-upload-service.service";
import {AttendanceResponse} from "../AttendanceResponse";

@Component({
  selector: 'app-attendance-log-summary',
  templateUrl: './attendance-log-summary.component.html',
  styleUrls: ['./attendance-log-summary.component.css']
})
export class AttendanceLogSummaryComponent implements OnInit {

  @Input() startDate;
  @Input() endDate;
  attendanceLogs;
  attendanceLogsDataLoaded = false;
  selectedDayAttendanceLogs;
  selectedDayAttendanceLogsView = false;
  loggedEmpId: any = localStorage.getItem('leid_');
  searchEmpId: any = localStorage.getItem('lsei_');

  // @ts-ignore
  @ViewChild('employeeAttendanceLogsSummaryTable', {static: false}) employeeAttendanceLogsSummaryTable: ElementRef;
  constructor(private attendanceService: AttendanceServiceService,
              private modalService: ModalUiServiceService,
              private fileUploadService: FileUploadServiceService) { }

  ngOnInit() {
    this.getAttendanceLogs(this.startDate, this.endDate);
  }

  getAttendanceLogs(startDate, endDate) {
    this.attendanceLogsDataLoaded = false;
    this.attendanceService.getEmployeeAttendanceLogs(localStorage.getItem('lsei_'),
      localStorage.getItem( 'lsei_'), startDate, endDate)
      .subscribe((data: any) => {
        this.attendanceLogs = data;
        this.attendanceLogsDataLoaded = true;
      });
  }

  modifiedEmpNo(empNo: string): string {
    // Replace '0' with an empty string for leading zeros
    const regex = /^(\D+)0+(?=\d)/;
    return  empNo.replace(regex, '$1');
  }

  getAttendancePercentage(start: any, end: any) {
    const startTime = moment(start, 'HH:mm');
    const endTime = moment(end, 'HH:mm');
    const diffMilliseconds = Math.abs(endTime.valueOf() - startTime.valueOf());
    const diffHours = diffMilliseconds / (1000 * 60 * 60);
    return { width: Math.round((diffHours / 24) * 100) + '%' };
  }

  setTDStyles(index: number, logsArrayLength) {
    if (index === 0) {
      return ' time-slot-table-left-corner-td';
    } else if (index === logsArrayLength - 1) {
      return ' time-slot-table-right-corner-td';
    } else {
      return '';
    }
  }

  getAttendanceTitle(startTime: any, endTime: any, betweenTimeHrs: any, status: any, startDevice: any, endDevice: any) {
    switch (status) {
      case 'AWAY' :
        return startTime + ' to ' + endTime + ' (' + betweenTimeHrs + 'h)';
      case 'IN' :
        if ( startDevice !== null && endDevice !== null ) {
          return startTime + ' (' + startDevice + ') to ' + endTime + ' (' + endDevice + ') \n' + betweenTimeHrs + 'h' + '\nIn Office';
        } else {
          return startTime + ' to ' + endTime + ' (' + betweenTimeHrs + 'h)' + '\nIn Office';
        }
      case 'OUT' :
        if ( startDevice !== null && endDevice !== null ) {
          return startTime + ' (' + startDevice + ') to ' + endTime + ' (' + endDevice + ') \n' + betweenTimeHrs + 'h' + '\nOut of Office';

        } else {
          return startTime + ' to ' + endTime + ' (' + betweenTimeHrs + 'h)' + '\nOut of Office';
        }
    }
  }

  getAppliedLeaveTypeFromCount(count) {
    switch (count) {
      case 0.25: return 'Short Leave';
      case 0.5: return 'Half Day Leave';
      case 1.0: return 'Full Day Leave';
    }
  }
  showModal(modalId, dataForDay) {
    this.selectedDayAttendanceLogs = dataForDay;
    this.selectedDayAttendanceLogsView = true;
    this.modalService.showModal( modalId );
  }
  hideModal(modalId) {
    this.modalService.hideModal( modalId );
  }

  downloadAttendanceLogsReport() {
    const fileName = localStorage.getItem('lsei_') + '_' + this.startDate + '_to_' + this.endDate + '_Attendance_logs_generatedByKRIYO';
    this.fileUploadService.exportMultipleDataSetAsExcelFileForTable(this.employeeAttendanceLogsSummaryTable.nativeElement, fileName);
  }
}
