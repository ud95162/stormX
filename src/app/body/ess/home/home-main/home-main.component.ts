import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LoginServiceService} from '../../../../service/login-service.service';
import {Profile} from '../../../../_global/profile';
import {environment} from '../../../../../environments/environment';
import {GeneralOps} from "../../../../utility/GeneralOps";

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {
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
    this.loadEmployeePermission();
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

  loadEmployeePermission() {
    if (!this.checkPermission.checkUserHavePermissionForSection('AdminDashboard')) {
      this.router.navigate(['./feed/main']);
    }
  }
}
