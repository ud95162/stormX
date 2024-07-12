import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GeneralOps} from "../../../../../utility/GeneralOps";
import {NewWFHRequestPostBody, WFHRequestDetails} from "../../models/WFHRequestDetails";
import {WorkFromHomeService} from "../../../../../service/work-from-home-services/work-from-home.service";
import {FileUploadServiceService} from "../../../../../service/support-services/file-upload-service.service";
import {ModalUiServiceService} from "../../../../../service/ui-services/modal-ui-service.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CONSTANT} from "../../../../../utility/Constants";
import {
  InterCommunicationServiceService
} from "../../../../../service/support-services/inter-communication-service.service";
import {Profile} from "../../../../../_global/profile";

@Component({
  selector: 'app-wfh-request-hr-view',
  templateUrl: './wfh-request-hr-view.component.html',
  styleUrls: ['./wfh-request-hr-view.component.css']
})
export class WfhRequestHrViewComponent implements OnInit {

  generalOps = new GeneralOps();
  selectedEmployeeId = 0;
  selectedApprovedStatus = 0;
  startDateForFetchRequest;
  endDateForFetchRequest;
  wfhRequests: WFHRequestDetails[];
  wfhRequestsDataLoaded = false;

  newWfhRequestDetails = new NewWFHRequestPostBody(this.selectedEmployeeId, -1,
    -1, new Date().toISOString().slice(0, 10), new Date().toISOString().slice(0, 10), 0, '', -1, '');
  validationErrorMessage = '';
  submitButtonClicked = false;

  // @ts-ignore
  @ViewChild('wfhRequestHrViewTable', {static: false}) wfhRequestReportGenerateTable: ElementRef;

  constructor(private workFromHomeService: WorkFromHomeService,
              private fileUploadServiceService: FileUploadServiceService,
              private modalService: ModalUiServiceService,
              private communicationService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    /**
     * at the initial stage set the start date as the 1st of day of current month
     * and set last date as the end date of current month.
     * new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) is the start date of month
     * but when convert to ISOString().slice(0,10) it will get the last date of previous month
     * so used as new Date(currentDate.getFullYear(), currentDate.getMonth(), 2).toISOString().slice(0, 10)
     * to get first date.
     * same as the last date.
     * new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0) gives the last date of current month.
     */
    const currentDate = new Date();
    this.startDateForFetchRequest = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2).toISOString().slice(0, 10);
    this.endDateForFetchRequest = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).toISOString().slice(0, 10);
    this.fetchWFHRequests();
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
    this.fetchWFHRequests();
  }

  /**
   * when change status from radios it will assign status value to selectedApprovedStatus.
   * @param status (radios value)
   * after select one radio it will redirect to fetch data according to that filter
   */
  changeApprovedStatus(status: number) {
    this.selectedApprovedStatus = status;
    this.fetchWFHRequests();
  }

  /**
   * This function fetches work from home (WFH) requests by calling the  getAllWfhRequestsDetails
   * method from the  workFromHomeService . It passes the  startDateForFetchRequest ,
   * endDateForFetchRequest , and  selectedApprovedStatus  as parameters to this method.
   *  Once the data is retrieved successfully, it assigns the response
   *  to the  wfhRequests  variable and sets the  wfhRequestsDataLoaded  flag to true.
   */
  fetchWFHRequests() {
    this.workFromHomeService.getAllWfhRequestsDetails(this.selectedEmployeeId,
      this.startDateForFetchRequest, this.endDateForFetchRequest, this.selectedApprovedStatus)
      .subscribe((data: WFHRequestDetails[]) => {
        this.wfhRequests = data;
        this.wfhRequestsDataLoaded = true;
      });
  }

  /**
   * The function first constructs a file name by concatenating the start and end dates of the WFH request with the phrase "WFH_Report_generatedByKRIYO".
   *  Then, it calls a service called "fileUploadServiceService" to export multiple data sets as an Excel file.
   *  The function passes the native element of a table (referred to as "wfhRequestReportGenerateTable")
   *  and the generated file name as parameters to this service.
   */
  downloadWFHRequest() {
    const fileName = this.startDateForFetchRequest + '_to_' + this.endDateForFetchRequest + '_WFH_Report_generatedByKRIYO';
    this.fileUploadServiceService.exportMultipleDataSetAsExcelFileForTable(this.wfhRequestReportGenerateTable.nativeElement, fileName);
  }

  setSelectedEmployeeData(data: any) {
    this.wfhRequestsDataLoaded = false;
    this.selectedEmployeeId = data !== null ? data.empID : 0;
    this.fetchWFHRequests();
  }

  showModal(modalId: string) {
    this.modalService.showModal(modalId);
  }

  hideModal(modalId: string) {
    this.modalService.hideModal(modalId);
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
    if (this.validateDateRange() && this.validateReason()) {
      return true;
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
   * This function is called when a new work from home (WFH) request is being submitted.
   *  It first checks if the request is valid by calling the "validateRequest()" function.
   *  If the request is valid, the submitButtonClicked variable is set to true.
   *  Then, it calls the "createNewWfhRequest()" function of the wwtService (a service used for making HTTP requests)
   *  to submit the new WFH request details.
   *  If the request is successful (status code 200), the modal for creating a new WFH request is hidden,
   *  a success alert is displayed, the user's WFH requests are fetched again,
   *  and the newWfhRequestDetails object is reset to its initial state.
   *  If there is an error in the request, the submitButtonClicked variable is set to false,
   *  and the error message set using the "setErrorMessage()" function.
   */
  applyNewWfhRequest() {
    if (this.validateRequest()) {
      this.newWfhRequestDetails.empProfileId = this.selectedEmployeeId;
      this.newWfhRequestDetails.createdBy = localStorage.getItem('emp_db');
      this.newWfhRequestDetails.userToken = Profile.USER_TOKEN;
      this.submitButtonClicked = true;
      this.workFromHomeService.createNewWfhRequestForOthers(this.newWfhRequestDetails)
        .subscribe((data: any) => {
        }, (error: HttpErrorResponse) => {
          this.submitButtonClicked = false;
          if (error.status === 200) {
            this.hideModal('createNewWfhRequestFromHRModal');
            this.communicationService.changerAlertDetails(
              true, CONSTANT.ALERTS.TYPES.SUCCESS, 'WFH Request Created Successfully!');
            this.fetchWFHRequests();
            this.newWfhRequestDetails = new NewWFHRequestPostBody(parseInt(localStorage.getItem('emp_db'), 0), -1,
              -1, new Date().toISOString().slice(0, 10), new Date().toISOString().slice(0, 10), 0, '', -1, '');
          } else {
            this.setErrorMessage(error.error);
          }
        });
    }
  }
}
