import {Component, NgZone, OnInit} from '@angular/core';
import { InterCommunicationServiceService } from '../../../../../service/support-services/inter-communication-service.service';
import {ResponsiveService} from '../../../../../utility/responsive-service';
import {Profile} from '../../../../../_global/profile';
import {GeneralOps} from "../../../../../utility/GeneralOps";

@Component({
  selector: 'app-feed-view',
  templateUrl: './feed-view.component.html',
  styleUrls: ['./feed-view.component.css']
})
export class FeedViewComponent implements OnInit {
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  employeeId = localStorage.getItem('leid_');

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  constructor(private responsiveService: ResponsiveService,
              private zone: NgZone,
              private interCommunicationServiceService: InterCommunicationServiceService) {
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


  onScroll(event): void{
    var isScrolling = this.interCommunicationServiceService;
    $(".Middle").scroll(function() {
      if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        isScrolling.updatingScrollingDiv('scrolling');
      }
    });

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
}
