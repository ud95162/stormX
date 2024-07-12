import {Component, OnInit} from '@angular/core';
import {AdminServiceService} from '../../../../service/admin-service.service';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {HttpErrorResponse} from "@angular/common/http";
import {CONSTANT} from "../../../../utility/Constants";

@Component({
  selector: 'app-settings-user-password-reset-component',
  templateUrl: './settings-user-password-reset-component.component.html',
  styleUrls: ['./settings-user-password-reset-component.component.css']
})
export class SettingsUserPasswordResetComponentComponent implements OnInit {


  permissionGroups = [];
  resultset = [];
  loadingOverlayView = false;
  resetPasswordButton = false;
  validationErrorMessage = '';


  constructor(
    private httpservice: AdminServiceService,
    private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
  }


  getPermission() {
    const searchKey = (<HTMLInputElement>document.getElementById('pwdResetKeyToSearch')).value;
    this.validationErrorMessage = '';

    this.httpservice.getPermissionsForUsers(searchKey)
      .subscribe(
        (data: any) => {
          (<HTMLInputElement>document.getElementById('setPermissionEmpNo')).value = data.empNo;
          (<HTMLInputElement>document.getElementById('setPermissionName')).value = data.name;
          (<HTMLInputElement>document.getElementById('setPermissionDesignation')).value = data.designation;
          (<HTMLInputElement>document.getElementById('passwordResetEmail')).value = data.email;
          (<HTMLInputElement>document.getElementById('passwordResetLoginType')).value = data.loginType;

          if (data.loginType === 'LDAP') {
            this.resetPasswordButton = false;
            this.validationErrorMessage = CONSTANT.ERROR_MSG.PASSWORD_RESET_LDAP_ERROR;
          } else {
            this.resetPasswordButton = true;
          }
        }
      );
  }

  inputKeyPress(e) {
    e = e || window.event;
    this.resetPasswordButton = false;
    if (e.keyCode === 13) {
      (<HTMLInputElement>document.getElementById('passwordResetButton')).click();
      return false;
    } else {
      return true;
    }
  }




  resetUserPassword() {
    this.resetPasswordButton = false;
    const updatedUserNo = (<HTMLInputElement>document.getElementById('setPermissionEmpNo')).value;

    const permissionJson = {
      'empNo': updatedUserNo,
    };

    this.httpservice.resetUserPassword(permissionJson)
      .subscribe(
        (data: any) => {
          console.log(data)
          this.openErrorModal('9996', 'SUCCESS', 'Successfully reset password');
          this.resetPasswordButton = true;
        },  (resetPasswordError: HttpErrorResponse) => {
          if (resetPasswordError.status === 200) {
            this.openErrorModal(9995, 'SUCCESS', 'Successfully reset password');
            this.resetPasswordButton = true;
          } else if (resetPasswordError.status === 500) {
            this.openErrorModal(9994, 'FAILED', resetPasswordError.error.message);
            this.resetPasswordButton = true;
          }
        }
      );
  }


  openErrorModal(errorCode, errorType, errorMessage) {
    this.interCommunicationServiceService.changeErrorCode(errorCode, errorType, errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }
}
