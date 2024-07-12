import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {Profile} from '../../../../../../_global/profile';

@Component({
  selector: 'app-medical-tab',
  templateUrl: './medical-tab.component.html',
  styleUrls: ['./medical-tab.component.css']
})
export class MedicalTabComponent implements OnInit {

  @Input() medicalDetails: any;
  @Input() employeeNo: any;
  @Output() success = new EventEmitter<string>();

  showEdit = false;

  dataLoaded = false;
  // added
  errorCode;
  errorType;
  errorMessage;

  constructor(private httpservice: ProfileUserServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.dataLoaded = this.medicalDetails.length !== 0;
    this.showEdit = this.employeeNo === Profile.EMPLOYEE_ID;
  }

  loadEmpPersonalMediData() {
    this.httpservice.loadEmpData(Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.medicalDetails = data[0].personalInformation.medical_details;
          this.dataLoaded = true;
        }
      );
  }

  onMedicalEdit() {
    const jsonPost = {
      'emp_no': Profile.EMPLOYEE_ID,
      'known_allergies': this.medicalDetails.known_allergies,
      'medication': this.medicalDetails.medication,
      'chronic_ailment': this.medicalDetails.chronic_ailment,
      'blood_type': this.medicalDetails.blood_type
    };
    this.httpservice.editPersonalDetailsMedi(jsonPost)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadEmpPersonalMediData();
            this.openErrorModal(101, 'SUCCESS', '');
            this.success.emit('complete');

          }
        }
      );
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
