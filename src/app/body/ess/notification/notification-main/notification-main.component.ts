import {Component, NgZone, OnInit} from '@angular/core';
import {LoginServiceService} from '../../../../service/login-service.service';
import {NavigationEnd, Router} from '@angular/router';
import {ResponsiveService} from '../../../../utility/responsive-service';
import {Profile} from '../../../../_global/profile';
import {environment} from '../../../../../environments/environment';
import {GeneralOps} from '../../../../utility/GeneralOps';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-main',
  templateUrl: './notification-main.component.html',
  styleUrls: ['./notification-main.component.css']
})
export class NotificationMainComponent implements OnInit {
  checkPermission = new GeneralOps();
  componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  opdDefaultFilter = 'All';
  notificationSelectedTab = {search: 'personal', section: '', year: new Date().getFullYear(), filter: ''};
  selectedSection;
  filter;

  constructor(private httpservice: LoginServiceService, public router: Router, private responsiveService: ResponsiveService,
              private zone: NgZone, private activeRoute: ActivatedRoute) {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.activeRoute.queryParams
      .subscribe((params: any) => {
        this.notificationSelectedTab = params;
        if (Object.keys(this.notificationSelectedTab).length === 0) {
          this.notificationSelectedTab = {search: 'personal', section: 'notifications', year: new Date().getFullYear(), filter: 'All'};
        }
      });


    // GET INITIAL VALUE BASED ON DEVICE WIDTHS AT TIME THE APP RENDERS
    this.isMobile = this.responsiveService.isPhone();
    this.isTablet = this.responsiveService.isTablet();
    this.isDesktop = this.responsiveService.isDesktop();

    let that = this;

    /*---------------------------------------------------
     TAP INTO LISTENERS FOR WHEN DEVICE WIDTH CHANGES
     ---------------------------------------------------*/

    this.responsiveService.OnPhone(
      function (mediaQueryList: MediaQueryList) {
        that.ShowMobile();
      }
    );

    this.responsiveService.OnTablet(
      function (mediaQueryList: MediaQueryList) {
        that.ShowMobile();
      }
    );

    this.responsiveService.OnDesktop(
      function (mediaQueryList: MediaQueryList) {
        that.ShowDesktop();
      }
    );
  }

  ShowMobile() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.isMobile = true;
      this.isTablet = false;
      this.isDesktop = false;
    });
  }

  ShowDesktop() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.isMobile = false;
      this.isTablet = false;
      this.isDesktop = true;
    });
  }

  ShowTablet() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.isMobile = false;
      this.isTablet = true;
      this.isDesktop = false;
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
