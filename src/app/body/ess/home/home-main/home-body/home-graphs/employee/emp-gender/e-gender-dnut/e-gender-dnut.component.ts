import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../../../../../utility/responsive-service';
import {DashboardOverallDataServiceService} from '../../../../../../../../../service/dashboard-overall-data-service.service';
import {Router} from '@angular/router';
import {Search} from '../../../../../../../../../_global/search';
import {InterCommunicationServiceService} from '../../../../../../../../../service/support-services/inter-communication-service.service';
import {AmChartService} from "../../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-e-gender-dnut',
  templateUrl: './e-gender-dnut.component.html',
  styleUrls: ['./e-gender-dnut.component.css']
})
export class EGenderDnutComponent implements OnInit {
  receivedData = false;
  responseList = [];

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

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

  /*---------------------------------------------------
   GRAPHS
   ---------------------------------------------------*/

  ShowTablet() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.isMobile = false;
      this.isTablet = true;
      this.isDesktop = false;
    });
  }

  ngOnInit() {
    this.loadGenderInfo();
  }

  loadGenderInfo() {
    this.httpservice.getGenderData()
      .subscribe(
        (data: any) => {
          const chart = this.amChartService.createDnutWithRadialGradient('eGenderDnutChart', 'gender', 'value', ['#00A5FB', '#FF8F6B'])
          for (let key in data) {
            chart.data.push({'gender' : data[key].gender, 'value': data[key].count});
          }
        }
      );
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
