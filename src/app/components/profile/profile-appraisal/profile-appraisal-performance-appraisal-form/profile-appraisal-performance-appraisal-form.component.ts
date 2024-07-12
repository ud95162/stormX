import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {HttpErrorResponse} from '../../../../../../node_modules/@angular/common/http';
import {RESPONSE_ERROR} from '../../../../classes/constants';
import {APPRAISAL_INFO_MESSAGE} from '../../../../classes/leave/leave-constants';
import {FeedbackServiceService} from '../../../../service/appraisal-feedback-services/feedback-service.service';
import {AppraisalServiceService} from '../../../../service/employee-self-service-services/appraisal-service.service';
import {Appraisals} from '../../../../_global/appraisals';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {Profile} from '../../../../_global/profile';
import {Search} from '../../../../_global/search';
import {Router} from '@angular/router';
import {DesignationWiseDeadline} from '../../../../classes/appraisal/appraisal-criteria';
import {Event} from '../../../../_global/event';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
import {CONSTANT} from "../../../../utility/Constants";

@Component({
  selector: 'app-profile-appraisal-performance-appraisal-form',
  templateUrl: './profile-appraisal-performance-appraisal-form.component.html',
  styleUrls: ['./profile-appraisal-performance-appraisal-form.component.css']
})
export class ProfileAppraisalPerformanceAppraisalFormComponent implements OnInit, OnChanges {
  @Input() employeeId;
  @Input() year;

  showPerformanceAppraisalForm = false;
  performanceAppraisalObject = Appraisals.PERFORMANCE_APPRAISAL_FORM;


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
  previousView = false;
  latestView = false;
  appraisalSavingResponse: any;
  errorCode;
  errorType;
  errorMessage;
  // currentYear: number = new Date().getFullYear();
  // nextYear: string = (this.currentYear + 1).toString();
  today = Event.setCurrentDateTime().processedFullDate;
  private appraisalDeadlines: DesignationWiseDeadline[] = [];
  private employeeCategory: any;
  appraisalDeadline;
  appraisalYear: any;
  perm_code = 'Profile';
  expectationComment: '';
  givenRatingName: any;
  expectationId: any;
  selectedOptionId: any;
  expectationComment2 = '';
  // expCommentEditable = false;
  // expCommentSavable = false;
  // expCommentTxtAreaDisabled = false;
  expCommentSaveButtonDisabled = false;
  showCloseExpCommentModal = true;

  empExpectationComments = [];
  empExpectationCommentObj: any;
  loggedInEmpID: any;
  tabName = 'comment';
  showMandatoryComment = false;
  disableButtonForSpacesInTextArea = false;
  evaluatorCompleted: boolean;

  constructor(public router: Router, private interCommunicationServiceService: InterCommunicationServiceService,
              private feedbackService: FeedbackServiceService, private appraisalServiceService: AppraisalServiceService,
              private modalUiService: ModalUiServiceService) {
  }

  ngOnInit() {
    const year = this.feedbackService.getLatestAppraisalYear('Profile');
    const deadlineDates = this.feedbackService.getDeadlineForUser(this.year, localStorage.getItem('lsei_'));

    forkJoin([year, deadlineDates]).subscribe((result: any[]) => {
      this.appraisalYear = result[0];
      this.appraisalDeadline = result[1];

      if (this.year !== CONSTANT.APPRAISAL.YEAR_2019) {
        this.getAppraisalData(this.employeeId);
        this.latestView = true;
        this.previousView = false;
      } else if (this.year === CONSTANT.APPRAISAL.YEAR_2019) {
        this.loadPerformanceAppraisalForm(this.employeeId);
        this.previousView = true;
        this.latestView = false;
      }
    });

    // this.feedbackService.getLatestAppraisalDeadlines(this.year, this.perm_code).subscribe((data: any) => {
    //   this.appraisalDeadlines = data;
    //   this.appraisalServiceService.getEmployeeCategoryForyear(this.employeeId, this.year).subscribe((data2: any) => {
    //     this.employeeCategory = data2.category;
    //     // if (this.year === '2020') {
    //     if (this.year !== '2019') {
    //       this.getAppraisalData(this.employeeId);
    //       this.latestView = true;
    //       this.previousView = false;
    //     } else if (this.year === '2019') {
    //       this.loadPerformanceAppraisalForm(this.employeeId);
    //       this.previousView = true;
    //       this.latestView = false;
    //     }
    //   });
    //   this.feedbackService.getLatestAppraisalYear('Profile').subscribe((data3: any) => {
    //     this.appraisalYear = data3;
    //   });
    // });

  }


  ngOnChanges(changes: SimpleChanges) {

    if (!changes.year.isFirstChange() && (changes.year.previousValue !== changes.year.currentValue)) {

      // if (this.year === '2020') {
      if (this.year !== '2020') {
        this.getAppraisalData(this.employeeId);
        this.latestView = true;
        this.previousView = false;
      } else if (this.year === CONSTANT.APPRAISAL.YEAR_2019) {
        this.loadPerformanceAppraisalForm(this.employeeId);
        this.previousView = true;
        this.latestView = false;
      }

    }

  }

  getAppraisalData(selectedEmployee) {
    this.showEditProfile = false;
    this.showLoading = true;
    this.showNoDataError = false;

    this.loggedInEmpID = localStorage.getItem('leid_');

    this.feedbackService.getEmployeePersonalApprisalForm(selectedEmployee, this.year).subscribe((data: any) => {

      this.personalApprisalData = data;
      (<HTMLInputElement>document.getElementById('evaluatorCompleted')).checked = this.personalApprisalData.evaluatorCompleted;
      // console.log('evaluatorCompleted on init', this.personalApprisalData.evaluatorCompleted);
      // console.log('data: ', data);
      // this.expectationComment2 = data.ratingGroupedByPillars.expectationComment;

      // console.log('this.personalApprisalData.ratingGroupedByPillars ', this.personalApprisalData.ratingGroupedByPillars);

      if (this.personalApprisalData.ratingGroupedByPillars && this.personalApprisalData.ratingGroupedByPillars.length > 0) {

        if (this.year === this.appraisalYear.year) {
          if (this.personalApprisalData.editable && this.appraisalDeadline.endDate >= this.today) {

            this.isReadOnly = false;
            // avoid editing 2020 data
            // this.isReadOnly = true;
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

      } else {

        this.showLoading = false;
        this.showNoDataError = true;

      }

    }, error => {
      this.showLoading = false;
      this.showNoDataError = true;
      console.log(error);
    });

  }

  increasingTextBoxSize(elementId) {
    setTimeout(function () {
      let element = (<HTMLInputElement>document.getElementById(elementId));
      element.style.cssText = 'height:' + element.scrollHeight + 'px';
    }, 0);
  }

  savePerformanceAppraiserComment() {

    let savingObj = {
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

      // this.getAppraisalData(this.employeeId);

    }, error => {
      console.log(error);
    });

  }

  changePillarRating(empNo, expectationId, otherRatingList, selectedOptionFromDb, selectedOption, empExpectationComments) {
    this.expectationId = expectationId;
    this.empExpectationComments = empExpectationComments;
    if (empExpectationComments != null) {
      this.empExpectationCommentObj = empExpectationComments.find(appraiserExpectationComment => appraiserExpectationComment
        .commentedByENo === this.loggedInEmpID);
      if (this.empExpectationCommentObj !== undefined ) {
        this.expectationComment = this.empExpectationCommentObj.comment;
      } else {
        this.expectationComment = '';
      }
    } else {
      this.expectationComment = '';
    }
    this.expectationComment2 = this.expectationComment;
    this.givenRatingName = selectedOption;

    let selectedOptionId = (otherRatingList.find(option => option.name === selectedOption)).id;
    this.selectedOptionId = selectedOptionId;

    let postObj = {
      empId: empNo,
      expectationId: expectationId,
      rating: selectedOptionId,
      // year: '2020'
      year: this.year
    };
    if (selectedOption === 'E_Exp' || selectedOption === 'N_Imp' || selectedOption === 'M_Exp') {
      this.setMandatoryComment();
      this.showSaveQuoteModal('addEditExpectationCommentModal');
    }

    if (!((this.givenRatingName === 'E_Exp' || this.givenRatingName === 'N_Imp' || this.givenRatingName === 'M_Exp') && this.expectationComment === '')) {
      this.feedbackService.saveAppraisalTableData(postObj).subscribe((data: any) => {

        this.saveMessage = data;
        // this.getAppraisalData(this.employeeId);

      }, error => {
        console.log(error);
      });
    }

  }

  removingSpace(stringToUpdate) {
    return stringToUpdate.replace(/\s/g, '');
  }


  getLeftColumnWidth(expObjArray: any) {
    // console.log('getLeftColumnWidth ' + expObjArray);
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
    // console.log('getRightColumnWidth ' + expObjArray);
    if (expObjArray.length > 7) {
      return 'col-sm-8';
    } else if (expObjArray.length === 7) {
      return 'col-sm-7';
    } else if (expObjArray.length === 6) {
      return 'col-sm-6';
    } else if (expObjArray.length < 6) {
      return 'col-sm-6';
    }
  }


  saveAppraiserCommentWithinPillar(commentPillar) {

    this.feedbackService.savePillarExpectationComment(commentPillar, this.year).subscribe((data: any) => {


      this.pillarCommentSavingResponse = data;

      if (this.pillarCommentSavingResponse.httpStatusCode === 200) {

        (<HTMLInputElement>document.getElementById('openPersonalAppraisalDatEditingNotificationPillarCommentPopup')).click();
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('closePersonalAppraisalDatEditingNotificationPillarCommentPopup')).click();
        }, 2500);

        // this.getAppraisalData(this.employeeId);


      } else {

        let errorObj = {
          'message': 'Unsuccessful, Please try again later',
          'httpStatus': 'OK',
          'httpStatusCode': 500,
          'extraObject': null,
          'httpTitle': null
        };

        this.pillarCommentSavingResponse = errorObj;

        (<HTMLInputElement>document.getElementById('openPersonalAppraisalDatEditingNotificationPillarCommentPopup')).click();
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('closePersonalAppraisalDatEditingNotificationPillarCommentPopup')).click();
        }, 2500);

        // this.getAppraisalData(this.employeeId);

      }

    }, error => {
      console.log(error);
    });

    console.log(commentPillar);
  }


  loadPerformanceAppraisalForm(employeeNo) {
    this.appraisalServiceService.getPerformanceAppraisalForm(employeeNo)
      .subscribe((data: any) => {
          this.performanceAppraisalObject = data;
          this.showPerformanceAppraisalForm = true;
          // $(document).ready(() => {
          //   if (data.viewAsMySelf) {
          //     (<HTMLInputElement>document.getElementById('previousAppraiseeComment')).disabled = !data.appraisalAcknowledgement.acknowledgmentEdit;
          //   } else {
          //     (<HTMLInputElement>document.getElementById('previousAppraiseeComment')).disabled = !data.viewAsMySelf;
          //   }
          //   // (<HTMLInputElement>document.getElementById('appraiseeComment')).disabled = !(!data.viewAsMySelf || data.appraisalAcknowledgement.acknowledgmentEdit);
          // });
        }, error => {
          this.showPerformanceAppraisalForm = false;
          this.openErrorModal(1112, 'error', 'Request Failed!');
        }
      );
  }

  removeSpace(stringToUpdate) {
    let newString;
    if (stringToUpdate === null) {
      newString = '';
    } else {
      newString = stringToUpdate;
    }
    return newString.replace(/\s/g, '');
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.interCommunicationServiceService.changeErrorCode(errorCode, errorType, errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  increaseTextBoxSize(elementId) {
    setTimeout(function () {
      let element = (<HTMLInputElement>document.getElementById(elementId));
      // element.style.cssText = 'height:auto;';
      element.style.cssText = 'height:' + element.scrollHeight + 'px';
    }, 0);
  }

  removePanelists(panelistObj) {
    let r = confirm('Remove Panelist?');
    if (r == true) {
      let index = this.performanceAppraisalObject.officialUseOnlyObject.panelistInfos.indexOf(panelistObj);
      if (index > -1) {
        this.performanceAppraisalObject.officialUseOnlyObject.panelistInfos.splice(index, 1);
      }
    } else {
    }
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

  updatePerformanceAppraisal(clickedOn) {
    if (clickedOn === 'employee') {
      document.getElementById('appraiseeComment').classList.remove('error');
      if (this.performanceAppraisalObject.appraiseeComment === '' || this.performanceAppraisalObject.appraiseeComment === null) {
        document.getElementById('appraiseeComment').classList.add('error');
      } else {
        this.postThePerformanceAppraisalRequest();
      }
    } else {
      let noValueToPostArr = [];

      for (let key in this.performanceAppraisalObject.officialUseOnlyObject.salaryDetails) {
        document.getElementById(this.removeSpace(this.performanceAppraisalObject.officialUseOnlyObject.salaryDetails[key].key)).classList.remove('error');
        if (this.performanceAppraisalObject.officialUseOnlyObject.salaryDetails[key].value === '' || this.performanceAppraisalObject.officialUseOnlyObject.salaryDetails[key].value === null) {
          noValueToPostArr.push(false);
          document.getElementById(this.removeSpace(this.performanceAppraisalObject.officialUseOnlyObject.salaryDetails[key].key)).classList.add('error');
        } else {
          noValueToPostArr.push(true);
        }
      }

      if (!noValueToPostArr.includes(false)) {
        this.postThePerformanceAppraisalRequest();
      }
    }
  }

  postThePerformanceAppraisalRequest() {
    this.appraisalServiceService.putPerformanceAppraisalForm(this.performanceAppraisalObject)
      .subscribe((data: any) => {
          this.openErrorModal(1111, 'SUCCESS', 'Form submission successful!');
          this.loadPerformanceAppraisalForm(this.employeeId);
        }, error => {
          this.openErrorModal(1112, 'ERROR', 'Form submission failed!');
        }
      );
  }

  printAppraisalView() {
    window.print();
  }

  onClickAcknowledgementCheckBox() {
    (<HTMLInputElement>document.getElementById('acknowledgementConfirmationModalButton')).click();
  }

  clickOnAppraiseeAcknowledgementNo() {
    (<HTMLInputElement>document.getElementById('appraiseeAcknowledgement')).checked = false;
  }

  clickOnAppraiseeAcknowledgement() {
    (<HTMLInputElement>document.getElementById('confirmationModalCloseButton')).click();
    this.appraisalServiceService.postPerformanceAppraisalAppraiseeAcknowledgement(this.performanceAppraisalObject.appraisalAcknowledgement)
      .subscribe((data: any) => {
          this.openErrorModal(1111, 'SUCCESS', 'Form submission successful!');
          this.loadPerformanceAppraisalForm(this.employeeId);
        }, error => {
          this.openErrorModal(1112, 'ERROR', 'Form submission failed!');
        }
      );
  }

  clickOnAppraiserSignOff(appraiserId) {
    this.appraisalServiceService.postPerformanceAppraisalAppraiserSignoff({}, appraiserId)
      .subscribe((data: any) => {
          this.openErrorModal(1111, 'SUCCESS', 'Form submission successful!');
          this.loadPerformanceAppraisalForm(this.employeeId);
        }, error => {
          this.openErrorModal(1112, 'ERROR', 'Form submission failed!');
          (<HTMLInputElement>document.getElementById('appraiserSignOff')).checked = false;
        }
      );
  }


  openSuccessModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  saveAll() {

    this.feedbackService.saveAppraisalAllData(this.personalApprisalData, localStorage.getItem('lsei_'), this.year).subscribe((data: any) => {

      this.appraisalSavingResponse = data;

      this.openSuccessModal(71003, RESPONSE_ERROR.SUCCESS, APPRAISAL_INFO_MESSAGE.APPRAISAL_SAVE.SAVE_SUCCESS);

    }, (appraisalSaveError: HttpErrorResponse) => {
      this.openSuccessModal(71001, RESPONSE_ERROR.ERROR, appraisalSaveError.message);
    });

  }


  viewAddExpectationComment(expectationId: any, givenRatingName: any, empExpectationComments: any, otherRatingList: any) {
    // console.log('expectationId', expectationId);
    // console.log('expectationComment', expectationComment);
    this.expectationId = expectationId;
    this.empExpectationComments = empExpectationComments;
    if (givenRatingName !== null) {
      this.selectedOptionId = (otherRatingList.find(option => option.name === givenRatingName)).id;
    }
    if (empExpectationComments != null) {
      this.empExpectationCommentObj = empExpectationComments.find(appraiserExpectationComment => appraiserExpectationComment
        .commentedByENo === this.loggedInEmpID);
      if (this.empExpectationCommentObj !== undefined ) {
        this.expectationComment = this.empExpectationCommentObj.comment;
      } else {
        this.expectationComment = '';
      }
    } else {
      this.expectationComment = '';
    }
    this.expectationComment2 = this.expectationComment;
    this.givenRatingName = givenRatingName;
    this.empExpectationComments = empExpectationComments;
    this.setMandatoryComment();
    this.showSaveQuoteModal('addEditExpectationCommentModal');
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
    // this.tabName = 'comment';
  }

  saveExpectationComment() {
    let postObj = {
      empNo: this.personalApprisalData.employeeInfo.empNo,
      expectationId: this.expectationId,
      expectationComment: this.expectationComment,
      year: this.year
    };

    let postObj2 = {
      empId: this.employeeId,
      expectationId: this.expectationId,
      rating: this.selectedOptionId,
      // year: '2020'
      year: this.year
    };
    this.expectationComment2 = this.expectationComment;

    this.feedbackService.editExpectationComment(postObj).subscribe((data: any) => {

      // this.hideModal('addEditExpectationCommentModal');
      if (data.httpStatusCode === 200) {
        if ((this.givenRatingName === 'E_Exp' || this.givenRatingName === 'N_Imp' || this.givenRatingName === 'M_Exp') && this.expectationComment !== '') {
          this.feedbackService.saveAppraisalTableData(postObj2).subscribe((data2: any) => {
            this.saveMessage = data2;
            this.getAppraisalData(this.employeeId);

          }, error => {
            console.log(error);
          });
        } else {
          this.getAppraisalData(this.employeeId);
        }
        this.closeModal();
        this.openErrorModal(1111, 'SUCCESS', 'Comment Successfully Added');
      } else {
        this.getAppraisalData(this.employeeId);
        this.closeModal();
        this.openErrorModal(1112, 'error', 'Unsuccessful!');
      }
      // this.getAppraisalData(this.employeeId);
      // this.expCommentSavable = false;

    }, error => {
      this.getAppraisalData(this.employeeId);
      this.closeModal();
      this.openSuccessModal(71001, RESPONSE_ERROR.ERROR, error.error.message);
    });
  }

  closeModal() {
    this.hideModal('addEditExpectationCommentModal');
    this.isReadOnly = false;
    if ((this.givenRatingName === 'E_Exp' || this.givenRatingName === 'N_Imp' || this.givenRatingName === 'M_Exp') && this.expectationComment === '') {
      this.getAppraisalData(this.employeeId);
    } else if ((this.givenRatingName === 'E_Exp' || this.givenRatingName === 'N_Imp' || this.givenRatingName === 'M_Exp') && this.expectationComment2 === '') {
      this.getAppraisalData(this.employeeId);
    }
    this.expectationComment = '';
    this.expectationComment2 = '';
    this.disableButtonForSpacesInTextArea = false;
  }

  setEditExpectationComment() {
    this.expectationComment = '';
    // this.expCommentEditable = false;
    // this.expCommentSavable = true;
    // this.expCommentTxtAreaDisabled = false;
  }

  changeTabs(tab) {
    this.tabName = tab;
  }

  generateWeightText(weight) {
    let stringWeight = null;
    if (weight === 0 ) {
      return '';
    } else {
      stringWeight = '('.concat(weight).concat(')');
    }
    return stringWeight;
  }

  deleteComment() {
    this.hideModal('addEditExpectationCommentModal');
    if ((this.givenRatingName === 'E_Exp' || this.givenRatingName === 'N_Imp' || this.givenRatingName === 'M_Exp') &&
      (this.empExpectationComments.length === 1 && this.empExpectationCommentObj !== undefined)) {
      this.openErrorModal(1112, 'error', 'You cannot delete the comment if the selected rating is E_Exp or N_Imp or M_Exp!');
    } else {
      this.feedbackService.deleteExpectationComment(this.employeeId, this.expectationId, this.year).subscribe((data: any) => {
        if (data.httpStatusCode === 200) {
          this.openErrorModal(1111, 'SUCCESS', 'Comment Successfully Deleted');
        } else {
          this.openErrorModal(1112, 'error', 'Unsuccessful!');
        }
        this.expectationComment = '';
        this.expectationComment2 = '';
        this.getAppraisalData(this.employeeId);
        // this.expCommentSavable = false;

      }, error => {
        console.log(error);
      });
    }
  }

  changeExpectationComment(event) {
    let str = event.target.value;
    let result = str.replace(/\s/g, '');
    // let result = str.trim();

    this.disableButtonForSpacesInTextArea = result === '';
  }

  private setMandatoryComment() {
    if (!(this.givenRatingName === 'E_Exp' || this.givenRatingName === 'N_Imp' || this.givenRatingName === 'M_Exp')) {
      this.showCloseExpCommentModal = true;
      this.showMandatoryComment = false;
    } else {
      this.showCloseExpCommentModal = true;
      this.showMandatoryComment = true;
    }
  }

  onCheckBoxClick() {
    this.evaluatorCompleted = (<HTMLInputElement>document.getElementById('evaluatorCompleted')).checked;
    this.personalApprisalData.evaluatorCompleted = this.evaluatorCompleted;
    // console.log('evaluatorCompleted', this.personalApprisalData.evaluatorCompleted);
  }
}
