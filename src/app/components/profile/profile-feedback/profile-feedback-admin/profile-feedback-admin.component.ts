import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FeedbackServiceService } from 'app/service/appraisal-feedback-services/feedback-service.service';
import { Search } from '../../../../_global/search';

@Component({
  selector: 'app-profile-feedback-admin',
  templateUrl: './profile-feedback-admin.component.html',
  styleUrls: ['./profile-feedback-admin.component.css']
})
export class ProfileFeedbackAdminComponent implements OnInit {

  cycleStatusData: any[] = [];
  feedBackCycleData: any;
  allFeedbackData: any[] = [];
  cycleViewStatusResponse: any;
  loadedCycleData = false;

  constructor(
    private feedbackService: FeedbackServiceService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.loadFeedBackCycleData();
    this.loadFollowersFeedbackCycles();
  }

  loadFollowersFeedbackCycles() {
    this.feedbackService.getFollowersFeedbackCycles()
        .subscribe((data: any) => {
          if (data.length > 0) {
            this.allFeedbackData = data;
            this.feedBackCycleData = this.allFeedbackData[0].feedBackCycles;
          }
        }, error => {
          console.log(error);
        });
  }

  loadFeedBackCycleData() {
    this.feedbackService.getFollowersFeedbackCyclesCompletingStatus()
        .subscribe((data: any) => {
          if(data.length > 0){
            this.cycleStatusData = data;
            this.loadedCycleData = true;
          }
        }, error => {
          console.log(error);
        });
  }

  redirectToProfileFeedback(empId: string, empName: string, empNo: string) {

    localStorage.setItem('lsei_', empNo);
    localStorage.setItem('lsk_', empName);
    localStorage.setItem('profActTab', 'feedback');
    localStorage.setItem('fb_emp_no', empNo);
    Search.SEARCH_EMPLOYEE_ID = empNo;
    this.router.navigate(['./profile/_search']);
  }

  getCycleStatus(type, statusId) {

    switch (type) {
      case 'new' :
        if (statusId === 0) {
          return 'btn btn-default';
        } else if (statusId === 1) {
          return 'btn btn-info';
        }
        break;
      case 'reviewed' :
        if (statusId === 0) {
          return 'btn btn-default';
        } else if (statusId === 1) {
          return 'btn btn-primary';
        }
        break;
      case 'done' :
        if (statusId === 0) {
          return 'btn btn-default';
        } else if (statusId === 1) {
          return 'btn btn-success';
        }
        break;
    }

  }

  changeCycleViewStatus(changeObj: any) {

    this.feedbackService.changeFollowersFeedbackCycleViewStatus(changeObj)
        .subscribe((data: any) => {
          this.cycleViewStatusResponse = data;
        }, error => {
          console.log(error);
        });

    return this.cycleViewStatusResponse;

  }

  changeBtnStatus(empId, cycleId, selectedBtnId, btnType, btnStatus) {

    let cycleIndex = this.feedBackCycleData.findIndex((obj => obj.id === cycleId));

    let clickedBtnArray = this.feedBackCycleData[cycleIndex].cycleViewStatuses;

    if (btnStatus === 0) {

      let selectedObj = {
        empId: empId,
        cycleId: cycleId,
        selectedViewStatus: {id: selectedBtnId}
      };

      let response = this.changeCycleViewStatus(selectedObj);

      if (response && response.httpStatusCode === 200 && response.httpStatus === 'OK') {

        clickedBtnArray.forEach(function(obj) {
          if (obj.type === btnType) {
            obj.status = 1;
          } else {
            obj.status = 0;
          }
        });

      }

    } else if (btnStatus === 1) {

      let selectedObj = {
        empId: empId,
        cycleId: cycleId,
        selectedViewStatus: {id: selectedBtnId}
      };

      let response = this.changeCycleViewStatus(selectedObj);

      if (response && response.httpStatusCode === 200 && response.httpStatus === 'OK') {

        clickedBtnArray.forEach(function(obj) {
          if (obj.type === btnType) {
            obj.status = 0;
          } else {
            obj.status = 0;
          }
        });

      }

    }

  }
}
