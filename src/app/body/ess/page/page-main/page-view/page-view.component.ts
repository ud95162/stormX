import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../utility/responsive-service';
import {PageServiceService} from '../../../../../service/page-service.service';
import {NavigationEnd, Router} from '@angular/router';
import {Profile} from '../../../../../_global/profile';
import {GeneralOps} from "../../../../../utility/GeneralOps";

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  pageId = localStorage.getItem('pgid');
  pageName = localStorage.getItem('pgnm');

  pageHeader;
  showPage = false;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  home = true;
  about;
  photos;
  review;
  homeTabLI = 'c-page-nav__item  is-selected';
  aboutTabLI = 'c-page-nav__item';
  photosTabLI = 'c-page-nav__item';
  reviewTabLI = 'c-page-nav__item';

  constructor(private responsiveService: ResponsiveService, private zone: NgZone, private httpservice: PageServiceService, public router: Router) {
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

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;
        if (currentUrl.includes('page')) {
          this.loadPageHeader();
          location.reload();
        }
      }
    });
  }

  ngOnInit() {
    this.loadPageHeader();
  }

  loadPageHeader() {
    this.httpservice.getPageHeader(this.pageId)
      .subscribe(
        (data: any) => {
          this.pageHeader = data;
          if (data.pageId != null) {
            this.showPage = true;
          } else {
            this.showPage = false;
          }
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
  changeTabs(tabname) {

    if (tabname === 'home') {
      this.home = true;
      this.about = false;
      this.photos = false;
      this.review = false;
      this.homeTabLI = 'c-page-nav__item  is-selected';
      this.aboutTabLI = 'c-page-nav__item';
      this.photosTabLI = 'c-page-nav__item';
      this.reviewTabLI = 'c-page-nav__item';
    }

    if (tabname === 'about') {
      this.home = false;
      this.about = true;
      this.photos = false;
      this.review = false;
      this.homeTabLI = 'c-page-nav__item';
      this.aboutTabLI = 'c-page-nav__item  is-selected';
      this.photosTabLI = 'c-page-nav__item';
      this.reviewTabLI = 'c-page-nav__item';
    }

    if (tabname === 'photos') {
      this.home = false;
      this.about = false;
      this.photos = true;
      this.review = false;
      this.homeTabLI = 'c-page-nav__item';
      this.aboutTabLI = 'c-page-nav__item';
      this.photosTabLI = 'c-page-nav__item  is-selected';
      this.reviewTabLI = 'c-page-nav__item';
    }

    if (tabname === 'review') {
      this.home = false;
      this.about = false;
      this.photos = false;
      this.review = true;
      this.homeTabLI = 'c-page-nav__item';
      this.aboutTabLI = 'c-page-nav__item';
      this.photosTabLI = 'c-page-nav__item';
      this.reviewTabLI = 'c-page-nav__item  is-selected';
    }
  }

}
