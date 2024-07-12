import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../../../_global/profile';
import { Search } from '../../../../_global/search';
import { VALIDATION_MESSAGE } from '../../../../classes/appraisal';
import { FeedbackServiceService } from '../../../../service/appraisal-feedback-services/feedback-service.service';

@Component({
  selector: 'app-profile-feedback-personal',
  templateUrl: './profile-feedback-personal.component.html',
  styleUrls: ['./profile-feedback-personal.component.css']
})
export class ProfileFeedbackPersonalComponent implements OnInit {

  validationErrorMessage = '';
  answerNotification = '';
  questionAnswerData: any;
  answerSavingResponse: any;
  isUserLogged = false;
  showSaveButton = true;

  constructor(
    public router: Router,
    private feedbackService: FeedbackServiceService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.getEditablePermission();

  }

  getAllCycleQuestionAnswer(empId) {
    this.feedbackService.getPersonalCyclicQuestionAnswer(empId).subscribe((data: any) => {

      this.questionAnswerData = data;

    }, error => {
      console.log(error);
    });

  }

  getEditablePermission() {

    if (this.router.url === '/profile/_search') {

      this.isUserLogged = true;
      this.showSaveButton = false;
      this.getAllCycleQuestionAnswer(Search.SEARCH_EMPLOYEE_ID);
    } else {

      this.isUserLogged = false;
      this.showSaveButton = true;
      this.getAllCycleQuestionAnswer(Profile.EMPLOYEE_ID);
    }

  }

  validateToAnswerAllQuestion(selectedQuestionList): boolean {

    let answeredAllQuestion = selectedQuestionList.findIndex((obj => obj.answer === ''));

    if (answeredAllQuestion !== -1) {
      this.setErrorMessage(VALIDATION_MESSAGE.CYCLE_SETTING.NULL_ANSWER);
      return false;
    } else {
      return true;
    }

  }

  setErrorMessage(message: string) {
    this.validationErrorMessage = '*' + message;
    setTimeout(() => this.validationErrorMessage = '', 3500);
  }

  setAnswerNotification(message: string) {
    this.answerNotification = message + ' added to the list.';
    setTimeout(() => this.answerNotification = '', 3500);
  }

  removeSpace(stringToUpdate) {
    return stringToUpdate.replace(/\s/g, '');
  }

  onAddingAnswer(queId, answer, questionList) {

    let changeObjIndex = questionList.findIndex((obj => obj.questionId == queId));
    questionList[changeObjIndex].answer = answer;

    this.setAnswerNotification(answer);

  }

  saveAnswer(selectedQuestionList, selectedCycleId) {

    if (this.validateToAnswerAllQuestion(selectedQuestionList)) {

      const answerObj = {
        cycleId: selectedCycleId,
        questionAnswerList: selectedQuestionList
      };

      const answerObjList: any = [];
      answerObjList.push(answerObj);

      this.feedbackService.postPersonalCyclicQuestionAnswer(answerObjList).subscribe((data: any) => {

        this.answerSavingResponse = data;

        (<HTMLInputElement>document.getElementById('openFeedBackNotificationPopup')).click();
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('closeFeedBackNotificationPopup')).click();
        }, 2500);

        this.getAllCycleQuestionAnswer(Profile.EMPLOYEE_ID);

      }, error => {
        console.log(error);
      });

    } else {

      this.setErrorMessage(VALIDATION_MESSAGE.CYCLE_SETTING.NULL_ANSWER);
    }

  }

}
