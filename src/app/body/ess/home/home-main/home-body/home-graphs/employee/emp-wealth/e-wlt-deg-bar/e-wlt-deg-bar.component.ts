import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../../../../../utility/responsive-service';
import {DashboardOverallDataServiceService} from '../../../../../../../../../service/dashboard-overall-data-service.service';
import {Search} from '../../../../../../../../../_global/search';
import {Router} from '@angular/router';
import {InterCommunicationServiceService} from '../../../../../../../../../service/support-services/inter-communication-service.service';
import {AmChartService} from "../../../../../../../../../service/am-chart-service/am-chart.service";
import {Profile} from "../../../../../../../../../_global/profile";
import {GeneralOps} from "../../../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-e-wlt-deg-bar',
  templateUrl: './e-wlt-deg-bar.component.html',
  styleUrls: ['./e-wlt-deg-bar.component.css']
})
export class EWltDegBarComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  public barChartLabels: string[] = [];
  public barChartData = [];
  public barChartValue = [];

  receivedData = false;
  responseList = [];

  isDnutVisible: boolean = false;

  degreeList = ['PhD', 'Masters', 'Bachelors'];
  bachelorsList = ['Engineering', 'Science', 'Arts', 'Business', 'Other'];

  showBachelorsList = false;

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
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartColors: Array<any> = [
    { // yellow
      backgroundColor: '#0093ff',
      borderColor: '#0093ff',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

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
    this.loadDegreeClassification();
  }

  loadDegreeClassification() {
    this.httpservice.getDegreeClassificationData()
      .subscribe(
        (data: any) => {
          const responseArray = [];
          const typeArray = [];
          const countArray = [];

          const chart = this.amChartService.createLineChartWithScroll('eDegreeChart', 'label', 'value', '#0071FF', '#0071FF')

          for (let key in data) {
            typeArray.push(data[key].abbreviation);
            countArray.push(data[key].count);
            responseArray.push(data[key]);
            chart.data.push({'label' : data[key].abbreviation, 'value': data[key].count});
          }
          this.barChartLabels = typeArray;
          this.barChartData.push({data: countArray, label: 'DEGREE'});
          this.responseList = responseArray;
          this.receivedData = true;

        });
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

  changeDegreeType() {
    const degreeType = (<HTMLInputElement>document.getElementById('degreeDropdown')).value;

    if (degreeType === 'Bachelors') {
      this.showBachelorsList = true;
    } else {
      this.showBachelorsList = false;
    }

  }

  changeBachelorsDegree() {
  }

}
