import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../utility/responsive-service';
import {ProfileUserServiceService} from '../../../service/profile-user-service.service';
import {Router} from '@angular/router';
import {Profile} from '../../../_global/profile';
import {Search} from '../../../_global/search';
import {PageServiceService} from '../../../service/page-service.service';
import {Page} from '../../../_global/page';
import {InterCommunicationServiceService} from '../../../service/support-services/inter-communication-service.service';
import {ModalUiServiceService} from '../../../service/ui-services/modal-ui-service.service';

@Component({
  selector: 'app-profile-review',
  templateUrl: './profile-review.component.html',
  styleUrls: ['./profile-review.component.css']
})
export class ProfileReviewComponent implements OnInit {
  @Input() getReviewType;
  @Input() employeeId;
  @Input() employeeFirstName;
  @Input() employeeLastName;
  @Input() employeeImage;

  componentPermission = [];
  showReviews = false;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  starRating = 5;

  receivedDataLoaded = false;
  receivedReviewList = [];
  receivedReviewFullList = [];
  receivedShownListNumber;
  receivedBtnMoreShow;
  receivedBtnLessShow;
  receivedReviewsCount = 0;

  givenDataLoaded = false;
  givenReviewList = [];
  givenReviewFullList = [];
  givenReviewID: string;
  givenShownListNumber;
  givenBtnMoreShow;
  givenBtnLessShow;
  givenReviewsCount = 0;

  reviewGivenToId;

  showSaveElements;
  showEditElements;

  editUsername = '';

  showAddReview;
  showAddReviewToPage = false;

  // added
  errorCode;
  errorType;
  errorMessage;
  showReviewGivenToInput: boolean;
  reviewCommentText: any;
  reviewTitleText: any;
  errorMsg = '';
  constructor(private responsiveService: ResponsiveService, private zone: NgZone,
              private httpservice: ProfileUserServiceService,
              private pagehttpservice: PageServiceService, public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private modalUiService: ModalUiServiceService) {
    if (this.router.url.includes('_search')) {
      // this.componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION.OtherProfile;
      for (const val of Profile.EMPLOYEE_APPLICATION_PERMISSION) {
        if (val.includes('Other')) {
          this.componentPermission.push(val.slice(5));
        }
      }
      this.showReviewGivenToInput = false;
    } else {
      this.componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
      this.showReviewGivenToInput = true;
    }

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
    // this.showAddReview = this.employeeId !== Profile.EMPLOYEE_ID;

    switch (this.getReviewType) {
      case 'person':
        this.loadReceivedReviews();
        this.receivedBtnMoreShow = true;
        this.receivedBtnLessShow = false;

        this.loadGivenReviews();
        this.givenBtnMoreShow = true;
        this.givenBtnLessShow = false;
        this.showAddReview = this.employeeId !== Profile.EMPLOYEE_ID;
        break;
      case 'page':
        this.loadReceivedReviewsPage();
        this.receivedBtnMoreShow = true;
        this.receivedBtnLessShow = false;

        this.loadGivenReviewsPage();
        this.givenBtnMoreShow = true;
        this.givenBtnLessShow = false;
        this.showAddReviewToPage = true;
        break;
    }
    this.interCommunicationServiceService.onSaveNewReview.subscribe(loadReviews => {
      if (loadReviews) {
        this.loadReceivedReviews();
      }
    });
    this.showReviews = true;
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

  loadReceivedReviews() {
    this.httpservice.getReviews(this.employeeId, Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.receivedReviewFullList = data;
          this.receivedReviewsCount = data.length;
          if (this.receivedReviewFullList.length > 0) {
            this.receivedReviewList = this.receivedReviewFullList;
            this.receivedDataLoaded = true;
          }
        }
      );
  }

  loadGivenReviews() {
    this.httpservice.getGivenReviews(this.employeeId, Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.givenReviewFullList = data;
          this.givenReviewsCount = data.length;
          if (this.givenReviewFullList.length > 0) {
            this.givenReviewList = this.givenReviewFullList;
            this.givenDataLoaded = true;
          }
        }
      );
  }

  loadReceivedReviewsPage() {
    this.pagehttpservice.getPageReviewsReceived(this.employeeId)
      .subscribe(
        (data: any) => {
          this.receivedReviewFullList = data;
          this.receivedReviewsCount = data.length;
          if (this.receivedReviewFullList.length > 0) {
            this.receivedReviewList = this.receivedReviewFullList;
            this.receivedDataLoaded = true;
          }
        }
      );
  }

  loadGivenReviewsPage() {
    this.pagehttpservice.getPageReviewsGiven(this.employeeId)
      .subscribe(
        (data: any) => {
          this.givenReviewFullList = data;
          this.givenReviewsCount = data.length;
          if (this.givenReviewFullList.length > 0) {
            this.givenReviewList = this.givenReviewFullList;
            this.givenDataLoaded = true;
          }
        }
      );
  }

  modifyListLength(arrayNumber, reviewType) {
    switch (reviewType) {
      case 'received':
        this.receivedReviewList = this.receivedReviewFullList.slice(0, arrayNumber);
        break;
      case 'given':
        this.givenReviewList = this.givenReviewFullList.slice(0, arrayNumber);
        break;
    }
  }

  showMoreReviews(reviewType) {
    switch (reviewType) {
      case 'received':
        this.receivedShownListNumber = this.receivedShownListNumber + 5;
        this.modifyListLength(this.receivedShownListNumber, 'received');
        this.receivedBtnLessShow = true;
        if (this.receivedShownListNumber >= this.receivedReviewFullList.length) {
          this.receivedBtnMoreShow = false;
        }
        break;
      case 'given':
        this.givenShownListNumber = this.givenShownListNumber + 5;
        this.modifyListLength(this.givenShownListNumber, 'given');
        this.givenBtnLessShow = true;
        if (this.givenShownListNumber >= this.givenReviewFullList.length) {
          this.givenBtnMoreShow = false;
        }
        break;
    }
  }

  showLessReviews(reviewType) {
    switch (reviewType) {
      case 'received':
        this.receivedShownListNumber = this.receivedShownListNumber - 5;
        this.modifyListLength(this.receivedShownListNumber, 'received');
        this.receivedBtnMoreShow = true;
        if (this.receivedShownListNumber === 0 || this.receivedShownListNumber <= 5) {
          this.receivedBtnMoreShow = true;
          this.receivedBtnLessShow = false;
        }
        break;
      case 'given':
        this.givenShownListNumber = this.givenShownListNumber - 5;
        this.modifyListLength(this.givenShownListNumber, 'given');
        this.givenBtnMoreShow = true;
        if (this.givenShownListNumber === 0 || this.givenShownListNumber <= 5) {
          this.givenBtnMoreShow = true;
          this.givenBtnLessShow = false;
        }
        break;
    }
  }

  profileRedirect(employeeId, postedAs, postedPageObj) {
    switch (postedAs) {
      case 0:
        if (employeeId === Profile.EMPLOYEE_ID) {
          if (this.employeeId === Profile.EMPLOYEE_ID) {
            location.reload();
          } else {
            this.router.navigate(['./profile/main']);
          }
        } else {
          Search.SEARCH_EMPLOYEE_ID = employeeId;
          localStorage.setItem('lsei_', employeeId);
          if (this.employeeId === Profile.EMPLOYEE_ID) {
            this.router.navigate(['./profile/_search']);
          } else {
            location.reload();
          }
        }
        break;
      case 1:
        Page.PAGE_ID = postedPageObj.pageId;
        localStorage.setItem('pgid', postedPageObj.pageId);
        localStorage.setItem('pgnm', postedPageObj.pageName);
        // location.reload();
        this.router.navigate(['./page/main', postedPageObj.pageId]);
        break;
    }
  }

  onLikeReview(reviewId, likedOrDisliked) {
    const json = {
      'liked': likedOrDisliked,
      'reviewId': reviewId
    };

    this.httpservice.likeReview(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadReceivedReviews();
            this.loadGivenReviews();
          } else if (data.httpStatusCode === 500) {
          }
        }
      );
  }

  setGroupStar(star) {
    this.starRating = star;
  }

  openReviewModal(reviewOp) {
    switch (reviewOp) {
      case 'save':
        this.showSaveElements = 'show-save';
        this.showEditElements = 'hide-edit';
        (<HTMLInputElement>document.getElementById('reviewTitle')).value = '';
        (<HTMLInputElement>document.getElementById('reviewComment')).value = '';
        this.starRating = 5;
        break;
    }
  }

  saveReview() {
    const reviewTitle = (<HTMLInputElement>document.getElementById('reviewTitle')).value;
    const reviewComment = (<HTMLInputElement>document.getElementById('reviewComment')).value;
    const reviewPostOnFeed = (<HTMLInputElement>document.getElementById('reviewPostOnFeed')).checked;
    const reviewee = this.employeeId;
    const star = this.starRating;

    let revieweeAs;
    let reviewerAs;

    switch (this.getReviewType) {
      case 'person':
        revieweeAs = 0;
        reviewerAs = 0;
        break;
      case 'page':
        revieweeAs = 1;
        reviewerAs = 0;
        break;
    }

    const json = {
      'id': 1,
      'status': 30000,
      'title': reviewTitle,
      'comment': reviewComment,
      'starRating': star,
      'isPublic': 1,
      'revieweeAs': revieweeAs,
      'reviewerAs': reviewerAs,
      'saveToFeed': reviewPostOnFeed,
      'reviewees': [
        reviewee
      ]
    };
    this.httpservice.postReviews(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadReceivedReviews();
            this.openErrorModal(100, 'SUCCESS', '');
            (<HTMLInputElement>document.getElementById('reviewTitle')).value = '';
            (<HTMLInputElement>document.getElementById('reviewComment')).value = '';
          } else if (data.httpStatusCode === 500) {
          }
        }
      );
    this.hideModal('deleteReview');

  }

  onEditReviewClick(reviewTitle, reviewComment, reviewId, reviewStarRating, reviewGivenTo, reviewGivenToEmpNo, event) {
    this.showEditElements = 'show-edit';
    this.showSaveElements = 'hide-save';
    // (<HTMLInputElement>document.getElementById('reviewTitle')).value = reviewTitle;
    this.reviewTitleText = reviewTitle;
    // (<HTMLTextAreaElement>document.getElementById('reviewComment') as HTMLTextAreaElement).value = reviewComment;
    this.reviewCommentText = reviewComment;
    this.givenReviewID = reviewId;
    // (<HTMLInputElement>document.getElementById('reviewGivenTo')).value = reviewGivenTo;
    this.editUsername = reviewGivenTo;
    this.starRating = reviewStarRating;
    this.reviewGivenToId = reviewGivenToEmpNo;
  }

  reviewValidate() {
    return !(this.reviewTitleText === '' || this.reviewTitleText === null || this.starRating === 0);
  }

  editReview() {
    const reviewer = Profile.USER_TOKEN;
    const reviewee = this.reviewGivenToId;
    // const editTitle = (<HTMLInputElement>document.getElementById('reviewTitle')).value;
    const editTitle = this.reviewTitleText;
    // const editComment = (<HTMLInputElement>document.getElementById('reviewComment')).value;
    const editComment = this.reviewCommentText;
    const editReason = '';
    const reviewID = this.givenReviewID;
    const userStar = this.starRating;

    let revieweeAs;
    let reviewerAs;

    switch (this.getReviewType) {
      case 'person':
        revieweeAs = 0;
        reviewerAs = 0;
        break;
      case 'page':
        revieweeAs = 1;
        reviewerAs = 0;
        break;
    }
    if (!this.reviewValidate()) {
      this.errorMsg = '*Please fill all the mandatory fields';
      setTimeout(() => this.errorMsg = '', 4000);
      return;
    }
    if (this.reviewValidate()) {
      const jsonPost = {
        'reviewer': reviewer,
        'reviewee': reviewee,
        'reviewId': reviewID,
        'status': 30000,
        'title': editTitle,
        'starRating': userStar,
        'comment': editComment,
        'isPublic': false,
        'reason': editReason,
        'revieweeAs': revieweeAs,
        'reviewerAs': reviewerAs,
      };
      this.httpservice.postEditReviews(jsonPost)
        .subscribe(
          (data: any) => {
            this.hideModal('editReviewModal');
            if (data.httpStatusCode === 200) {
              this.loadGivenReviews();

              this.loadReceivedReviews();
              this.openErrorModal(101, 'SUCCESS', '');

            }
          }
        );
    } else {
      this.openErrorModal(9100, 'FAILED', '');
    }


  }

  onPostDelete(reviewID) {
    this.givenReviewID = reviewID;
    this.httpservice.deleteReviews(reviewID)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadGivenReviews();
            this.loadReceivedReviews();
            this.openErrorModal(102, 'SUCCESS', '');

          }
        }
      );
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
}
