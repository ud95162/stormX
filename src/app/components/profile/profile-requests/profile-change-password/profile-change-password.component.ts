import { Component, OnInit } from '@angular/core';
import {Profile} from '../../../../_global/profile';
import {environment} from '../../../../../environments/environment';
import {LoginServiceService} from '../../../../service/login-service.service';
import {ProfileUserServiceService} from '../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.css']
})
export class ProfileChangePasswordComponent implements OnInit {

  newPassword = '';
  confirmPwd = '';

  errorCode;
  errorType;
  errorMessage;

  passwordMatch = true;

  validations = {
    characters: false,
    isUsername : false,
    digits: false,
    upperCase: false,
    lowerCase: false,
    symbol: false,
    confirmPassword: false
  };
  constructor(private httpservice: LoginServiceService,
              private profileService: ProfileUserServiceService,
              private interCommunicationService: InterCommunicationServiceService,
              private modalUiService: ModalUiServiceService) { }

  ngOnInit() {
  }

  changePassword() {

    if (this.newPassword === this.confirmPwd) {
      this.passwordMatch = true;
      const postJson = {
        'newPassword': this.newPassword
      };
      this.profileService.changeEmployeePassword(postJson)
        .subscribe(( data: any ) => {
            this.hideModal('changePwd');
            this.openErrorModal(9999, 'SUCCESS', 'Successfully change password');
            this.logoutClick();
          },
          (postEmployeeLeaveError: HttpErrorResponse) => {
            if (postEmployeeLeaveError.status === 200) {
              this.hideModal('changePwd');
              this.openErrorModal(9999, 'SUCCESS', 'Successfully change current password');
              this.logoutClick();
            } else if (postEmployeeLeaveError.status === 500) {
              this.hideModal('changePwd');
              this.openErrorModal(9998, 'FAILED', postEmployeeLeaveError.error.message);
            }
          }
        );
    } else {
      this.passwordMatch = false;
    }
  }

  setNewPassword(val) {
    this.validatePassword(this.newPassword);
  }

  setConfirmPassword(val) {
    if (this.newPassword !== this.confirmPwd) {
      this.validations.confirmPassword = false;
    } else {
      this.validations.confirmPassword = true;
    }
  }

  validatePassword(newPassword) {
    this.validations.characters = this.newPassword.toString().length >= 8;
    this.validations.isUsername = Profile.USER_NAME !== this.newPassword && newPassword.toString().length !== 0;
    this.validations.digits = (/\d/.test(newPassword));
    this.validations.upperCase =  (/[A-Z]/.test(newPassword));
    this.validations.lowerCase =  (/[a-z]/.test(newPassword));
    this.validations.symbol = (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPassword));
    this.validations.confirmPassword = this.confirmPwd !== '' && this.newPassword === this.confirmPwd;
  }

  logoutClick() {
    this.httpservice.logoutUser()
      .subscribe(
        (data: any) => {
          for (const key in data) {
          }
        }
      );

    localStorage.clear();
    Profile.EMPLOYEE_ID = null;
    Profile.USER_TYPE = null;
    Profile.USER_TOKEN = null;
    Profile.USER_NAME = null;

    window.location.replace(environment.LOGIN_URL);
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }


  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
    (<HTMLInputElement>document.getElementById('newPassword')).value = '';
    (<HTMLInputElement>document.getElementById('confirmPassword')).value = '';
    this.validations.characters = false;
    this.validations.isUsername = false;
    this.validations.digits = false;
    this.validations.upperCase = false;
    this.validations.lowerCase = false;
    this.validations.symbol = false;
    this.validations.confirmPassword = false;
    this.newPassword = '';
    this.confirmPwd = '';

  }

}
