import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../utility/responsive-service';
import {Profile} from '../../../../../_global/profile';
import {PersistenceService} from 'angular-persistence';
import {Router} from "@angular/router";
import {GeneralOps} from "../../../../../utility/GeneralOps";

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})

export class HomeBodyComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;


  constructor(private responsiveService: ResponsiveService, private zone: NgZone,
              private persistenceService: PersistenceService,
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

  changeActiveTab(activeTab) {
    if (activeTab === 'KnowledgeGraph') {
      this.router.navigate(['./home/knowledge-graph']);
    }
    if (activeTab === 'Leave') {
      this.router.navigate(['./home/leave']);
    }
    if (activeTab === 'People') {
      this.router.navigate(['./home/employee']);
    }
    if (activeTab === 'Project') {
      this.router.navigate(['./home/project']);
    }
    if (activeTab === 'issueLetters') {
      this.router.navigate(['./issue']);
    }
    if (activeTab === 'manageFacility') {
      this.router.navigate(['./facility']);
    }
    if (activeTab === 'manageOpd') {
      this.router.navigate(['./opd']);
    }
    if (activeTab === 'faceRec') {
      this.router.navigate(['./attendance/face-rec']);
    }
    if (activeTab === 'recruitmentDashboard') {
      this.router.navigate(['./hc-dashboard']);
    }
    if (activeTab === 'usageDashboard') {
      this.router.navigate(['./usage-dashboard']);
    }
   if (activeTab === 'ResourceMap') {
     this.router.navigate(['./home/under-construction']);
   }
   if (activeTab === 'Summary') {
     this.router.navigate(['./home/under-construction']);
   }
    if (activeTab === 'WorkEffort') {
      this.router.navigate(['./home/work-effort']);
    }
    if (activeTab === 'WorkSummary') {
      this.router.navigate(['./home/attendance']);
    }
    if (activeTab === 'hrAnalytics') {
      this.router.navigate(['./hr-analytics/main']);
    }

  }
}
