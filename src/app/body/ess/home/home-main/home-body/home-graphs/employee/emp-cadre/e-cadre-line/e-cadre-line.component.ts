import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../../../../../utility/responsive-service';
import {DashboardOverallDataServiceService} from '../../../../../../../../../service/dashboard-overall-data-service.service';
import {InterCommunicationServiceService} from '../../../../../../../../../service/support-services/inter-communication-service.service';
import {Search} from '../../../../../../../../../_global/search';
import {Router} from '@angular/router';
import {AmChartService} from "../../../../../../../../../service/am-chart-service/am-chart.service";
import {Profile} from "../../../../../../../../../_global/profile";
import {GeneralOps} from "../../../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-e-cadre-line',
  templateUrl: './e-cadre-line.component.html',
  styleUrls: ['./e-cadre-line.component.css']
})
export class ECadreLineComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  isECadreDnutVisible = false;
  // eCaderGraphToggle = true;
  eCaderGraphToggle = false;

  chartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  public lineChartLabels: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  public permanentChartData = [];
  public recruitmentChartData = [];
  permanentGraphDataLoaded = false;
  recruitmentGraphDataLoaded = false;
  yearRange = '1999';
  yearArray;
  permanentArray;
  contractArray;
  traineeArray;
  permanentUKArray;
  outsourcedArray;
  mobilePermanentArray;
  mobileViewPermanentArray;
  recruitmentArray;
  resignationArray;
  mobileRecruitmentArray;
  mobileViewRecruitmentArray;

  recruitmentResignationResponseList = [];

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  /*---------------------------------------------------
   GRAPHS
   ---------------------------------------------------*/
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

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
    this.loadCadreData();
  }

  loadCadreData() {

    this.httpservice.getEmpCadreLoad()
      .subscribe(
        (data: any) => {
          const yearCount = [];
          const permanentCount = [];
          const contractCount = [];
          const traineeCount = [];
          const permanentUKCount = [];
          const outsourcedCount = [];
          const mobileCount = [];

          for (let key in data) {
            yearCount.push(data[key].year);
            permanentCount.push(data[key].cadreNameAndCountsForMonths.Permanent);
            contractCount.push(data[key].cadreNameAndCountsForMonths.Contract);
            traineeCount.push(data[key].cadreNameAndCountsForMonths.Trainee);
            permanentUKCount.push(data[key].cadreNameAndCountsForMonths.PermanentUK);
            outsourcedCount.push(data[key].cadreNameAndCountsForMonths.Outsource);
            mobileCount.push(data[key].recruitmentDataSets);
          }

          this.yearArray = yearCount;

          this.yearRange = yearCount[0];

          this.permanentArray = permanentCount;
          this.contractArray = contractCount;
          this.traineeArray = traineeCount;
          this.permanentUKArray = permanentUKCount;
          this.outsourcedArray = outsourcedCount;
          this.mobilePermanentArray = mobileCount;

          this.mobileViewPermanentArray = this.mobilePermanentArray[0];

          this.permanentChartData = [
            {data: this.permanentArray[0], label: 'PERMANENT'},
            {data: this.contractArray[0], label: 'CONTRACT'},
            {data: this.traineeArray[0], label: 'TRAINEE'},
            {data: this.permanentUKArray[0], label: 'PERMANENT UK'},
            {data: this.outsourcedArray[0], label: 'OUTSOURCED'}
          ];

          this.permanentGraphDataLoaded = true;
        }
      );

    this.httpservice.getEmpCadreRecruitment()
      .subscribe(
        (data: any) => {
          const recruitmentCountAr = [];
          const resignationCountAr = [];
          const mobileCountAr = [];

          const responsesArray = [];

          for (let key in data) {
            responsesArray.push(data[key]);
          }

          this.recruitmentResignationResponseList = responsesArray;

          const chart = this.amChartService.
          createMultipleLineChartWithFill('eCadreEmploymentChart', 'month', ['RECRUITMENT', 'RESIGNATION'], ['#7433FF', '#05B5B5']);

          for (let key in this.recruitmentResignationResponseList[0].recruitmentDataSets) {
            chart.data.push({'month':  this.recruitmentResignationResponseList[0].recruitmentDataSets[key].month,
              'RECRUITMENT': this.recruitmentResignationResponseList[0].recruitmentDataSets[key].recruitmentCount,
              'RESIGNATION':  this.recruitmentResignationResponseList[0].recruitmentDataSets[key].resignationCount});
          }
          this.resignationArray = resignationCountAr;
          this.recruitmentArray = recruitmentCountAr;
          this.mobileRecruitmentArray = mobileCountAr;
          this.mobileViewRecruitmentArray = this.mobileRecruitmentArray[0];

          this.recruitmentChartData = [
            {data: this.recruitmentArray[0], label: 'RECRUITMENT'},
            {data: this.resignationArray[0], label: 'RESIGNATION'}
          ];

          this.recruitmentGraphDataLoaded = true;
        }
      );
  }

  changeYear() {
    this.yearRange = (<HTMLInputElement>document.getElementById('yearDropdown')).value;

    let changedObject = this.recruitmentResignationResponseList.find(o => o.year === this.yearRange);
    const chart = this.amChartService.createMultipleLineChartWithFill('eCadreEmploymentChart', 'month', ['RECRUITMENT', 'RESIGNATION'], ['#7433FF', '#05B5B5']);

    for(let key in changedObject.recruitmentDataSets) {
      chart.data.push({'month':  changedObject.recruitmentDataSets[key].month,
        'RECRUITMENT': changedObject.recruitmentDataSets[key].recruitmentCount,
        'RESIGNATION':  changedObject.recruitmentDataSets[key].resignationCount});
    }

    const arrayIndex = parseInt(this.yearArray[0]) - parseInt(this.yearRange);

    this.permanentChartData = [
      {data: this.permanentArray[arrayIndex], label: 'PERMANENT'},
      {data: this.contractArray[arrayIndex], label: 'CONTRACT'},
      {data: this.traineeArray[arrayIndex], label: 'TRAINEE'},
      {data: this.permanentUKArray[arrayIndex], label: 'PERMANENT UK'},
      {data: this.outsourcedArray[arrayIndex], label: 'OUTSOURCED'}
    ];

    this.recruitmentChartData = [
      {data: this.recruitmentArray[arrayIndex], label: 'RECRUITMENT'},
      {data: this.resignationArray[arrayIndex], label: 'RESIGNATION'}
    ];
    this.mobileViewPermanentArray = this.mobilePermanentArray[arrayIndex];
    this.mobileViewRecruitmentArray = this.mobileRecruitmentArray[arrayIndex];
    this.permanentGraphDataLoaded = true;
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
  public chartClicked(e: any, graphtype): void {
    let graphValue = e.active[0]._chart.config.data.labels[e.active[0]._index];
    let searchKey;

    switch (graphtype) {
      case 'cadre':
        searchKey = 'Cadre ' + this.yearRange + ' ' + graphValue;
        break;
      case 'resignation':
        searchKey = 'Rec vs Res ' + this.yearRange + ' - ' + graphValue;
        break;
    }

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
  onListItemClick(obj, listtype) {
    let searchKey;

    switch (listtype) {
      case 'cadre':
        searchKey = 'Cadre ' + this.yearRange + ' ' + obj.month;
        break;
      case 'resignation':
        searchKey = 'Rec vs Res ' + this.yearRange + ' - ' + obj.month;
        break;
    }

    const searchObject = {
      'searchKey': searchKey,
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

  chnageECaderChart(name: string) {
    if (name === 'caders') {
      this.eCaderGraphToggle = true;
    } else {
      this.eCaderGraphToggle = false;
    }
  }
}
