import {Component, OnInit} from '@angular/core';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {Profile} from '../../../../_global/profile';
import {Search} from '../../../../_global/search';
import {Router} from '@angular/router';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {isUserSuppressingKeyboardEvent} from "ag-grid-community/dist/lib/utils/keyboard";

@Component({
  selector: 'app-settings-privacy-user-groups-component',
  templateUrl: './settings-privacy-user-groups-component.component.html',
  styleUrls: ['./settings-privacy-user-groups-component.component.css']
})
export class SettingsPrivacyUserGroupsComponentComponent implements OnInit {
  usergroupdataset = [];
  showusergroups = false;

  userGroupFilter = '';
  filteredUserGroup = [];

  constructor(private settingshttpservice: SettingsServiceService, public router: Router, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.interCommunicationServiceService.loadUserGroup.subscribe(loadUsers => {
      if (loadUsers) {
        this.loadUserGroups();
      }
    });
  }

  loadUserGroups() {
    this.settingshttpservice.getUserGroups()
      .subscribe(
        (data: any) => {
          this.usergroupdataset = data.data;
          this.filteredUserGroup = data.data;
          if (this.usergroupdataset.length > 0) {
            this.showusergroups = true;
          } else {
            this.showusergroups = false;
          }
        }
      );
  }

  applyFilter(event: Event) {
    this.showusergroups = false;
    this.userGroupFilter = (event.target as HTMLInputElement).value;

    if (this.userGroupFilter != null) {
      let newRes = [];

      this.filteredUserGroup.forEach( response => {
        let userGrpInclude = false;
        if (response.userGroup.toLowerCase().includes(this.userGroupFilter.toLowerCase())) {
          userGrpInclude = true;
        }
        if (response.employeeList.filter(fit => new RegExp(this.userGroupFilter, 'i').test((fit.name))).length > 0) {
          newRes.push(
            {userGroup: response.userGroup, employeeList: response.employeeList.filter
              (fit => new RegExp(this.userGroupFilter, 'i').test((fit.name)))});
        } else if (userGrpInclude === true) {
          newRes.push(response);
        }
      });
      this.usergroupdataset = newRes;
      this.showusergroups = true;
    }
  }


  profileRedirect(employeeId) {
    if (employeeId === Profile.EMPLOYEE_ID) {
      this.router.navigate(['./profile/main']);
    } else {
      Search.SEARCH_EMPLOYEE_ID = employeeId;
      localStorage.setItem('lsei_', employeeId);
      this.router.navigate(['./profile/_search']);
    }
  }

}
