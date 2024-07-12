import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpErrorResponse } from '../../../../../../node_modules/@angular/common/http';
import { Profile } from '../../../../_global/profile';
import { RESPONSE_ERROR } from '../../../../classes/constants';
import { APPRAISAL_INFO_MESSAGE } from '../../../../classes/leave/leave-constants';
import { FeedbackServiceService } from '../../../../service/appraisal-feedback-services/feedback-service.service';
import {AppraisalServiceService} from '../../../../service/employee-self-service-services/appraisal-service.service';
import {Appraisals} from '../../../../_global/appraisals';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {DesignationWiseDeadline} from '../../../../classes/appraisal/appraisal-criteria';
import {Event} from '../../../../_global/event';
import {Router} from '@angular/router';
import {forkJoin} from "rxjs";
import {CONSTANT} from "../../../../utility/Constants";

@Component({
  selector: 'app-profile-appraisal-self-appraisal-form',
  templateUrl: './profile-appraisal-self-appraisal-form.component.html',
  styleUrls: ['./profile-appraisal-self-appraisal-form.component.css']
})
export class ProfileAppraisalSelfAppraisalFormComponent implements OnInit, OnChanges {
  @Input() employeeId;
  @Input() year;
  showSelfAppraisalForm = false;
  selfAppraisalObject = Appraisals.SELF_APPRAISAL_FORM;

  allowPost = false;

  showEditProfile = false;
  showLoading = true;
  showNoDataError = false;
  personalApprisalData: any;
  saveMessage: any;
  selectedEmployee: any;
  orientationType = 'horizontal';
  commentSavingResponse: any;
  historyData: any;
  loadingHistoryData = false;
  loadingHistoryDataError = false;
  displayViewHistoryModal = false;
  isReadOnly = false;
  pillarCommentSavingResponse: any;
  appraisalSavingResponse: any;
  errorCode;
  errorType;
  errorMessage;
  perm_code = 'Profile';
  // currentYear: number = new Date().getFullYear();
  // nextYear: string = (this.currentYear + 1).toString();
  today = Event.setCurrentDateTime().processedFullDate;

  latestView = false;
  previousView = false;
  appraisalYear: any;
  showForm = false;
  appraisalDeadline;
  intYear: number;
  selfCompleted: boolean;

  constructor(private appraisalServiceService: AppraisalServiceService, private interCommunicationServiceService:
                InterCommunicationServiceService, private feedbackService: FeedbackServiceService) {
  }

  ngOnInit() {
    if (this.year !== CONSTANT.APPRAISAL.YEAR_2021_NEW) {
      this.intYear = Number(this.year);
      if (this.intYear <= 2021) {
        this.showForm = true;
      }
    }

    // if (this.year !== CONSTANT.APPRAISAL.YEAR_2021_NEW) {
    //   this.showForm = true;
    // }

    const year = this.feedbackService.getLatestAppraisalYear('Profile');
    const deadlineDates = this.feedbackService.getDeadlineForUser(this.year, localStorage.getItem('lsei_'));

    forkJoin([year, deadlineDates]).subscribe( result => {
      this.appraisalYear = result[0];
      this.appraisalDeadline = result[1];

      if (this.year !== CONSTANT.APPRAISAL.YEAR_2019) {
        this.getAppraisalData(this.employeeId);
        this.latestView = true;
        this.previousView = false;
      }else if (this.year === CONSTANT.APPRAISAL.YEAR_2019) {
        this.loadSelfAppraisalForm(this.employeeId);
        this.previousView = true;
        this.latestView = false;
      }
    });
  }


  ngOnChanges(changes: SimpleChanges) {

    if (!changes.year.isFirstChange() && (changes.year.previousValue !== changes.year.currentValue)){
      if (this.year !== CONSTANT.APPRAISAL.YEAR_2019) {
        this.getAppraisalData(this.employeeId);
        this.latestView = true;
        this.previousView = false;
      }else if (this.year === CONSTANT.APPRAISAL.YEAR_2019) {
        this.loadSelfAppraisalForm(this.employeeId);
        this.previousView = true;
        this.latestView = false;
      }
      if (this.year !== '2021(New)') {
        this.showForm = true;
      }
    }
  }


  getAppraisalData(selectedEmployee) {

    this.feedbackService.getEmployeePersonalApprisalForm(selectedEmployee, this.year).subscribe((data: any) => {

      this.personalApprisalData = data;
      (<HTMLInputElement>document.getElementById('selfCompleted')).checked = this.personalApprisalData.selfCompleted;
      // console.log('selfCompleted on init', this.personalApprisalData.selfCompleted);

        if (this.year === this.appraisalYear.year) {
            if (this.personalApprisalData.selfEditable && this.appraisalDeadline.endDate >= this.today) {
            this.isReadOnly = false;
            this.showLoading = false;
            this.showEditProfile = true;
          } else {
            this.isReadOnly = true;
            this.showLoading = false;
            this.showEditProfile = true;
          }
        } else {
          this.isReadOnly = true;
          this.showLoading = false;
          this.showEditProfile = true;

        }

      // } else {
      //
      //   this.showLoading = false;
      //   this.showNoDataError = true;
      //
      // }

    }, error => {
      this.showLoading = false;
      this.showNoDataError = true;
      console.log(error);
    });

  }

  increasingTextBoxSize(elementId) {
    setTimeout(function() {
      const element = (<HTMLInputElement>document.getElementById(elementId));
      element.style.cssText = 'height:' + element.scrollHeight + 'px';
    }, 0);
  }

  // personal comment saving call
  savePerformanceAppraiserComment() {

    const savingObj = {
      empId: this.personalApprisalData.employeeInfo.empId,
      positiveComment: this.personalApprisalData.positiveComment,
      negativeComment: this.personalApprisalData.negativeComment,
      otherComment: this.personalApprisalData.otherComment,
      // year: 2020
      year: this.year
    };

    this.feedbackService.savingAppraisalComment(savingObj).subscribe((data: any) => {

      this.commentSavingResponse = data;

      (<HTMLInputElement>document.getElementById('openPersonalAppraisalDatEditingNotificationPillarCommentPopup')).click();
      setTimeout(() => {
        (<HTMLInputElement>document.getElementById('closePersonalAppraisalDatEditingNotificationPillarCommentPopup')).click();
      }, 2500);

    }, error => {
      console.log(error);
    });

  }

  changePillarRating(empNo, expectationId, otherRatingList, selectedOptionFromDb, selectedOption) {

    const selectedOptionId = (otherRatingList.find(option => option.name === selectedOption)).id;

    const postObj = {
      empId: empNo,
      expectationId: expectationId,
      rating: selectedOptionId,
      // year: '2020'
      year: this.year
    };

    this.feedbackService.saveSelfAppraisalData(postObj).subscribe((data: any) => {

      this.saveMessage = data;

      // this.getAppraisalData(this.employeeId);

    }, error => {
      console.log(error);
    });

  }

  removingSpace(stringToUpdate) {
    return stringToUpdate.replace(/\s/g, '');
  }

  getLeftColumnWidth(expObjArray: any) {

    if (expObjArray.length > 7) {
      return 'col-sm-4';
    } else if (expObjArray.length === 7) {
      return 'col-sm-5';
    } else if (expObjArray.length === 6) {
      return 'col-sm-6';
    } else if (expObjArray.length < 6) {
      return 'col-sm-6';
    }

  }

  getRightColumnWidth(expObjArray: any) {

    if (expObjArray.length > 7) {
      return 'col-sm-8';
    } else if (expObjArray.length === 7) {
      return 'col-sm-7';
    }
    else if (expObjArray.length === 6) {
      return 'col-sm-6';
    } else if (expObjArray.length < 6) {
      return 'col-sm-6';
    }
  }

  // personal saving cmt  call
  saveAppraiserCommentWithinPillar(commentPillar){

    // year added
    this.feedbackService.savePillarExpectationComment(commentPillar, this.year).subscribe((data: any) => {


      this.pillarCommentSavingResponse = data;

      if (this.pillarCommentSavingResponse.httpStatusCode === 200) {

        (<HTMLInputElement>document.getElementById('openPersonalAppraisalDatEditingNotificationPillarCommentPopup')).click();
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('closePersonalAppraisalDatEditingNotificationPillarCommentPopup')).click();
        }, 2500);


      } else {

        const errorObj = {
          'message': 'Unsuccessful, Please try again later',
          'httpStatus': 'OK',
          'httpStatusCode': 500,
          'extraObject': null,
          'httpTitle': null
        };

        this.pillarCommentSavingResponse = errorObj;
      }

    }, error => {
      console.log(error);
    });

    // console.log(commentPillar);
  }








  loadSelfAppraisalForm(employeeNo) {
    this.appraisalServiceService.getSelfAppraisalForm(employeeNo)
      .subscribe((data: any) => {
          this.selfAppraisalObject = data;
          this.showSelfAppraisalForm = true;
          // $(document).ready(() => {
          //   for (let key in data.feedbackList) {
          //     (<HTMLInputElement>document.getElementById(this.removeSpace(data.feedbackList[key].title.title))).disabled = !data.viewAsMySelf;
          //   }
          // });
          this.allowPost = true;
        }, error => {
          this.showSelfAppraisalForm = false;
          this.openErrorModal(1112, 'ERROR', 'Request failed!');
        }
      );
  }

  removeSpace(stringToUpdate) {
    return stringToUpdate.replace(/\s/g, '');
  }

  increaseTextBoxSize(elementId) {
    setTimeout(function () {
      const element = (<HTMLInputElement>document.getElementById(elementId));
      // element.style.cssText = 'height:auto;';
      element.style.cssText = 'height:' + element.scrollHeight + 'px';
    }, 0);
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.interCommunicationServiceService.changeErrorCode(errorCode, errorType, errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }


  openSuccessModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  submitSelfAppraisalForm(saveType) {
    const noValueToPostArr = [];

    if (saveType === 1) {
      for (const key in this.selfAppraisalObject.feedbackList) {
        document.getElementById(this.removeSpace(this.selfAppraisalObject.feedbackList[key].title.title)).classList.remove('error');
        if (this.selfAppraisalObject.feedbackList[key].comment === '' || this.selfAppraisalObject.feedbackList[key].comment === null) {
          noValueToPostArr.push(false);
          document.getElementById(this.removeSpace(this.selfAppraisalObject.feedbackList[key].title.title)).classList.add('error');
          this.selfAppraisalObject.submissionStatus.saveType = 0;
        } else {
          noValueToPostArr.push(true);
        }
      }
    }

    if (!noValueToPostArr.includes(false)) {
      this.selfAppraisalObject.submissionStatus.saveType = saveType;
      if (this.allowPost) {
        this.appraisalServiceService.putSelfAppraisalForm(this.selfAppraisalObject)
          .subscribe((data: any) => {
              this.openErrorModal(1111, 'SUCCESS', 'Form submission successful!');
              this.allowPost = false;
              this.loadSelfAppraisalForm(this.employeeId);
            }, error => {
              this.openErrorModal(1112, 'ERROR', 'Form submission failed!');
            }
          );
      }
    }
  }


  saveAll() {

    // let overAllMsgObj = {
    //   overallSelfComment:overAllComment,
    //   year:'2020'
    // }

    // change call and send the all the data;

    this.feedbackService.saveAllPersonalAppraisalData(this.personalApprisalData, Profile.EMPLOYEE_ID, this.year).subscribe((data: any) => {

      this.appraisalSavingResponse = data;

      this.openSuccessModal(71003, RESPONSE_ERROR.SUCCESS, APPRAISAL_INFO_MESSAGE.APPRAISAL_SAVE.SAVE_SUCCESS);

    },  (appraisalSaveError: HttpErrorResponse) => {
      this.openSuccessModal(71001, RESPONSE_ERROR.ERROR, appraisalSaveError.message);
    });

  }


  onCheckBoxClick() {
    this.selfCompleted = (<HTMLInputElement>document.getElementById('selfCompleted')).checked;
    this.personalApprisalData.selfCompleted = this.selfCompleted;
    // console.log('selfCompleted', this.personalApprisalData.selfCompleted);
  }
}
