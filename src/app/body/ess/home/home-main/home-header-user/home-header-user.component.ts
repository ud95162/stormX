import {Component, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../../../utility/responsive-service';
import {Profile} from '../../../../../_global/profile';
import {Router} from '@angular/router';
import {ProfileUserServiceService} from '../../../../../service/profile-user-service.service';

@Component({
  selector: 'app-home-header-user',
  templateUrl: './home-header-user.component.html',
  styleUrls: ['./home-header-user.component.css']
})
export class HomeHeaderUserComponent implements OnInit {
  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  homeDataLoaded = false;
  homeHeaderData;
  headerStarArray = [];
  showHalfStar = false;

  taskList = [
    {
      'task': 'No pending Tasks',
      'time': '-'
    }
  ];

  trimmedTasklist = [];

  trendList = [
    {
      'trend': 'No trends',
      'from': '',
      'url': 'https://kriyo.net/'
    }
  ];

  trimmedTrendlist = [];

  modalHeader;
  modalDataType;

  constructor(private responsiveService: ResponsiveService,
              private zone: NgZone, private httpservice: ProfileUserServiceService, public router: Router) {
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
    this.loadEmpHeaderData();

    if (this.taskList.length > 3) {
      this.trimmedTasklist = this.taskList.slice(0, 3);
    } else {
      this.trimmedTasklist = this.taskList;
    }

    if (this.trendList.length > 3) {
      this.trimmedTrendlist = this.trendList.slice(0, 3);
    } else {
      this.trimmedTrendlist = this.trendList;
    }
  }

  loadEmpHeaderData() {
    this.httpservice.getEmployeeHeaderInfo(localStorage.getItem('leid_'))
      .subscribe(
        (data: any) => {
          this.homeHeaderData = data;
          Profile.USER_NAME = data.firstName;

          const halfStars = data.averageStarRating % 1;
          if (halfStars > 0) {
            this.showHalfStar = true;
          }
          const wholeStars = data.averageStarRating - halfStars;

          for (let starName = 1; starName <= wholeStars; starName++) {
            this.headerStarArray.push(starName);
          }

          Profile.WORKING_PROJECT = data.project;

          this.homeDataLoaded = true;
        }
      );
  }

  imgRedirect() {
    this.router.navigate(['./profile/main']);
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

  setPopupModalData(type) {
    if (type === 1) {
      this.modalDataType = 'Task';
      this.modalHeader = 'Task list';
    } else if (type === 2) {
      this.modalDataType = 'Trend';
      this.modalHeader = 'Trend list';
    }
  }
}
