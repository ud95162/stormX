import {Component, OnInit} from '@angular/core';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {Profile} from '../../../../_global/profile';
import {ProfileUserServiceService} from '../../../../service/profile-user-service.service';
import {ModalUiServiceService} from "../../../../service/ui-services/modal-ui-service.service";

@Component({
  selector: 'app-profile-review-post-modal',
  templateUrl: './profile-review-post-modal.component.html',
  styleUrls: ['./profile-review-post-modal.component.css']
})
export class ProfileReviewPostModalComponent implements OnInit {
  advanceSearchReviewObject;

  reviewObjectToPost = {
    'comment': '',
    'isPublic': 1,
    'reviewees': [],
    'reviewer': Profile.USER_TOKEN,
    'saveToFeed': false,
    'starRating': 5,
    'title': ''
  };

  showLoading = false;

  constructor(private interCommunicationServiceService: InterCommunicationServiceService,
              private profileUserServiceService: ProfileUserServiceService,
              private modalUiService: ModalUiServiceService) {
    this.interCommunicationServiceService.processedAdvanceSearchEmployeeObject.subscribe(advanceSearchEmployeeObject => {
      this.advanceSearchReviewObject = advanceSearchEmployeeObject;
      this.reviewObjectToPost.reviewees = advanceSearchEmployeeObject.selectedEmployees;
    });
  }

  ngOnInit() {
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.interCommunicationServiceService.changeErrorCode(errorCode, errorType, errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  setGroupStar(e) {
    this.reviewObjectToPost.starRating = e;
  }

  saveReview() {
    this.showLoading = true;
    this.reviewObjectToPost.saveToFeed = (<HTMLInputElement>document.getElementById('postReviewOnFeedFromAdvanceSearch')).checked;

    this.profileUserServiceService.postReviews(this.reviewObjectToPost)
      .subscribe(
        (data: any) => {
          this.reviewObjectToPost.comment = '';
          this.reviewObjectToPost.title = '';
          this.reviewObjectToPost.starRating = 5;
          this.showLoading = false;
          (<HTMLInputElement>document.getElementById('closeReviewModalButton')).click();
          this.openErrorModal(1111, 'SUCCESS', 'Review Post Successfully!');
        }, error => {
          this.showLoading = false;
          this.openErrorModal(1112, 'ERROR', 'Request Failed!');
        }
      );
  }
  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }

}
