import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../utility/responsive-service';
import {Router} from '@angular/router';
import {SearchServiceService} from '../../../../../service/search-service.service';
import {Search} from '../../../../../_global/search';
import {Profile} from '../../../../../_global/profile';

@Component({
  selector: 'app-search-interested-card',
  templateUrl: './search-interested-card.component.html',
  styleUrls: ['./search-interested-card.component.css']
})
export class SearchInterestedCardComponent implements OnInit {
  interestedResultSet = [];

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  constructor(private responsiveService: ResponsiveService,
              private zone: NgZone, public router: Router, private httpservice: SearchServiceService) {
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
    this.loadSearchInterested();
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


  loadSearchInterested() {
    this.httpservice.getSearchInterestedResults(Search.SEARCH_KEY)
      .subscribe(
        (data: any) => {
          this.interestedResultSet = data;
        }
      );
  }

  profileRedirect(employeeId) {
    if (employeeId === Profile.EMPLOYEE_ID) {
      this.router.navigate(['./profile/main']);
    } else {
      Search.SEARCH_EMPLOYEE_ID = employeeId;
      localStorage.setItem('lsei_', employeeId);
      this.router.navigate(['./profile/_search']);
    }
  }
}
