import {Component, NgZone, OnInit} from '@angular/core';
import {Search} from '../../../../../../../../../_global/search';
import {Router} from '@angular/router';
import {DashboardOverallDataServiceService} from '../../../../../../../../../service/dashboard-overall-data-service.service';
import {ResponsiveService} from '../../../../../../../../../utility/responsive-service';
import {InterCommunicationServiceService} from '../../../../../../../../../service/support-services/inter-communication-service.service';
import {AmChartService} from "../../../../../../../../../service/am-chart-service/am-chart.service";
import {Profile} from "../../../../../../../../../_global/profile";
import {GeneralOps} from "../../../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-e-op-years-bar',
  templateUrl: './e-op-years-bar.component.html',
  styleUrls: ['./e-op-years-bar.component.css']
})
export class EOpYearsBarComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  public barChartLabels: string[] = [];
  public barChartData = [];

  receivedData = false;
  responseList = [];
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
    }
  };
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartColors: Array<any> = [
    { // green
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
  amSeries;
  lineChart;
  amChartsTheme;

  constructor(private responsiveService: ResponsiveService, private zone: NgZone,
              private httpservice: DashboardOverallDataServiceService, public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private amChartService: AmChartService) {
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

    // @ts-ignore
    this.amCore = window.am4core;
    // @ts-ignore
    this.amCharts = window.am4charts;

  }

  ngOnInit() {
    this.loadYearsInfo();
  }

  loadYearsInfo() {
    this.httpservice.getYearsWithCGData()
      .subscribe(
        (data: any) => {
          // this.lineChart = this.createLineChart( 'employeeYearsWithCompany' );
          const chart = this.amChartService.createLineChart('employeeYearsWithCompany', 'date', 'value', '#147AD6', '#147AD6')
          for (const key in data) {
            // this.lineChart.data.push({'date' : data[key].years, 'value' : data[key].count});
            chart.data.push({'date' : data[key].years, 'value' : data[key].count});
          }
        }
      );
  }

  createLineChart( htmlId: string ) {
    const lineChart = this.amCore.create(htmlId, this.amCharts.XYChart);

    const xAxis = lineChart.xAxes.push(new this.amCharts.CategoryAxis());
    xAxis.renderer.grid.template.location = 0.5;
    xAxis.dataFields.category = 'date';
    xAxis.renderer.minGridDistance = 50;
    xAxis.startLocation = 0.5;
    xAxis.endLocation = 0.5;
    xAxis.renderer.grid.template.disabled = true;

    const yAxis = lineChart.yAxes.push(new this.amCharts.ValueAxis());
    yAxis.renderer.grid.template.disabled = true;
    yAxis.min = 0;

    const amSeries = lineChart.series.push(new this.amCharts.LineSeries());
    amSeries.dataFields.valueY = 'value';
    amSeries.dataFields.categoryX = 'date';

    amSeries.strokeWidth = 3;
    amSeries.tensionX = 0.1;
    amSeries.fillOpacity = 0.4;
    amSeries.stroke = '#147AD6';
    amSeries.fill = '#147AD6';
    amSeries.bullets.push(new this.amCharts.CircleBullet());
    amSeries.connect = false;

    return lineChart;
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

  // events
  public chartClicked(e: any): void {
    const graphValue = e.active[0]._model.label;
    const searchObject = {
      'searchKey': graphValue,
      'searchOffset': 0,
      'searchFilter': 'All',
      'searchFilterValue': 'any'
    };

    this.interCommunicationServiceService.changeSearchKey(searchObject);
    Search.SEARCH_KEY = searchObject.searchKey;
    localStorage.setItem('lsk_', searchObject.searchKey);
    this.router.navigate(['./advance-search/main'], {
      queryParams: {
        'searchQuery': searchObject.searchKey,
        'searchFrom': Search.SEARCH_ROUTING.searchFrom.graph
      }
    });
  }

  chartHovered(e) {
  }

  // Mobile view get clicked list item
  onListItemClick(graphValue) {
    const searchObject = {
      'searchKey': graphValue,
      'searchOffset': 0,
      'searchFilter': 'All',
      'searchFilterValue': 'any'
    };

    this.interCommunicationServiceService.changeSearchKey(searchObject);
    Search.SEARCH_KEY = searchObject.searchKey;
    localStorage.setItem('lsk_', searchObject.searchKey);
    this.router.navigate(['./advance-search/main'], {
      queryParams: {
        'searchQuery': searchObject.searchKey,
        'searchFrom': Search.SEARCH_ROUTING.searchFrom.graph
      }
    });
  }
}
