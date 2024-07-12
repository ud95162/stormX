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
  selector: 'app-e-gender-bar',
  templateUrl: './e-gender-bar.component.html',
  styleUrls: ['./e-gender-bar.component.css']
})
export class EGenderBarComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  isGenderDnutVisible: boolean = false;

  receivedData = false;
  responseList = [];

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

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
    this.loadGenderAgeInfo();
  }

  loadGenderAgeInfo() {
    this.httpservice.getGenderAgeData()
      .subscribe(
        (data: any) => {
          const responseArray = [];
          const chart = this.amChartService.createMultipleBarChartGradient('eGenderBar', 'label', ['Male', 'Female'], [['#1D91ED', '#9915D7'], ['#FF7E54', '#F94D16']]);

          for (let key in data) {
            responseArray.push(data[key]);
            chart.data.push({'label': data[key].age, 'Male': data[key].male, 'Female': data[key].female});
          }
          this.responseList = responseArray;
          this.receivedData = true;
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
