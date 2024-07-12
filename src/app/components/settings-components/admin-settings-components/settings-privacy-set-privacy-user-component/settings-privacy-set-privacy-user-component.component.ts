import {Component, OnInit} from '@angular/core';
import {AdminServiceService} from '../../../../service/admin-service.service';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-settings-privacy-set-privacy-user-component',
  templateUrl: './settings-privacy-set-privacy-user-component.component.html',
  styleUrls: ['./settings-privacy-set-privacy-user-component.component.css']
})
export class SettingsPrivacySetPrivacyUserComponentComponent implements OnInit {
  permissionGroups = [];
  resultset = [];
  loadingOverlayView = false;
  employeeGroup;
  errorCode;
  errorType;
  errorMessage;

  constructor(private httpservice: AdminServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.getPermissionKeys();
  }

  getPermissionKeys() {
    this.permissionGroups = [];
    this.httpservice.getPermissionCategoriesFromUserGroup()
      .subscribe(
        (data: any) => {
          this.resultset = data;
          this.employeeGroup = data[0].authSysUserGroup.userGroupName;
          for (let key in data) {
            this.permissionGroups.push(data[key].authSysUserGroup.userGroupName);
          }
        }, error => {
        }
      );
  }

  getPermission() {
    const searchKey = (<HTMLInputElement>document.getElementById('permissionKeyToSearch')).value;

    this.httpservice.getPermissionsForUsers(searchKey)
      .subscribe(
        (data: any) => {
          (<HTMLInputElement>document.getElementById('setPermissionEmpNo')).value = data.empNo;
          (<HTMLInputElement>document.getElementById('setPermissionName')).value = data.name;
          (<HTMLInputElement>document.getElementById('setPermissionDesignation')).value = data.designation;
          // (<HTMLInputElement>document.getElementById('setPermissionPermissionGroup')).value = data.userGroup;
          this.employeeGroup = data.userGroup;
        }
      );
  }

  inputKeyPress(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      (<HTMLInputElement>document.getElementById('permissionSearchButton')).click();
      return false;
    }
    return true;
  }

  savePermissionGroup() {
    const updatedUserGroup = (<HTMLInputElement>document.getElementById('setPermissionPermissionGroup')).value;
    const updatedUserId = (<HTMLInputElement>document.getElementById('setPermissionEmpNo')).value;

    const permissionJson = {
      'empNo': updatedUserId,
      'newUserGroupName': updatedUserGroup
    };

    this.httpservice.savePermissionGroup(permissionJson)
      .subscribe(
        (data: any) => {
        }, error => {
          if (error.status === 200) {
            this.openErrorModal(1111, 'SUCCESS', '');
            this.getPermission();
          } else {
            this.openErrorModal(1112, 'FAILED', '');
          }
        }
      );
    this.interCommunicationServiceService.changeUserGroup(true);
    // this.getPermission();
  }
  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }
}
