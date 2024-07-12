import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from "../../../../../../../../utility/responsive-service";
import { AmChartService } from "../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-wfh-worked-hour-analysis-dnut',
  templateUrl: './wfh-worked-hour-analysis-dnut.component.html',
  styleUrls: ['./wfh-worked-hour-analysis-dnut.component.css']
})
export class WfhWorkedHourAnalysisDnutComponent implements OnInit {

  @Input() workHourAnalysisDoughnutChartData;
  @Input() workHourAnalysisDoughnutChartLabels;

  dataLoaded = false;


  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  // Doughnut


  constructor(private responsiveService: ResponsiveService, private zone: NgZone, private amChartService: AmChartService) {

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
    this.loadWfhHoursData();
    this.dataLoaded = true;
  }


  loadWfhHoursData(){
    const chart = this.amChartService.createDnutWithRadialGradient('eWfhHoursDnutChart', 'label','value', ['#F98C68', '#FAECBA', '#6278E9', '#BAC5FA', '#0099EA', '#3CAEA3', '#AC3CAE']);
    for (let key in this.workHourAnalysisDoughnutChartData) {
      chart.data.push({
        'label': this.workHourAnalysisDoughnutChartLabels[key],
        'value': this.workHourAnalysisDoughnutChartData[key]
      });
    }
  }

}
