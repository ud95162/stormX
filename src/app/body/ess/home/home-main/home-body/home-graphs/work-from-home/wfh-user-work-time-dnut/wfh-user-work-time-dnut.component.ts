import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../../../../utility/responsive-service';
import {AmChartService} from "../../../../../../../../service/am-chart-service/am-chart.service";


@Component({
  selector: 'app-wfh-user-work-time-dnut',
  templateUrl: './wfh-user-work-time-dnut.component.html',
  styleUrls: ['./wfh-user-work-time-dnut.component.css']
})
export class WfhUserWorkTimeDnutComponent implements OnInit {

  @Input() userWorkTimeDoughnutChartData;
  @Input() userWorkTimeDoughnutChartLabels;

  userWorkTimeDoughnutChartData1 = [5, 10, 15, 20];
  userWorkTimeDoughnutChartLabels1 = ['label 01', 'label 02', 'label 03', 'label 04'];


  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;


  constructor(private responsiveService: ResponsiveService, private zone: NgZone, private amChartService: AmChartService ) {

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

  }

}
