import {Component, OnInit} from '@angular/core';
import {SettingsServiceService} from '../../../../service/settings-service.service';

@Component({
  selector: 'app-settings-privacy-set-list-component',
  templateUrl: './settings-privacy-set-list-component.component.html',
  styleUrls: ['./settings-privacy-set-list-component.component.css']
})
export class SettingsPrivacySetListComponentComponent implements OnInit {
  permissionGroups = [];
  resultset = [];
  loadingOverlayView = false;
  visibleIndex = -1;


  constructor(private httpservice: SettingsServiceService) {
  }

  ngOnInit() {
    // this.getPermissionGroups();
  }

  setIdName(stringToUpdate) {
    return stringToUpdate.replace(/\s/g, '');
  }

  getPermissionGroups() {
    this.httpservice.getPermissionGroupWise()
      .subscribe(
        (data: any) => {
          this.resultset = data;
          for (let key in data) {
            this.permissionGroups.push(data[key].userGroup.userGroupName);
          }
        }
      );
  }

  checkPermissionAvailable(permissionAvailable) {
    let permissionChecked;
    switch (permissionAvailable) {
      case true:
        permissionChecked = 'checked';
        break;
      case false:
        permissionChecked = '';
        break;
    }
    return permissionChecked;
  }

  checkDisabled(disable) {
    let disableComponent;
    switch (disable) {
      case true:
        disableComponent = '';
        break;
      case false:
        disableComponent = 'disabled';
        break;
    }
    return disableComponent;
  }

  setClass(array) {
    if (array.length > 0) {
      return 'col-sm-12';
    } else {
      return 'col-sm-2 col-sm-2-height';
    }
  }

  changePermissionGroup(checkboxid, permissionName, userGroupName) {
    this.loadingOverlayView = true;

    const typePermission = (<HTMLInputElement>document.getElementById('checkbox' + checkboxid)).checked;

    const newjson = {
      'granted': typePermission,
      'permissionName': permissionName,
      'userGroupName': userGroupName
    };

    this.httpservice.updatePermissionToGroup(newjson)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadingOverlayView = false;
            this.getPermissionGroups();
          }
        }
      );
  }

  showPrivacyResponses(index: number) {
    if (this.visibleIndex === index) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = index;
    }
  }

}
