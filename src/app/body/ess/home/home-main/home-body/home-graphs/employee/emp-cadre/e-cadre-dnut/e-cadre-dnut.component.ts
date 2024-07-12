import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../../../../../utility/responsive-service';
import {DashboardOverallDataServiceService} from '../../../../../../../../../service/dashboard-overall-data-service.service';
import {Router} from '@angular/router';
import {Search} from '../../../../../../../../../_global/search';
import {InterCommunicationServiceService} from '../../../../../../../../../service/support-services/inter-communication-service.service';
import {AmChartService} from "../../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-e-cadre-dnut',
  templateUrl: './e-cadre-dnut.component.html',
  styleUrls: ['./e-cadre-dnut.component.css']
})
export class ECadreDnutComponent implements OnInit {
  // public doughnutChartLabelsCadre: string[] = [];
  public doughnutChartDataCadre: number[] = [];

  receivedData = false;
  responseList = [];

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  // Doughnut
  public doughnutChartLabelsCadre: string[];
  public cadreDoughnutChartColors: any[] = [
    {
      backgroundColor: ['#1064a3', '#107dce', '#199dff', '#42aeff', '#5fbbff', '#91d2ff', '#c8e7ff', '#c8e7ff'],
      borderColor: ['#1064a3', '#107dce', '#199dff', '#42aeff', '#5fbbff', '#91d2ff', '#c8e7ff', '#c8e7ff'],
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public doughnutChartType: string = 'doughnut';

  public options = {
    cutoutPercentage: 60
  };

  constructor(private responsiveService: ResponsiveService, private zone: NgZone,
              private httpservice: DashboardOverallDataServiceService, public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private amChartService: AmChartService) {
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
    this.loadEmpCadreInfo();
  }

  loadEmpCadreInfo() {
    this.httpservice.getEmpCadre()
      .subscribe(
        (data: any) => {
          const responseArray = [];
          const typeArray = [];
          const countArray = [];

          const chart = this.amChartService.createDnutWithRadialGradient('eCadreDnut', 'type', 'count',
            ['#FAECBA', '#0099EA', '#6278E9', '#F98C68', '#BAC5FA']);
          for (let key in data) {
            typeArray.push(data[key].type);
            countArray.push(data[key].count);
            responseArray.push(data[key]);
            chart.data.push({'type': data[key].type, 'count': data[key].count});
          }
          this.doughnutChartLabelsCadre = typeArray;
          this.doughnutChartDataCadre = countArray;
          this.responseList = responseArray;
          this.receivedData = true;
        }
      );
  }

  /*---------------------------------------------------
   GRAPHS
   ---------------------------------------------------*/

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
    let graphValue = e.active[0]._chart.config.data.labels[e.active[0]._index];

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
}
