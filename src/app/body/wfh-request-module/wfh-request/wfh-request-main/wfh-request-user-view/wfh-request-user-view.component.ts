import {Component, OnInit} from '@angular/core';
import {WorkFromHomeService} from '../../../../../service/work-from-home-services/work-from-home.service';
import {NewWFHRequestPostBody, UserWFHRequestDetails} from '../../models/WFHRequestDetails';
import {GeneralOps} from '../../../../../utility/GeneralOps';
import {ModalUiServiceService} from '../../../../../service/ui-services/modal-ui-service.service';
import {LeaveServiceService} from '../../../../../service/attendance-leave/leave-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CONSTANT} from '../../../../../utility/Constants';
import {
  InterCommunicationServiceService
} from '../../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-wfh-request-user-view',
  templateUrl: './wfh-request-user-view.component.html',
  styleUrls: ['./wfh-request-user-view.component.css']
})
export class WfhRequestUserViewComponent implements OnInit {

  generalOps = new GeneralOps();
  selectedApprovedStatus = 0;
  startDateForFetchRequest;
  endDateForFetchRequest;
  userWfhRequests: UserWFHRequestDetails[];
  userWfhRequestsDataLoaded = false;
  supervisorList = [];
  newWfhRequestDetails = new NewWFHRequestPostBody(parseInt(localStorage.getItem('emp_db'), 0), -1,
    -1, new Date().toISOString().slice(0, 10), new Date().toISOString().slice(0, 10), 0, '', -1, '');
  validationErrorMessage = '';
  submitButtonClicked = false;
  selectedRequestIdForCancel = 0;

  constructor(private wwtService: WorkFromHomeService,
              private leaveService: LeaveServiceService,
              private modalService: ModalUiServiceService,
              private communicationService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.startDateForFetchRequest = new Date().getFullYear() + '-01-01';
    this.endDateForFetchRequest = new Date().getFullYear() + '-12-31';
    this.getCompanyLeaveManagers();
    this.fetchUserWFHRequests();
  }

  /**
   * this method use to get company all leave managers
   */
  getCompanyLeaveManagers() {
    this.leaveService.getCompanyLeaveManagers()
      .subscribe((data: any) => {
        this.supervisorList = data;
      });
  }

  /**
   * The "changeDateRange" function is used to update the date range for fetching user WFH (work from home) requests.
   *  In the first line of the function, it checks if the start date for the fetch request is greater than the end date.
   *  If it is, it means that the dates are not in the correct order. To fix this,
   *  the function sets the end date to be the same as the start date.
   *  This ensures that the date range is valid and avoids any errors in the fetch request.
   *  After updating the date range, the function calls the "fetchUserWFHRequests" function,
   *  which is responsible for retrieving the WFH requests from the server based on the updated date range.
   */
  changeDateRange() {
    if (this.startDateForFetchRequest > this.endDateForFetchRequest) {
      this.endDateForFetchRequest = this.startDateForFetchRequest;
    }
    this.fetchUserWFHRequests();
  }

  /**
   * when change status from radios it will assign status value to selectedApprovedStatus.
   * @param status (radios value)
   * after select one radio it will redirect to fetch data according to that filter
   */
  changeApprovedStatus(status: number) {
    this.selectedApprovedStatus = status;
    this.fetchUserWFHRequests();
  }


  /**
   * The function  `fetchUserWFHRequests()`  is used to retrieve the work-from-home (WFH) requests made by a user.
   *  First, it sets the  `userWfhRequestsDataLoaded`  variable to  `false`  to indicate that the data has not been loaded yet.
   *  Then, it calls the  `getEmployeeAppliedWfhRequests()`  method of the  `wwtService`  service,
   *  passing in the start and end dates for the request and the selected approval status.
   *  This method returns an Observable that emits the WFH request data.
   *  The function subscribes to this Observable and receives the data in the callback function.
   *  It assigns the received data to the  `userWfhRequests`  variable and sets  `userWfhRequestsDataLoaded`  to  `true`
   *  to indicate that the data has been loaded successfully.
   */
  fetchUserWFHRequests() {
    this.userWfhRequestsDataLoaded = false;
    this.wwtService.getEmployeeAppliedWfhRequests(this.startDateForFetchRequest, this.endDateForFetchRequest, this.selectedApprovedStatus)
      .subscribe((data: any) => {
        this.userWfhRequests = data;
        this.userWfhRequestsDataLoaded = true;
      });
  }

  showModal(modalId) {
    this.modalService.showModal(modalId);
  }

  hideModal(modalId: string) {
    this.modalService.hideModal(modalId);
  }

  /**
   * The validateDateRange() function checks if the start and end dates of a work from home request are valid.
   * If either of the dates is empty, an error message is set and the function returns false.
   * If both dates are present, the function checks if the start date is greater than the end date.
   * If it is, an error message is set and the function returns false.
   * Otherwise, the function returns true, indicating that the date range is valid.
   */
  validateDateRange() {
    if (this.newWfhRequestDetails.startDate === '' || this.newWfhRequestDetails.endDate === '') {
      this.setErrorMessage('Dates cannot be empty!');
      return false;
    } else {
      if (this.newWfhRequestDetails.startDate > this.newWfhRequestDetails.endDate) {
        this.setErrorMessage('Start Date cannot be greater than End Date!');
        return false;
      } else {
        return true;
      }
    }
  }

  /**
   * The function "validateSupervisor()" is used to check if a supervisor has been selected for a new work-from-home request.
   *  The function first checks if the "supervisorProfileId" property of the "newWfhRequestDetails" object is equal to -1.
   *  If it is, it means that no supervisor has been selected. In this case,
   *  the function sets an error message using the "setErrorMessage()" function and returns false,
   *  indicating that the validation has failed.
   *  If the "supervisorProfileId" is not equal to -1, it means that a supervisor has been selected.
   *  In this case, the function simply returns true, indicating that the validation has passed.
   *  The purpose of this function is to ensure that a supervisor is selected before proceeding with the wfh request.
   */
  validateSupervisor() {
    if (this.newWfhRequestDetails.supervisorProfileId === -1) {
      this.setErrorMessage('Please select supervisor!');
      return false;
    } else {
      return true;
    }
  }

  /**
   * This function is used to validate the reason provided for a work from home request.
   * It checks if the reason is empty or not. If the reason is empty,
   * it sets an error message and returns false indicating that the validation has failed.
   * Otherwise, it returns true indicating that the validation has passed.
   */
  validateReason() {
    if (this.newWfhRequestDetails.reason === '') {
      this.setErrorMessage('Reason cannot be empty!');
      return false;
    } else {
      return true;
    }
  }

  /**
   * The function "validateRequest()" checks if the date range, supervisor, and reason for the request are all valid.
   * If all three conditions are met, the function returns true, indicating that the request is valid.
   * Otherwise, it does not return anything.
   */
  validateRequest() {
    if (this.validateDateRange() && this.validateSupervisor() && this.validateReason()) {
      return true;
    }
  }

  /**
   * This function is called when a new work from home (WFH) request is being submitted.
   *  It first checks if the request is valid by calling the "validateRequest()" function.
   *  If the request is valid, the submitButtonClicked variable is set to true.
   *  Then, it calls the "createNewWfhRequest()" function of the wwtService (a service used for making HTTP requests)
   *  to submit the new WFH request details.
   *  If the request is successful (status code 200), the modal for creating a new WFH request is hidden,
   *  a success alert is displayed, the user's WFH requests are fetched again,
   *  and the newWfhRequestDetails object is reset to its initial state.
   *  If there is an error in the request, the submitButtonClicked variable is set to false,
   *  and the error message is set using the "setErrorMessage()" function.
   */
  applyNewWfhRequest() {
    if (this.validateRequest()) {
      this.submitButtonClicked = true;
      this.wwtService.createNewWfhRequest(this.newWfhRequestDetails)
        .subscribe((data: any) => {
        }, (error: HttpErrorResponse) => {
          this.submitButtonClicked = false;
          if (error.status === 200) {
            this.hideModal('createNewWfhRequestModal');
            this.communicationService.changerAlertDetails(
              true, CONSTANT.ALERTS.TYPES.SUCCESS, 'WFH Request Created Successfully!');
            this.fetchUserWFHRequests();
            this.newWfhRequestDetails = new NewWFHRequestPostBody(parseInt(localStorage.getItem('emp_db'), 0), -1,
              -1, new Date().toISOString().slice(0, 10), new Date().toISOString().slice(0, 10), 0, '', -1, '');
          } else {
            this.setErrorMessage(error.error);
          }
        });
    }
  }

  /**
   * This function checks if the start date of a new WFH (work from home) request is later than the end date.
   * If it is, it sets the end date to be the same as the start date.
   * This ensures that the date range for the request is valid and avoids any confusion or errors.
   */
  changeDateRangeOfNewRequest() {
    if (this.newWfhRequestDetails.startDate > this.newWfhRequestDetails.endDate) {
      this.newWfhRequestDetails.endDate = this.newWfhRequestDetails.startDate;
    }
  }

  /**
   * when validations failed error message will display for 4s and then disappear.
   * @param message
   */
  setErrorMessage(message: string) {
    this.validationErrorMessage = '*' + message;
    setTimeout(() => this.validationErrorMessage = '', 4000);
  }

  /**
   * when click on selected request to cancel that request assign its id to selectedRequestIdForCancel.
   * then confirmation modal wii display there
   * @param id
   */
  getConfirmationToCancelRequest(id: number) {
    this.selectedRequestIdForCancel = id;
    this.showModal('confirmationModalForGetAction');
  }

  /**
   * This function is called when an event occurs.
   * It checks if the event is true. If it is true, it calls a service method to cancel a work from home request made by an employee.
   * The request ID to be cancelled is passed as a parameter.
   *  If the cancellation is successful (HTTP status code 200),
   *  it fetches the updated list of work from home requests for the user and displays a success message.
   *  If there is an error, it displays a failure message.
   * @param event
   */
  cancelWfhRequestByEmployee(event: boolean) {
    if (event) {
      this.wwtService.cancelWfhRequestByEmployee(this.selectedRequestIdForCancel)
        .subscribe((data: any) => {
        }, (error: HttpErrorResponse) => {
          if (error.status === 200) {
            this.fetchUserWFHRequests();
            this.communicationService.changerAlertDetails(
              true, CONSTANT.ALERTS.TYPES.SUCCESS, error.error.text);
          } else {
            this.communicationService.changerAlertDetails(
              true, CONSTANT.ALERTS.TYPES.FAILED, error.error);
          }
        });
    }
  }
}
