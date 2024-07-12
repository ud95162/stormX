import { Component, OnInit } from '@angular/core';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
import {AttendanceServiceService} from '../../../../service/attendance-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {
  InterCommunicationServiceService
} from '../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-settings-attendance-exceptions',
  templateUrl: './settings-attendance-exceptions.component.html',
  styleUrls: ['./settings-attendance-exceptions.component.css']
})
export class SettingsAttendanceExceptionsComponent implements OnInit {

  attendanceExceptionsLoaded: any;
  attendanceExceptions = [];
  newEmpNo: any;
  email: any;
  newAttendanceExceptions = { newEmpNo: null };
  errorMessage = false;

  constructor(private modalUiService: ModalUiServiceService,
              private attendanceService: AttendanceServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private communicationService: InterCommunicationServiceService) { }

  ngOnInit() {
    this.getAttendanceExceptions();
  }

  /**
   * Get Employees who are currently in attendance exception list
   */
  getAttendanceExceptions() {
    this.attendanceService.getAttendanceAbsentExclude()
      .subscribe((data) => {
        this.attendanceExceptions = Object.assign(data);
        this.attendanceExceptionsLoaded = true;
      });
  }

  /**
   * Save a new employee as a exceptional employee
   */
  saveNewAttendanceException() {
  this.newAttendanceExceptions.newEmpNo = this.newEmpNo;
    this.attendanceService.addNewAttendanceExclude(this.newAttendanceExceptions)
      .subscribe((data) => {
        this.hideModal('createAttendanceException');
        this.getAttendanceExceptions();
      }, (error: HttpErrorResponse) => {
        if (error.status === 200) {
          this.openErrorModal('9996', 'SUCCESS', 'Successfully Added');
        } else {
          const err = (error.error).split(':')[1].trim();
          this.errorMessage = (err.split(' ')).slice(0, 2).join(' ');
          this.openErrorModal(9994, 'FAILED', this.errorMessage);
        }
      });
  }

  /**
   * Remove the employee from the exceptional list
   * @param employee
   */
  deleteAttendanceException(employee: any) {
    this.attendanceService.deleteAttendanceExclude(employee.newEmpNo)
      .subscribe((data) => {
        this.getAttendanceExceptions();
        this.openErrorModal('9996', 'Deleted', 'Successfully Deleted');
      });
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.interCommunicationServiceService.changeErrorCode(errorCode, errorType, errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  showModal(createAttendanceException: string) {
    this.modalUiService.showModal(createAttendanceException);
  }

  hideModal(createAttendanceException: string) {
    this.modalUiService.hideModal(createAttendanceException);
    this.newEmpNo = '';
  }
}
