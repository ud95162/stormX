import {Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Profile} from '../../../../_global/profile';
import {ProfileUserServiceService} from '../../../../service/profile-user-service.service';
import {ResponsiveService} from '../../../../utility/responsive-service';
import {Router} from '@angular/router';
import {Search} from '../../../../_global/search';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {environment} from '../../../../../environments/environment';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
import {GeneralOps} from "../../../../utility/GeneralOps";
import {HttpErrorResponse} from "@angular/common/http";
import {AdminServiceService} from "../../../../service/admin-service.service";

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.css']
})
export class HeaderCardComponent implements OnInit {
  @Input() employeeId;

  @Output() profileBodyEventEmitter = new EventEmitter();

  generalOps = new GeneralOps();

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  cardheightset = 'desktop-card';

  dataLoaded = false;
  headerData;
  headerStarArray = [];
  showHalfStar = false;
  uploadedProfilePicture;

  showUploader = false;
  showUploadingAnimation = false;
  showUploadedImage = false;

  employeeIdToLoad;
  displayToEdit = false;
  showContact = false;

  errorCode;
  errorType;
  errorMessage;

  starRating: number;
  reviewStarRating: number;

  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/profile/upload?emp_no=' + Profile.EMPLOYEE_ID;
  uploadImageSize = environment.PROFILE_IMAGE_SIZE;
  customStyle = {
    selectButton: {
      'background-color': 'transparent',
      'border-radius': '25px',
      'color': '#333333',
      'box-shadow': 'none',
      'margin': '0'
    },
    clearButton: {
      'display': 'none'
    },
    layout: {
      'background-color': 'transparent',
      'color': '#838383',
      'font-size': '10px !important',
      'width': '100%',
      'font-family': 'roboto'
    },
    previewPanel: {
      'display': 'none'
    }
  };
  showReviewThisProfile: boolean;
  comment: '';
  showSave = false;
  showRemove = true;
  showEditImage: boolean;
  showOtherImage: boolean;
  permissionToResetPwd = false;
  changePwd = false;

  errorMsg = '';

  constructor(private responsiveService: ResponsiveService,
              private zone: NgZone, private httpservice: ProfileUserServiceService, private router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private modalUiService: ModalUiServiceService,
              private adminService: AdminServiceService) {

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

    this.starRating = 0;
    this.reviewStarRating = 0;

    if (this.router.url === '/profile/_search') {
      this.changePwd = false;
      this.permissionToResetPwd = this.generalOps.checkUserHavePermissionForSection('PasswordSettings');
    } else {
      this.permissionToResetPwd = false;
      this.changePwd = Profile.USER_LOGIN_TYPE === 'DB' && this.generalOps.checkUserHavePermissionForSection('ChangePasswordCardOfNavigationBar');
    }

    this.checkEmpId();
    this.loadEmpHeaderData();
  }

  loadEmpHeaderData() {
    this.httpservice.getEmployeeHeaderInfo(this.employeeIdToLoad)
      .subscribe(
        (data: any) => {
          this.headerData = data;

          Profile.USER_NAME = data.firstName;
          this.reviewStarRating = 0;

          const halfStars = data.averageStarRating % 1;
          if (halfStars > 0) {
            this.showHalfStar = true;
          }
          const wholeStars = data.averageStarRating - halfStars;

          for (let starName = 1; starName <= wholeStars; starName++) {
            this.headerStarArray.push(starName);
          }

          Profile.WORKING_PROJECT = data.project;
          if (this.headerData.profileImage.includes('/male.png') ||
            this.headerData.profileImage.includes('/female.png')) {
            this.showUploadedImage = false;
            this.showUploader = true;
            this.showRemove = false;
          } else {
            this.uploadedProfilePicture = this.headerData.profileImage;
            this.showUploadedImage = true;
            this.showUploader = false;
            this.showSave = false;
            this.showRemove = true;
          }

          this.dataLoaded = true;
        }
      );
  }

  checkEmpId() {
    switch (this.employeeId) {
      case Profile.EMPLOYEE_ID:
        this.displayToEdit = true;
        this.showContact = true;
        this.showReviewThisProfile = false;
        this.showEditImage = true;
        this.showOtherImage = false;
        break;
      case Search.SEARCH_EMPLOYEE_ID:
        this.displayToEdit = false;
        this.showContact = true;
        this.showReviewThisProfile = true;
        this.showOtherImage = true;
        this.showEditImage = false;
        break;
    }
    this.employeeIdToLoad = this.employeeId;
  }

  ShowMobile() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.cardheightset = 'mobile-card';
      this.isMobile = true;
      this.isTablet = false;
      this.isDesktop = false;
    });
  }

  ShowDesktop() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.cardheightset = 'desktop-card';
      this.isMobile = false;
      this.isTablet = false;
      this.isDesktop = true;
    });
  }

  ShowTablet() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.cardheightset = 'tablet-card';
      this.isMobile = false;
      this.isTablet = true;
      this.isDesktop = false;
    });
  }

  // Image Upload
  uploadFinish(url) {
    const uploadedImage = url.serverResponse.response.body[0];
    this.uploadedProfilePicture = uploadedImage;
    this.showUploader = false;
    this.showSave = true;
    this.showUploadedImage = true;
    this.showRemove = false;
  }

  savePossible() {
    return this.showUploadedImage;
    // console.log(this.showUploadedImage);
  }

  deleteUploadedImage() {
    this.uploadedProfilePicture = this.headerData.profileImage;
    this.showUploader = true;
    this.showSave = false;
    this.showUploadedImage = false;
    this.showRemove = false;

    // this.hideModal('uploadPicture');
  }

  removeProfilePic() {
    if (this.headerData.gender === 'Female') {
      this.uploadedProfilePicture = '';
    } else {
      this.uploadedProfilePicture = '';
    }
    this.saveProfilePicture('remove');
  }

  saveProfilePicture(callingFrom: string) {
    // console.log('this.uploadedProfilePicture', this.uploadedProfilePicture)
    if (this.uploadedProfilePicture === null || this.uploadedProfilePicture === undefined) {
      this.openErrorModal(4000, 'ERROR', 'Upload image first');
    } else {
      const empid = Profile.USER_TOKEN;
      const uploadedURL = this.uploadedProfilePicture;
      const gender = this.headerData.gender;

      const jsonPost = {
        'empNo': empid,
        'imageUrl': uploadedURL,
        'gender': gender
      };
      this.httpservice.saveUploadedPicture(jsonPost)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.loadEmpHeaderData();
              this.openErrorModal(103, 'SUCCESS', '');
              this.showHalfStar = false;
              this.headerStarArray = [];
              this.showUploadedImage = false;
              this.showUploader = false;
              this.showSave = false;
              if (callingFrom === 'save') {
                this.uploadedProfilePicture = '';
              }
              this.showUploadedImage = !(this.uploadedProfilePicture.includes('/female.png') ||
                this.uploadedProfilePicture.includes('/male.png'));
              this.showRemove = true;

              window.location.reload(); // for update profile picture in fe
            }
          }
        );
    }
    this.hideModal('uploadPicture');
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }


  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }

  /**
   * call profile body component method via emitter for
   * redirecting tab inside profile
   * @param {string} tabName - name of tab
   */
  redirect(tabName: string) {
    this.profileBodyEventEmitter.emit({'tabName': tabName});
  }

  /**
   * chnage rating star number of new review modal
   * @param {number} value - no of stars
   */
  setGroupStar(value: number) {
    this.reviewStarRating = value;
  }

  reviewValidate() {
    return !((<HTMLInputElement>document.getElementById('reviewTitle')).value === '' || this.reviewStarRating === 0);
  }

  saveReview() {
    const reviewTitle = (<HTMLInputElement>document.getElementById('reviewTitle')).value;
    // const reviewComment = (<HTMLInputElement>document.getElementById('reviewComment')).value;
    const reviewComment = this.comment;
    const reviewPostOnFeed = (<HTMLInputElement>document.getElementById('reviewPostOnFeed')).checked;

    const reviewee = this.employeeId;
    const star = this.reviewStarRating;

    if (!this.reviewValidate()) {
      this.errorMsg = '*Please fill all the mandatory fields';
      setTimeout(() => this.errorMsg = '', 4000);
      return;
    }
    if (this.reviewValidate()) {
      const json = {
        'id': 1,
        'status': 30000,
        'title': reviewTitle,
        'comment': reviewComment,
        'starRating': star,
        'isPublic': 1,
        'revieweeAs': 0, // for personal review
        'reviewerAs': 0, // for personal review
        'saveToFeed': reviewPostOnFeed,
        'reviewees': [
          reviewee
        ]
      };

      this.httpservice.postReviews(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {

              this.loadEmpHeaderData();

              this.openErrorModal(100, 'SUCCESS', '');

              (<HTMLInputElement>document.getElementById('reviewTitle')).value = '';
              (<HTMLInputElement>document.getElementById('reviewComment')).value = '';

              this.interCommunicationServiceService.onSaveReview(true);

            } else if (data.httpStatusCode === 500) {
            }
          }
        );
      this.hideModal('reviewProfileModal');
    } else {
      this.hideModal('reviewProfileModal');
      this.openErrorModal(9100, 'FAILED', '');
    }


  }

  closeUploadModal() {
    if ((this.uploadedProfilePicture !== null && this.uploadedProfilePicture !== undefined ) && !(this.uploadedProfilePicture.includes('/female.png') ||
      this.uploadedProfilePicture.includes('/male.png'))) {
      this.showUploader = false;
      this.showUploadedImage = true;
      this.showRemove = false;
    } else {
      this.showUploader = true;
      this.showUploadedImage = false;
      this.showRemove = false;
    }
    if (this.uploadedProfilePicture === this.headerData.profileImage && (
      this.uploadedProfilePicture.includes('/female.png') ||
      this.uploadedProfilePicture.includes('/male.png'))) {
      this.showRemove = false;
      this.showUploadedImage = false;
    } else if (this.uploadedProfilePicture === this.headerData.profileImage && !(this.uploadedProfilePicture.includes('/female.png') ||
      this.uploadedProfilePicture.includes('/male.png'))) {
      this.showRemove = true;
      this.showUploadedImage = true;
    }
    // this.showRemove = this.uploadedProfilePicture === this.headerData.profileImage;
    this.hideModal('uploadPicture');
  }

  resetEmployeePwd() {
    const permissionJson = {
      'empNo': localStorage.getItem('lsei_'),
    };

    this.adminService.resetUserPassword(permissionJson)
      .subscribe(
        (data: any) => {
          this.hideModal('passwordResetModal');
          this.openErrorModal('9996', 'SUCCESS', 'Successfully reset password');
        },  (resetPasswordError: HttpErrorResponse) => {
          if (resetPasswordError.status === 200) {
            this.hideModal('passwordResetModal');
            this.openErrorModal(9995, 'SUCCESS', 'Successfully reset password');
          } else if (resetPasswordError.status === 500) {
            this.hideModal('passwordResetModal');
            this.openErrorModal(9994, 'FAILED', resetPasswordError.error.message);
          }
        }
      );
  }

  convertUppercaseToLowercase(text) {
    return text.toLowerCase();
  }
}
