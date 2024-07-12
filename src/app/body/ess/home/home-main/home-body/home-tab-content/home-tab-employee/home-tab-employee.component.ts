import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../../../utility/responsive-service';
import {Profile} from '../../../../../../../_global/profile';
import {Router} from "@angular/router";
import {GeneralOps} from "../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-home-tab-employee',
  templateUrl: './home-tab-employee.component.html',
  styleUrls: ['./home-tab-employee.component.css']
})
export class HomeTabEmployeeComponent implements OnInit {
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  // tabName used for tab changing & navgation ngClass adding condition handling
  tabName:string = 'roleWiseDistribution';
  backToHome = false;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  constructor(private responsiveService: ResponsiveService, private zone: NgZone,
              public router: Router) {
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

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.changeTabs('roleWiseDistribution');
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


  changeTabs(tabName: string) {
    this.tabName = tabName;
  }

  backToHomePage() {
    this.router.navigate(['./home/main']);
  }
}
