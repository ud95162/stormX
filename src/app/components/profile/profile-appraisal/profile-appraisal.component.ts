import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppraisalServiceService} from '../../../service/employee-self-service-services/appraisal-service.service';
import {ResponsiveService} from '../../../utility/responsive-service';
import {Profile} from '../../../_global/profile';

@Component({
  selector: 'app-profile-appraisal',
  templateUrl: './profile-appraisal.component.html',
  styleUrls: ['./profile-appraisal.component.css']
})
export class ProfileAppraisalComponent implements OnInit {
  @Input() employeeId;
  @Input() customAppraisalPermission;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  tabName = 'selfAppraisal';
  years: any[] = ['2020'];
  previousPermission: any;
  // latestPermission: any;
  // latestPermission: any[];
  latestPermission: {[key: string]: any[]};
  selectedYear: string;
  sideBarCustomPermission: any[] = [];
  previousYear = false;
  latestYear = false;
  currentLocation: any;
  latestPermissionMap = new Map();
  perm_code: any;
  hideYearPanel = true;
  selectedYearForBaseCriteria;
  baseCriteriaTabPermission = false;

  constructor(private responsiveService: ResponsiveService, private zone: NgZone,
              private  appraisalService: AppraisalServiceService,
              public router: Router,
              private acitveRoute: ActivatedRoute,
  ) {

    // if (this.router.url.includes('_search')) {
    //   this.perm_code = 'OtherProfile';
    // } else {
    //   this.perm_code = 'Profile';
    // }

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
    this.currentLocation = window.location.hash;
    this.checkPermissionForBaseCriteria()
    this.getSelectedYearSideNavBarPermission();
  }

  checkPermissionForBaseCriteria(){
    this.appraisalService.checkPermissionForBaseCriteriaSection(this.employeeId)
      .subscribe( (data: any) => {
        this.baseCriteriaTabPermission = data;
      });
  }

  getSelectedYearSideNavBarPermission() {

    this.appraisalService.getAppraisalYearWiseCustomSideBarPermissions(this.employeeId).subscribe((data: any) => {

      this.sideBarCustomPermission = data;
      this.years = [];

      // console.log(data);
      // console.log('sideBarCustomPermission ' + this.sideBarCustomPermission);

      if (this.sideBarCustomPermission == null) {
        console.log('Sidebar permission is null and assigning a default value');
        this.sideBarCustomPermission =  [{
          'year': '2020',
          'employeeAppraisalPermissionsForComponents': {
            'showOverallAppraisal': true,
            'showGivenAppraisal': true,
            'showSelfAppraisal': true,
            'showAppraisees': false,
            'showAppraisalMeetingComments': true
          }
        }];

      }

      // console.log('sideBarCustomPermission length ' + this.sideBarCustomPermission.length);
      if (this.sideBarCustomPermission.length > 0) {

        this.previousPermission = [];
        // this.latestPermission = [];

        for (let i = 0; i < this.sideBarCustomPermission.length; i++) {

          if (this.sideBarCustomPermission[i].employeeAppraisalPermissionsForComponents.showOverallAppraisal === true) {

            this.years.push(this.sideBarCustomPermission[i].year);

          }

          if (this.sideBarCustomPermission[i].year === '2019') {
            this.previousPermission = this.sideBarCustomPermission[i].employeeAppraisalPermissionsForComponents;

          } else {

            // tslint:disable-next-line:max-line-length
            this.latestPermissionMap.set(this.sideBarCustomPermission[i].year, this.sideBarCustomPermission[i].employeeAppraisalPermissionsForComponents);
               // console.log('latest permission: ', this.latestPermissionMap);

          }
        }

        // console.log(this.latestPermissionMap)

        this.selectedYear = this.years[this.years.length - 1];
        this.selectedYearForBaseCriteria = this.years[this.years.length - 1];
        if (this.selectedYear && this.selectedYear === '2019') {
          this.previousYear = true;
          this.latestYear = false;
        } else if (this.selectedYear && this.selectedYear !== '2019') {
          console.log('selected year is ', this.selectedYear);
          this.latestYear = true;
          this.previousYear = false;
        }
        // console.log('latest year ' + this.latestYear);
        // console.log('previous year ' + this.previousYear)
        // console.log(this.previousPermission)
      } else {

        console.log('There is no data available');
      }

      // console.log('years length ' + this.years.length + ' ' + this.years);
      // console.log('years length zero ' + (this.years.length < 0));

    }, error => {
      console.log(error);
    });

  }

  changeYear() {

    // if (this.selectedYear && this.selectedYear === '2019') {
    //   this.previousYear = true;
    //   this.latestYear = false;
    //
    // } else if (this.selectedYear && this.selectedYear === '2020') {
    //   this.latestYear = true;
    //   this.previousYear = false;
    //
    // } else if (this.selectedYear && this.selectedYear === '2021') {
    //   this.latestYear = true;
    //   this.previousYear = false;

    if (this.selectedYear === '2019') {
      this.previousYear = true;
      this.latestYear = false;

    } else {
      this.latestYear = true;
      this.previousYear = false;

    }
  }

  changeTabs(tab) {
    this.hideYearPanel = !(tab === 'baseCriteria' || tab === 'accomplishments');
    this.tabName = tab;
  }


  profileRedirect() {
    this.router.navigate(['./profile/main']);
  }
  gotvideo() {
    this.router.navigate(['./video']);
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

}
