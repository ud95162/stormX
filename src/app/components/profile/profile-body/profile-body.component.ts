import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../utility/responsive-service';
import {ProfileUserServiceService} from '../../../service/profile-user-service.service';
import {Profile} from '../../../_global/profile';
import {Router} from '@angular/router';
import {AppraisalServiceService} from '../../../service/employee-self-service-services/appraisal-service.service';
import {Appraisals} from '../../../_global/appraisals';
import {ModalUiServiceService} from '../../../service/ui-services/modal-ui-service.service';
import {GeneralOps} from "../../../utility/GeneralOps";

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.css']
})
export class ProfileBodyComponent implements OnInit {
  @Input() employeeId;
  employeeFirstName;
  employeeFullName;
  employeeImage;
  skypid;
  componentPermission = [];
  subComponentPermission;
  loadView = false;

  perm_code: string;


  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  activeTabName = '';


  customAppraisalPermission = Appraisals.CUSTOM_APPRAISAL_PERMISSION;

  constructor(private responsiveService: ResponsiveService,
              private httpservice: ProfileUserServiceService,
              private appraisalServiceService: AppraisalServiceService,
              private zone: NgZone, public router: Router,
              private modalUiService: ModalUiServiceService
  ) {
    if (this.router.url.includes('_search')) {
      for (const val of Profile.EMPLOYEE_APPLICATION_PERMISSION) {
        if (val.includes('Other')) {
          this.componentPermission.push(val.slice(5));
        }
      }
      this.perm_code = 'OtherProfile';
    } else {
      this.componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
      this.perm_code = 'Profile';
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
    // this.activeTabName = localStorage.getItem('profActTab');
    if (localStorage.getItem('profActTab') !== null) {
      this.changeActiveTab(localStorage.getItem('profActTab'));
    } else {
      this.changeActiveTab('attendance');
    }
    this.loadEmpHeaderData(this.perm_code);
  }

  loadEmpHeaderData(perm_code) {
    this.httpservice.getEmployeeHeaderInfo(this.employeeId)
      .subscribe(
        (data: any) => {
          this.employeeFirstName = data.firstName;
          this.employeeFullName = data.name;
          this.employeeImage = data.profileImage;
          this.skypid = data.employeeHeaderContactData.skypeId;
          this.loadView = this.loadCustomAppraisalPermission(this.employeeId, perm_code);
        }
      );
  }

  loadCustomAppraisalPermission(employeeNo, perm_code) {
    this.appraisalServiceService.getLatestAppraisalCustomPermissions(employeeNo, perm_code)
      .subscribe((data: any) => {
          this.customAppraisalPermission = data;
          if (this.customAppraisalPermission.showOverallAppraisal === false) {
            // localStorage.setItem('profActTab', 'overview');
            if (localStorage.getItem('profActTab') !== null) {
              this.changeActiveTab(localStorage.getItem('profActTab'));
            } else {
              this.changeActiveTab('overview');
            }
          }
        }, error => {
          this.customAppraisalPermission.showOverallAppraisal = false;
        }
      );
    return true;
  }

  changeActiveTab(tabName) {
    this.activeTabName = tabName;
    localStorage.setItem('profActTab', tabName);
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

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }

  /**
   * redirect to given tab name via json event['tabName'] in profile
   * @param event : json { 'tabName': name of the tab }
   */
  redirectFromChild(event: any) {
    this.changeActiveTab(event['tabName']);
  }

}
