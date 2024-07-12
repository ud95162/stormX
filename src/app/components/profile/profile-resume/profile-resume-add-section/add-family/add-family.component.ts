import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../../../_global/profile';
import {ProfileUserServiceService} from '../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../service/support-services/inter-communication-service.service'

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.css']
})
export class AddFamilyComponent implements OnInit {
  loadingOverlayView = false;
  showFamilySuccessAlert = false;
  showFamilyFailedAlert = false;

//added
errorCode;
errorType;
errorMessage;

  constructor(private httpservice: ProfileUserServiceService,  private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
  }

  onSubmitFamily() {
    this.loadingOverlayView = true;
    const employeeid = Profile.EMPLOYEE_ID;
    const familyName = (<HTMLInputElement>document.getElementById('input_familyName')).value;
    const familyOccupation = (<HTMLInputElement>document.getElementById('input_familyOccupation')).value;
    const familyBond = (<HTMLInputElement>document.getElementById('input_familyBond')).value;

    if (familyName === '' || familyName === null) {
      alert('Please fill the required fields');
      this.loadingOverlayView = false;
    } else {
      const json = {
        'bond': familyBond,
        'name': familyName,
        'occupation': familyOccupation,
        'emp_no': employeeid
      };

      this.httpservice.saveFamilyMember(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.loadingOverlayView = false;
              this.showFamilySuccessAlert = true;
              this.openErrorModal(100, 'SUCCESS', '');
              (<HTMLInputElement>document.getElementById('input_familyName')).value = '';
              (<HTMLInputElement>document.getElementById('input_familyOccupation')).value = '';
              (<HTMLInputElement>document.getElementById('input_familyBond')).value = '';
            } else if (data.httpStatusCode === 500) {
              this.showFamilyFailedAlert = true;
            }
          }
        );
        this.httpservice.callMyMethod("Niroshan");
    }
  }

  familyWarningClose() {
    this.showFamilySuccessAlert = false;
    this.showFamilyFailedAlert = false;
  }
   ////added
   openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }
}
