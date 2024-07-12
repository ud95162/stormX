import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../../../../../../utility/responsive-service';
import {Router} from '@angular/router';
import {DashboardOverallDataServiceService} from '../../../../../../../../../../service/dashboard-overall-data-service.service';
import {Search} from '../../../../../../../../../../_global/search';
import {InterCommunicationServiceService} from '../../../../../../../../../../service/support-services/inter-communication-service.service';
import {AmChartService} from "../../../../../../../../../../service/am-chart-service/am-chart.service";
import {Profile} from "../../../../../../../../../../_global/profile";
import {GeneralOps} from "../../../../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-e-op-res-bar',
  templateUrl: './e-op-res-bar.component.html',
  styleUrls: ['./e-op-res-bar.component.css']
})
export class EOpResBarComponent implements OnInit {

  checkPermission = new GeneralOps();
  componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION
  public barChartLabels: string[] = [];
  public barChartData = [];

  showGraph = false;
  receivedData = false;
  responseList = [];

  isDnutVisible: boolean = false;

  datePeriod;
  datePeriodList = [];
  mobileViewDataList = [];

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
  public barChartType: string = 'horizontalBar';
  public barChartLegend: boolean = true;
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

  constructor(private responsiveService: ResponsiveService, private zone: NgZone, private httpservice: DashboardOverallDataServiceService,
              public router: Router,
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
    this.loadResDesInfo();
  }

  loadResDesInfo() {
    this.httpservice.getResignationDesignationData()
      .subscribe(
        (data: any) => {
          if (data.length > 0) {
            this.showGraph = true;

            const chart = this.amChartService.createVerticalBarChartGradientWithOutsideLabels('eResignationBar', 'label', 'data', '#1D91ED', '#9915D7');
            const responseArray = [];
            const datePeriodArray = [];

            for (let key in data) {
              responseArray.push(data[key]);
              datePeriodArray.push(data[key].date);
            }
            this.datePeriodList = datePeriodArray;
            this.datePeriod = this.datePeriodList[0];
            this.responseList = responseArray;

            console.log(this.responseList);

            for (let key in this.responseList[0].typeList) {
              chart.data.push({'data': this.responseList[0].typeList[key].count,
                'label': this.responseList[0].typeList[key].resignationType});
            }
            this.receivedData = true;
          } else {
            this.showGraph = false;
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

  // events
  public chartClicked(e: any): void {
    let graphValue = e.active[0]._model.label;
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

  // Mobile view get clicked list item
  onListItemClick(e) {
    let keyTosearch = 'Resignation ' + this.datePeriod + ' ' + e;
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

  changeDatePeriod() {
    this.receivedData = false;

    const onUpdateCountArray = [];
    const onUpdateTypeArray = [];
    this.barChartLabels = [];
    this.barChartData = [];
    this.mobileViewDataList = [];

    this.datePeriod = (<HTMLInputElement>document.getElementById('datePeriodDropdownDesignation')).value;

    let changedObject = this.responseList.find(o => o.date === this.datePeriod);

    const chart = this.amChartService.createVerticalBarChartGradientWithOutsideLabels('eResignationBar', 'label', 'data', '#1D91ED', '#9915D7');


    for (let key in changedObject.typeList) {
      // onUpdateTypeArray.push(changedObject.typeList[key].resignationType);
      // onUpdateCountArray.push(changedObject.typeList[key].count);

      chart.data.push({'data': changedObject.typeList[key].count,
        'label': changedObject.typeList[key].resignationType});
    }

    setTimeout(() => {
      this.barChartLabels = onUpdateTypeArray;
    }, 0);

    this.barChartData.push({data: onUpdateCountArray, label: 'RESIGNATION ANALYSIS (DESIGNATIONS) - ' + this.datePeriod});
    this.mobileViewDataList = changedObject.typeList;
    this.receivedData = true;
  }
}
