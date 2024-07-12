import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../utility/responsive-service';
import {Profile} from '../../../_global/profile';
import {ProfileUserServiceService} from '../../../service/profile-user-service.service';
import {Search} from '../../../_global/search';
import {Router} from '@angular/router';
import {InterCommunicationServiceService} from '../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-profile-knowledge-extraction',
  templateUrl: './profile-knowledge-extraction.component.html',
  styleUrls: ['./profile-knowledge-extraction.component.css']
})
export class ProfileKnowledgeExtractionComponent implements OnInit {
  @Input() employeeId: any;
  @Input() employeeFirstName: any;


  componentPermission = [];

  showLoadingSpinner = true;
  showEmployeeRecords = false;

  personalInformation: any;
  qualificationInformation: any;
  skillInformation: any;
  profileInformation: any;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;



  // tslint:disable-next-line:max-line-length
  constructor(private responsiveService: ResponsiveService, private zone: NgZone, public router: Router, private interCommunicationServiceService: InterCommunicationServiceService) {
    if (this.router.url.includes('_search')) {
      // this.componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION.OtherProfile;
      for (const val of Profile.EMPLOYEE_APPLICATION_PERMISSION) {
        if (val.includes('Other')) {
          this.componentPermission.push(val.slice(5));
        }
      }
    } else {
        this.componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
    }
    // GET INITIAL VALUE BASED ON DEVICE WIDTHS AT TIME THE APP RENDERS
    this.isMobile = this.responsiveService.isPhone();
    this.isTablet = this.responsiveService.isTablet();
    this.isDesktop = this.responsiveService.isDesktop();

    const that = this;

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
