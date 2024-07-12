import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../utility/responsive-service';
import {Search} from '../../../../_global/search';
import {FeedServiceService} from '../../../../service/feed-service.service';
import {Router} from '@angular/router';
import {Feed} from '../../../../_global/feed';

@Component({
  selector: 'app-profile-online-list',
  templateUrl: './profile-online-list.component.html',
  styleUrls: ['./profile-online-list.component.css']
})
export class ProfileOnlineListComponent implements OnInit {
  @Input() employeeId;
  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  onlineList = [];
  onlineCount;

  constructor(private responsiveService: ResponsiveService, private zone: NgZone, private httpservice: FeedServiceService,
              public router: Router) {

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

  ShowTablet() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.isMobile = false;
      this.isTablet = true;
      this.isDesktop = false;
    });
  }

  ngOnInit() {
    if (Feed.ONLINE_LIST_DATA === null || Feed.ONLINE_LIST_DATA === undefined) {
      this.loadOnlineList();
    } else {
      this.onlineList = Feed.ONLINE_LIST_DATA.empNames;
      this.onlineCount = Feed.ONLINE_LIST_DATA.onlineCount;
    }
  }

  loadOnlineList() {
    this.httpservice.getNameList()
      .subscribe(
        (data: any) => {
          this.onlineList = data.empNames;
          this.onlineCount = data.onlineCount;
        }
      );
  }

  profileRedirect(e) {
    if (e === this.employeeId) {
      location.reload();
      // this.router.navigate(['./profile/main']);
    } else {
      Search.SEARCH_EMPLOYEE_ID = e;
      localStorage.setItem('lsei_', e);
      // location.reload();
      this.router.navigate(['./profile/_search']);
    }
  }
}
