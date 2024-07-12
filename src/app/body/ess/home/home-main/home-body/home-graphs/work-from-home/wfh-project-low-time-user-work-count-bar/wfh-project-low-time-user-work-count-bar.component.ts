import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../../../../utility/responsive-service';
import {DashboardOverallDataServiceService} from '../../../../../../../../service/dashboard-overall-data-service.service';
import {Router} from '@angular/router';
import {InterCommunicationServiceService} from '../../../../../../../../service/support-services/inter-communication-service.service';
import {Search} from '../../../../../../../../_global/search';

@Component({
  selector: 'app-wfh-project-low-time-user-work-count-bar',
  templateUrl: './wfh-project-low-time-user-work-count-bar.component.html',
  styleUrls: ['./wfh-project-low-time-user-work-count-bar.component.css']
})
export class WfhProjectLowTimeUserWorkCountBarComponent implements OnInit {

  @Input() projectWiseUserCountBarChartLabels;
  @Input() projectWiseUserCountBarChartData;
  @Input() projectWiseUserCountBarChartResponse;

  public barChartData = [];

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  /*---------------------------------------------------
   GRAPHS
   ---------------------------------------------------*/
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      labels: false
    }
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartColors: Array<any> = [
    { // orange
      backgroundColor: '#0093ff',
      borderColor: '#0093ff',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  amCore;
  amCharts;
  lineChart;

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

    // @ts-ignore
    this.amCore = window.am4core;
    // @ts-ignore
    this.amCharts = window.am4charts;
  }

  ngOnInit() {
    console.log(this.projectWiseUserCountBarChartResponse);
    this.getDataForChart();

    // this.barChartData.push({data: this.projectWiseUserCountBarChartData, label: 'User Instances'});
  }

  getDataForChart() {
    this.lineChart = this.createLineChart( 'degreeClass' );
    for (let key in this.projectWiseUserCountBarChartResponse) {
      this.lineChart.data.push({'value': this.projectWiseUserCountBarChartResponse[key][1],
        'degree': this.projectWiseUserCountBarChartResponse[key][0]});
    }
  }

  createLineChart( htmlId: string ) {

    const chart = this.amCore.create('degreeClass', this.amCharts.XYChart);

    // Create axes
    const categoryAxis = chart.xAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.dataFields.category = 'degree';
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.disabled = true;

    const valueAxis = chart.yAxes.push(new this.amCharts.ValueAxis());
    valueAxis.renderer.grid.template.strokeDasharray = '4,4';
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.min = 0;

// Do not crop bullets
    chart.maskBullets = false;

// Remove padding
    chart.paddingBottom = 0;

// Create series
    const series = chart.series.push(new this.amCharts.ColumnSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'degree';
    series.columns.template.propertyFields.fill = 'color';
    series.columns.template.propertyFields.stroke = 'color';
    series.columns.template.column.cornerRadiusTopLeft = 15;
    series.columns.template.column.cornerRadiusTopRight = 15;
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/b]';
    return chart;
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
