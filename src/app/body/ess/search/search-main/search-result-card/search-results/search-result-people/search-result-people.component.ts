import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../../../utility/responsive-service';
import {Search} from '../../../../../../../_global/search';
import {Router} from '@angular/router';
import {SearchServiceService} from '../../../../../../../service/search-service.service';
import {Profile} from '../../../../../../../_global/profile';
import {ProfileUserServiceService} from '../../../../../../../service/profile-user-service.service';

import * as $ from 'jquery';
import {Project} from '../../../../../../../_global/project';
import {InterCommunicationServiceService} from '../../../../../../../service/support-services/inter-communication-service.service';
import {GeneralOps} from "../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-search-result-people',
  templateUrl: './search-result-people.component.html',
  styleUrls: ['./search-result-people.component.css']
})
export class SearchResultPeopleComponent implements OnInit {
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  keyToSearchFromHeader: string;

  categorizedSearchResultResponse = [];
  responseType = false;
  loadingOverlayView = false;
  dataLoading = true;
  dataLoaded = false;
  searchCount: string;
  reviewType = 'Review Selected';
  selectedList = [];
  searchIDList = [];
  searchKeyArrayForBreadcrumbs = [];

  // Project
  projectDetails;
  projectLoaded = false;

  regularSelectBtn = true;
  selectAllBtn = false;

  groupStarRating = 5;

  showNoResultLable = false;

  // Reporting
  resultEmployeeListForReporting = [];
  filteredResultArrayForReporting = [];
  filterKeyArray = [];
  resultKeysToFilter = [];
  showFiltersList = false;
  reportName;
  showGenerateButton = true;
  showExportButton = false;
  showGenerateLoading = false;

  postReviewButtonTitle;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  constructor(private responsiveService: ResponsiveService, private zone: NgZone, private httpservice: SearchServiceService, public router: Router, private httpserviceprof: ProfileUserServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
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
    this.interCommunicationServiceService.currentSearchObject.subscribe(searchObject => {
      this.keyToSearchFromHeader = searchObject.searchKey;
      Search.SEARCH_KEY = this.keyToSearchFromHeader;
      this.loadSearchResponse(Search.SEARCH_KEY);
    });

    $('.alert').hide();
    this.reportNameSet();
  }

  setRecordToBlank() {
    this.categorizedSearchResultResponse = [];
    this.projectLoaded = false;
    this.showNoResultLable = false;
    this.dataLoading = true;
  }

  loadSearchResponse(searchkey) {
    this.setRecordToBlank();
    Search.PREVIOUS_SEARCH_LIST.unshift(Search.SEARCH_KEY);
    this.httpservice.getSearchResultNLP(searchkey)
      .subscribe(
        (data: any) => {
          if (data.count === 0) {
            this.showNoResultLable = true;
            this.dataLoading = false;
            this.dataLoaded = false;
          } else {
            if (data.option_type === 'People') {
              this.responseType = true;
            }
            Search.SEARCH_RESULT_SET = data.searchResult;
            this.categorizedSearchResultResponse = Search.SEARCH_RESULT_SET;
            Search.SEARCH_COUNT = data.count;
            this.searchCount = Search.SEARCH_COUNT;

            // Bread crumbs
            this.searchKeyArrayForBreadcrumbs = data.searchKeys;

            // Reporting
            this.resultKeysToFilter = data.keys;
            this.resultEmployeeListForReporting = data.employeeListWithSortingList;
            this.filteredResultArrayForReporting = [];
            this.showFiltersList = true;

            // Project details
            this.projectDetails = data.groupInfo;
            if (this.projectDetails.name != null) {
              this.projectLoaded = true;
            }

            // Select all list for review
            this.searchIDList = data.employeeListWithSortingList;

            this.dataLoading = false;
            this.dataLoaded = true;
          }
        }
      );
  }

  searchBreadCrumb(searchKeytoSearch) {
    const indexOfCrumb = this.searchKeyArrayForBreadcrumbs.indexOf(searchKeytoSearch);
    const newSearchArray = this.searchKeyArrayForBreadcrumbs.slice(0, indexOfCrumb + 1);
    Search.SEARCH_KEY = newSearchArray.toString();
    localStorage.setItem('lsk_', newSearchArray.toString());
    this.loadSearchResponse(Search.SEARCH_KEY);
    this.setRecordToBlank();
  }

  addToTheBreadCrumb(keyToAdd) {
    this.searchKeyArrayForBreadcrumbs.push(keyToAdd);
    Search.SEARCH_KEY = this.searchKeyArrayForBreadcrumbs.toString();
    localStorage.setItem('lsk_', this.searchKeyArrayForBreadcrumbs.toString());
    this.loadSearchResponse(Search.SEARCH_KEY);
    this.setRecordToBlank();
  }

  imgRedirect(e) {
    if (e === Profile.EMPLOYEE_ID) {
      this.router.navigate(['./profile/main']);
    } else {
      Search.SEARCH_EMPLOYEE_ID = e;
      localStorage.setItem('lsei_', e);
      this.router.navigate(['./profile/_search']);
    }
  }

  projectRedirect(e) {
    Project.PROJECT_NAME = e;
    localStorage.setItem('projectName', e);
    // this.router.navigate(['./project/main']);
  }

  selectItem(e) {
    this.selectedList.push(e);
    this.reviewType = 'Review Selected';
  }

  deselectItem(e) {
    let index = this.selectedList.indexOf(e);
    if (index > -1) {
      this.selectedList.splice(index, 1);
    }
    this.reviewType = 'Review Selected';
  }

  selectAll() {
    this.selectedList = this.searchIDList;
    this.regularSelectBtn = false;
    this.selectAllBtn = true;
    this.reviewType = 'Review All';
  }

  deselectAll() {
    this.selectedList = [];
    this.regularSelectBtn = true;
    this.selectAllBtn = false;
    this.reviewType = 'Review Selected';
  }

  setGroupStar(e) {
    this.groupStarRating = e;
  }

  setReviewButtonActive() {
    if (this.selectedList.length === 0) {
      (<HTMLInputElement>document.getElementById('postReview')).disabled = true;
      this.postReviewButtonTitle = 'Please select at least one user to Review!';
    } else {
      (<HTMLInputElement>document.getElementById('postReview')).disabled = false;
      this.postReviewButtonTitle = 'Post Review!';
    }
  }

  postReviewMulti() {
    const reviewer = Profile.USER_TOKEN;
    const title = (<HTMLInputElement>document.getElementById('multireviewtitle')).value;
    const comment = (<HTMLInputElement>document.getElementById('multireviewcomment')).value;
    const revieweeList = this.selectedList;
    const groupStar = this.groupStarRating;
    const searchListRevPostFeed = (<HTMLInputElement>document.getElementById('searchListReviewPostFeed')).checked;

    if (revieweeList.length === 0) {
      $('.alert-warning').removeClass('in').show();
      $('.alert-warning').delay(400).addClass('in').fadeOut(4000);
    } else {
      const json = {
        'comment': comment,
        'isPublic': 1,
        'reviewees': revieweeList,
        'reviewer': reviewer,
        'saveToFeed': searchListRevPostFeed,
        'starRating': groupStar,
        'title': title
      };

      this.loadingOverlayView = true;
      this.httpserviceprof.postReviews(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.loadingOverlayView = false;
              $('.alert-success').removeClass('in').show();
              $('.alert-success').delay(400).addClass('in').fadeOut(4000);
              (<HTMLInputElement>document.getElementById('multireviewtitle')).value = '';
              (<HTMLInputElement>document.getElementById('multireviewcomment')).value = '';
            } else if (data.httpStatusCode === 500) {
              this.loadingOverlayView = false;
              $('.alert-danger').removeClass('in').show();
              $('.alert-danger').delay(400).addClass('in').fadeOut(4000);
            }
          }
        );
    }
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

  addToFilterArray(filter) {
    if (this.filterKeyArray.includes(filter) === true) {
      let index = this.filterKeyArray.indexOf(filter);
      if (index > -1) {
        this.filterKeyArray.splice(index, 1);
      }
    } else {
      this.filterKeyArray.push(filter);
    }
    this.showExportButton = false;
    this.showGenerateButton = true;
  }

  getReportData() {
    this.showGenerateButton = false;
    this.showGenerateLoading = true;

    const json = {
      'emp_no': Profile.EMPLOYEE_ID,
      'empList': this.resultEmployeeListForReporting,
      'keys': this.filterKeyArray
    };

    this.httpservice.postToGenerateReport(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.filteredResultArrayForReporting = data.data.searchResult;
            this.showGenerateLoading = false;
            this.showExportButton = true;
          } else if (data.httpStatusCode === 500) {
          }
        }
      );
  }

  generateReport(args) {
    let data, filename, link;
    let csv = this.convertArrayOfObjectsToCSV({
      data: this.filteredResultArrayForReporting
    });

    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();

    this.showGenerateButton = false;
  }

  convertArrayOfObjectsToCSV(args) {
    let result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function (item) {
      ctr = 0;
      keys.forEach(function (key) {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  reportNameSet() {
    let datestring = new Date().toDateString().replace(/ +/g, '');
    this.reportName = Search.SEARCH_KEY + '_' + datestring + '_generatedbyKRIYO.csv';
  }
}
