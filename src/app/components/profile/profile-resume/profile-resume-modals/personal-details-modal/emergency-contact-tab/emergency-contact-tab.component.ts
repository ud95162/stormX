import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from "../../../../../../service/profile-user-service.service";
import {Profile} from "../../../../../../_global/profile";
import {InterCommunicationServiceService} from "../../../../../../service/support-services/inter-communication-service.service";

@Component({
  selector: 'app-emergency-contact-tab',
  templateUrl: './emergency-contact-tab.component.html',
  styleUrls: ['./emergency-contact-tab.component.css']
})
export class EmergencyContactTabComponent implements OnInit {

  @Input() employeeNo;
  @Input() contactDetails;

  @Output() success = new EventEmitter<string>();

  errorCode;
  errorType;
  errorMessage;

  dataLoaded =  false;
  constructor(private httpService: ProfileUserServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService) { }

  ngOnInit() {
  }


  loadEmergencyContactDetails() {
    this.httpService.loadEmpData(Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.contactDetails = data[0].personalInformation.emergencyContact;
          this.dataLoaded = true;
        }
      );
  }

  onEmergencyContactEdit() {
    const requestBody = {
        empID: localStorage.getItem('emp_db'),
        guardianName: this.contactDetails.guardianName,
        guardianAddress: this.contactDetails.guardianAddress,
        guardianPhoneNo: this.contactDetails.guardianPhoneNo,
        relationship: this.contactDetails.relationship
      };

    this.httpService.saveEmployeeEmergencyContactDetails(requestBody)
      .subscribe( (data: any) => {
        if (data.httpStatusCode === 200) {
          this.loadEmergencyContactDetails();
          this.openErrorModal(101, 'SUCCESS', '');
          this.success.emit('complete');
        }
      });
  }

// added
  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

}
