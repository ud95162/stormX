import {Component, Input, NgZone, OnChanges, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../../../../utility/responsive-service';
import { AmChartService } from '../../../../../../../../service/am-chart-service/am-chart.service';

@Component({
  selector: 'app-wfh-worked-hours-analysis-line-chart',
  templateUrl: './wfh-worked-hours-analysis-line-chart.component.html',
  styleUrls: ['./wfh-worked-hours-analysis-line-chart.component.css']
})
export class WfhWorkedHoursAnalysisLineChartComponent implements OnChanges {

  @Input() workedHourAnalysisLineChartResponse;
  @Input() workedHourAnalysisLineChartDataLabels;
  @Input() workedHourAnalysisLineChartLegends;

  dataLoaded = false;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  public workedHourAnalysisLineChart = [
    {
      label: 'Daily',
      data: []
    },
    {
      label: 'Weekly',
      data: []
    },
    {
      label: 'Monthly',
      data: []
    },
    {
      label: 'Yearly',
      data: []
    }
  ];
  ngOnChanges() {
    this.workedHourAnalysisLineChart = this.workedHourAnalysisLineChartResponse;
    this.workedHourAnalysisLineChartDataLabels = [' ' , 'Absent', '< 2hrs', '2-4hrs', '4-6hrs', '6-8hrs', '8-10hrs',
      '10-12hrs', '12-15hrs', '15-20hrs', '> 20hrs'];
  }

  constructor(private responsiveService: ResponsiveService, private zone: NgZone, private amChartService: AmChartService) {

    // GET INITIAL VALUE BASED ON DEVICE WIDTHS AT TIME THE APP RENDERS
    this.isMobile = this.responsiveService.isPhone();
    this.isTablet = this.responsiveService.isTablet();
    this.isDesktop = this.responsiveService.isDesktop();

    const that = this;

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
    this.dataLoaded = true;
    this.loadWfhWorkedHoursAnalysisLineChart();
  }

  loadWfhWorkedHoursAnalysisLineChart() {
    const chart = this.amChartService.createMultipleLineChartWithFill(
        'eWfhWorkedHoursLineChart',
        'label',
        ['Daily', 'Weekly', 'Monthly', 'Yearly'],
        ['#3D6CB4', '#621055', '#2f8381', '#FFC551' ]
    );


    for (let labelIndex in this.workedHourAnalysisLineChartDataLabels) {
      const dataLabel = this.workedHourAnalysisLineChartDataLabels[labelIndex];
      const data = this.workedHourAnalysisLineChartResponse.map(entry => entry.data[labelIndex]);

      chart.data.push({
        'label': dataLabel,
        'Daily': data[0],
        'Weekly': data[1],
        'Monthly': data[2],
        'Yearly': data[3]
      });
    }
  }

}
