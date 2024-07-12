import {Component, NgZone, OnInit} from '@angular/core';
import {Profile} from '../../../../../../_global/profile';
import {ResponsiveService} from '../../../../../../utility/responsive-service';
import {GeneralOps} from "../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-event-calendar-view',
  templateUrl: './event-calendar-view.component.html',
  styleUrls: ['./event-calendar-view.component.css']
})
export class EventCalendarViewComponent implements OnInit {
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  employeeId = localStorage.getItem('leid_');

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  isLocationsLoaded = false;

  constructor(private responsiveService: ResponsiveService, private zone: NgZone) {
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

  setLocationsLoadedStatus($event: any) {
    this.isLocationsLoaded = true;
  }
}
