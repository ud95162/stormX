import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../../../../../../utility/responsive-service';
import {Router} from '@angular/router';
import {DashboardOverallDataServiceService} from '../../../../../../../../../../service/dashboard-overall-data-service.service';
import {Search} from '../../../../../../../../../../_global/search';
import {InterCommunicationServiceService} from '../../../../../../../../../../service/support-services/inter-communication-service.service';
import {AmChartService} from "../../../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-e-op-res-dnut',
  templateUrl: './e-op-res-dnut.component.html',
  styleUrls: ['./e-op-res-dnut.component.css']
})
export class EOpResDnutComponent implements OnInit {
  // public doughnutChartLabelsResignationTypes: string[] = [];
  public doughnutChartDataResignationTypes: number[] = [];

  showGraph = false;
  receivedData = false;
  responseList = [];

  datePeriod;
  datePeriodList = [];

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  // Doughnut
  public doughnutChartLabelsResignationTypes: string[];
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

  /*---------------------------------------------------
   GRAPHS
   ---------------------------------------------------*/

  ngOnInit() {
    this.loadResignationType();
  }

  loadResignationType() {
    this.httpservice.getResignationTypeData()
      .subscribe(
        (data: any) => {
          if (data.length > 0) {
            this.showGraph = true;

            const responseArray = [];
            const resTypeArray = [];
            const countArray = [];
            const datePeriodArray = [];

            for (let key in data) {
              responseArray.push(data[key]);
              datePeriodArray.push(data[key].date);
            }

            this.datePeriodList = datePeriodArray;
            this.datePeriod = this.datePeriodList[0];
            this.responseList = responseArray;

            const chart = this.amChartService.
            createDnutWithRadialGradient('eResignationDnut', 'resType', 'count',
              ['#FAECBA', '#6278E9', '#BAC5FA', '#0099EA', '#F98C68', '#91d2ff', '#c8e7ff', '#c8e7ff'])

            for (let key in this.responseList[0].typeList) {
              resTypeArray.push(this.responseList[0].typeList[key].resignationType);
              countArray.push(this.responseList[0].typeList[key].count);
              chart.data.push({'resType': this.responseList[0].typeList[key].resignationType,
              'count': this.responseList[0].typeList[key].count});
            }

            this.doughnutChartLabelsResignationTypes = resTypeArray;
            this.doughnutChartDataResignationTypes = countArray;

            this.receivedData = true;
          } else {
            this.showGraph = false;
          }
        }
      );
  }

  changeDatePeriod() {
    this.receivedData = false;
    const onUpdateCountArray = [];
    const onUpdateTypeArray = [];
    this.doughnutChartLabelsResignationTypes = [];
    this.doughnutChartDataResignationTypes = [];

    this.datePeriod = (<HTMLInputElement>document.getElementById('datePeriodDropdown')).value;

    let changedObject = this.responseList.find(o => o.date === this.datePeriod);

    for (let key in changedObject.typeList) {
      onUpdateTypeArray.push(changedObject.typeList[key].resignationType);
      onUpdateCountArray.push(changedObject.typeList[key].count);
    }

    setTimeout(() => {
      this.doughnutChartLabelsResignationTypes = onUpdateTypeArray;
    }, 0);

    this.doughnutChartDataResignationTypes = onUpdateCountArray;

    this.receivedData = true;
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
    let graphValue = e.active[0]._chart.config.data.labels[e.active[0]._index];
    let keyTosearch = 'Resignation ' + this.datePeriod + ' ' + graphValue;
    const searchObject = {
      'searchKey': keyTosearch,
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
