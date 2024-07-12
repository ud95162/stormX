import {Component, NgZone, OnInit} from '@angular/core';
import {Profile} from '../../../../../../../_global/profile';
import {ResponsiveService} from '../../../../../../../utility/responsive-service';
import {GeneralOps} from "../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-home-tab-knowledge-graph',
  templateUrl: './home-tab-knowledge-graph.component.html',
  styleUrls: ['./home-tab-knowledge-graph.component.css']
})
export class HomeTabKnowledgeGraphComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;


  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  activeTab: string;

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

    this.activeTab= 'knowledgeGraphSkillsAdmin';
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
  }

  changeTab(component) {
    this.activeTab = component;
  }
}
