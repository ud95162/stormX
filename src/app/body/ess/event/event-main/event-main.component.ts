import {Component, OnInit} from '@angular/core';
import {LoginServiceService} from '../../../../service/login-service.service';
import {Profile} from '../../../../_global/profile';
import {environment} from '../../../../../environments/environment';
import {GeneralOps} from "../../../../utility/GeneralOps";

@Component({
  selector: 'app-event-main',
  templateUrl: './event-main.component.html',
  styleUrls: ['./event-main.component.css']
})
export class EventMainComponent implements OnInit {
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  constructor(private loginServiceService: LoginServiceService) {
  }

  ngOnInit() {
    this.checkAuthenticated();
  }

  checkAuthenticated() {
    this.loginServiceService.checkTokenStatus()
      .subscribe(
        (data: any) => {
          if (data[0].authenticated === false) {
            window.location.replace(environment.LOGIN_URL);
          }
        }
      );
  }
}
