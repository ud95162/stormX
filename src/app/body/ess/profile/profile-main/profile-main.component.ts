import {Component, OnInit} from '@angular/core';
import {LoginServiceService} from '../../../../service/login-service.service';
import {NavigationEnd, Router} from '@angular/router';
import {Profile} from '../../../../_global/profile';
import {environment} from '../../../../../environments/environment';
import {GeneralOps} from "../../../../utility/GeneralOps";

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit {
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  constructor(private httpservice: LoginServiceService, public router: Router) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    this.checkAuthenticated();
  }

  checkAuthenticated() {
    this.httpservice.checkTokenStatus()
      .subscribe(
        (data: any) => {
          if (data[0].authenticated === false) {
            window.location.replace(environment.LOGIN_URL);
          }
        }
      );
  }
}
