import {Component, HostBinding , OnInit} from '@angular/core';
import {Profile} from '../../../../../_global/profile';
import {GeneralOps} from "../../../../../utility/GeneralOps";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  employeeId = Profile.EMPLOYEE_ID;
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  @HostBinding('class') classes = 'profile-page';
  constructor() {
  }

  ngOnInit() {
  }
}
