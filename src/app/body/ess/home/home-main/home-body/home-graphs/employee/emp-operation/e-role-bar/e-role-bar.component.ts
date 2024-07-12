import {Component, NgZone, OnInit} from '@angular/core';
import {Search} from '../../../../../../../../../_global/search';
import {ResponsiveService} from '../../../../../../../../../utility/responsive-service';
import {DashboardOverallDataServiceService} from '../../../../../../../../../service/dashboard-overall-data-service.service';
import {Router} from '@angular/router';
import {InterCommunicationServiceService} from '../../../../../../../../../service/support-services/inter-communication-service.service';
import {AmChartService} from '../../../../../../../../../service/am-chart-service/am-chart.service';
import {Profile} from "../../../../../../../../../_global/profile";
import {GeneralOps} from "../../../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-e-role-bar',
  templateUrl: './e-role-bar.component.html',
  styleUrls: ['./e-role-bar.component.css']
})
export class ERoleBarComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  receivedData = false;
  responseList = [];

  companyList = [];
  companyName;
  mobileViewDataList = [];

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  constructor(private responsiveService: ResponsiveService,
              private httpservice: DashboardOverallDataServiceService,
              private zone: NgZone, public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private amChart : AmChartService) {

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
    this.loadDesignationInfo();

    // this.loadBarChart();
  }

  loadDesignationInfo() {
    this.httpservice.getDesignations()
      .subscribe(
        (data: any) => {
          const responseArray = [];
          const companyArray = [];


          for (let key in data) {
            responseArray.push(data[key]);
            companyArray.push(data[key].companyAndOffice);
          }

          this.companyList = companyArray;
          this.companyName = this.companyList[0];
          this.responseList = responseArray;

          const chart = this.amChart.
          createVerticalBarChartGradient('eRoleGraph', 'label', 'data', '#1D91ED', '#9915D7');

          for (let key in this.responseList[0].companyAndOfficeWiseRoleDistributionList) {
            chart.data.push({'data': this.responseList[0].companyAndOfficeWiseRoleDistributionList[key].empHeadCount,
              'label': this.responseList[0].companyAndOfficeWiseRoleDistributionList[key].designationCategory.type});
          }
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
      'searchKey': this.companyName + ' ' + graphValue,
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
  onListItemClick(searchKeyFromList) {
    const searchObject = {
      'searchKey': this.companyName + ' ' + searchKeyFromList,
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

  changeCompany() {
    this.receivedData = false;

    this.companyName  = (<HTMLInputElement>document.getElementById('companyDropdown')).value;

    const chart = this.amChart.
    createVerticalBarChartGradient('eRoleGraph', 'label', 'data', '#1D91ED', '#9915D7');

    let changedObject = this.responseList.find(o => o.companyAndOffice === this.companyName);

    for (let key in changedObject.companyAndOfficeWiseRoleDistributionList) {
      chart.data.push({'data': changedObject.companyAndOfficeWiseRoleDistributionList[key].empHeadCount,
        'label': changedObject.companyAndOfficeWiseRoleDistributionList[key].designationCategory.type});
    }
  }
}
