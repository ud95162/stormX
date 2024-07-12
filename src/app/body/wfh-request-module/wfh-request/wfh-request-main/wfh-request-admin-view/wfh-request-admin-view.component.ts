import { Component, OnInit } from '@angular/core';
import {WorkFromHomeService} from '../../../../../service/work-from-home-services/work-from-home.service';
import {AssignedWFHRequestData} from '../../models/WFHRequestDetails';
import {GeneralOps} from '../../../../../utility/GeneralOps';
import {HttpErrorResponse} from '@angular/common/http';
import {CONSTANT} from '../../../../../utility/Constants';
import {
  InterCommunicationServiceService
} from '../../../../../service/support-services/inter-communication-service.service';
import {ModalUiServiceService} from '../../../../../service/ui-services/modal-ui-service.service';

@Component({
  selector: 'app-wfh-request-admin-view',
  templateUrl: './wfh-request-admin-view.component.html',
  styleUrls: ['./wfh-request-admin-view.component.css']
})
export class WfhRequestAdminViewComponent implements OnInit {

  generalOps = new GeneralOps();
  selectedApprovedStatus = 1;
  assignedWfhRequests: AssignedWFHRequestData[];
  assignedWfhRequestsDataLoaded = false;
  selectedRequestIdForDecline: number;

  constructor(private workFromHomeService: WorkFromHomeService,
              private communicationService: InterCommunicationServiceService,
              private modalService: ModalUiServiceService) { }

  ngOnInit() {
    this.getAssignedWfhRequests();
  }

  /**
   * This function is called "getAssignedWfhRequests"
   * and it is used to retrieve a list of work from home requests that have been assigned to the current user as a supervisor.
   *  The function starts by setting the "assignedWfhRequestsDataLoaded" variable to false,
   *  indicating that the data has not been loaded yet.
   *  Then, it calls the "getAssignedWfhRequestsAsSupervisor" method of the "workFromHomeService" service,
   *  passing in the "selectedApprovedStatus" as a parameter.
   *  This method is responsible for making an HTTP request to the server to fetch the assigned work from home requests.
   *  Once the response is received, the function subscribes to it
   *  and receives the data as an array of "AssignedWFHRequestData" objects. It assigns this data to the "assignedWfhRequests" variable.
   *  Finally, the "assignedWfhRequestsDataLoaded" variable is set to true, indicating that the data has been loaded successfully.
   */
  getAssignedWfhRequests() {
    this.assignedWfhRequestsDataLoaded = false;
    this.workFromHomeService.getAssignedWfhRequestsAsSupervisor(this.selectedApprovedStatus)
      .subscribe((data: AssignedWFHRequestData[]) => {
        this.assignedWfhRequests = data;
        this.assignedWfhRequestsDataLoaded = true;
      });
  }


  /**
   * when change status from radios it will assign status value to selectedApprovedStatus.
   * @param status (radios value)
   * after select one radio it will redirect to fetch data according to that filter
   */
  changeApprovedStatus(status: number) {
    this.selectedApprovedStatus = status;
    this.getAssignedWfhRequests();
  }

  /**
   * This method  updateApprovedStatusOnClick  is used to update the approved status of a work from home request when a user clicks on it.
   * It takes two parameters:  requestId  which is the ID of the request to be updated,
   * and  approvedStatus  which is the new approved status for the request.
   *  Inside the method, it calls the  updateApprovedStatusOfWfhRequest
   *  method of the  workFromHomeService  to make an API call and update the approved status of the request.
   *  It subscribes to the response of the API call and does not perform any action with the response data.
   *  If the API call is successful (status code 200), it displays a success alert message using the  communicationService
   *  and then calls the  getAssignedWfhRequests  method to fetch the updated list of assigned work from home requests.
   *  If the API call fails,
   *  it displays a failed alert message using the  communicationService  and shows the error message returned by the API call.
   * @param requestId
   * @param approvedStatus
   */
  updateApprovedStatusOnClick(requestId: number, approvedStatus: number) {
    this.workFromHomeService.updateApprovedStatusOfWfhRequest(requestId, approvedStatus)
      .subscribe((data: any) => {
      }, (error: HttpErrorResponse) => {
        if (error.status === 200) {
          this.communicationService.changerAlertDetails(
            true, CONSTANT.ALERTS.TYPES.SUCCESS, error.error.text);
          this.getAssignedWfhRequests();
        } else {
          this.communicationService.changerAlertDetails(
            true, CONSTANT.ALERTS.TYPES.FAILED, error.error);
        }
      });
  }

  getConfirmationToDeclineRequest(requestId: number) {
    this.selectedRequestIdForDecline = requestId;
    this.showModal('confirmationModalForGetAction');
  }

  showModal(modalId) {
    this.modalService.showModal(modalId);
  }

  hideModal(modalId: string) {
    this.modalService.hideModal(modalId);
  }

  declineWfhRequest(event: boolean) {
    if (event) {
      this.updateApprovedStatusOnClick(this.selectedRequestIdForDecline, 3);
    }
  }
}
