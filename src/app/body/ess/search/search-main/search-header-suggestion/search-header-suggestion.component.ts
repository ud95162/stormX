import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../utility/responsive-service';
import {Search} from '../../../../../_global/search';
import {NavigationEnd, Router} from '@angular/router';
import {SearchServiceService} from '../../../../../service/search-service.service';
import {InterCommunicationServiceService} from '../../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-search-header-suggestion',
  templateUrl: './search-header-suggestion.component.html',
  styleUrls: ['./search-header-suggestion.component.css']
})
export class SearchHeaderSuggestionComponent implements OnInit {
  currentURL;

  searchSuggestionList = [];

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  constructor(private searchServiceService: SearchServiceService, private responsiveService: ResponsiveService,
              private zone: NgZone, public router: Router, private interCommunicationServiceService: InterCommunicationServiceService) {
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

    // URL Check
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentURL = event.url;
      }
    });

    // this.searchSuggestionList = Search.PREVIOUS_SEARCH_LIST.slice(0, 3);
    this.loadSearchSuggestions();
  }

  ngOnInit() {
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

  loadSearchSuggestions() {
    this.searchServiceService.getSearchSuggestions(Search.SEARCH_KEY)
      .subscribe(
        (data: any) => {
          this.searchSuggestionList = data;
        }
      );
  }

  searchSuggestion(searchKey) {
    const searchObject = {
      'searchKey': searchKey,
      'searchOffset': 0,
      'searchFilter': 'All',
      'searchFilterValue': 'any'
    };

    this.interCommunicationServiceService.changeSearchKey(searchObject);
    Search.SEARCH_KEY = searchObject.searchKey;
    localStorage.setItem('lsk_', searchObject.searchKey);


    if (this.currentURL === '/search/_landing') {
      this.router.navigate(['./advance-search/main'], {
        queryParams: {
          'searchQuery': searchObject.searchKey,
          'searchFrom': Search.SEARCH_ROUTING.searchFrom.searchSuggestion
        }
      });
    } else {
      window.location.reload();
    }
  }
}
