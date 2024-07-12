import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {ModalUiServiceService} from '../../../../../../service/ui-services/modal-ui-service.service';
import {Profile} from '../../../../../../_global/profile';

@Component({
  selector: 'app-personal-tab',
  templateUrl: './personal-tab.component.html',
  styleUrls: ['./personal-tab.component.css']
})
export class PersonalTabComponent implements OnInit {

  @Input() personalDetails: any;
  @Input() employeeNo: any;
  @Input() workDetails: any;
  @Output() success = new EventEmitter<string>();

  showEdit = false;
  dataLoaded = false;
  // profileDetails = [];
  profileDetailsEditList = [];
  religions = [];
  titles = [];
  maritalStatuses = [];
  previousMaritalStatus;
  designation;

  //added
  errorCode;
  errorType;
  errorMessage;

  constructor(private httpservice: ProfileUserServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private modalUiService: ModalUiServiceService) {
  }

  ngOnInit() {
    this.previousMaritalStatus = this.personalDetails.marital_status;
    this.designation = this.personalDetails.designation;
    // this.profileDetails = this.personalDetails.attributeValues;
    // this.dataLoaded = this.profileDetails.length !== 0;
    this.dataLoaded = this.personalDetails.id !== 0;
    this.showEdit = this.employeeNo === Profile.EMPLOYEE_ID;
    this.loadReligions();
    this.loadMaritalStatuses();
    this.loadTitles();
    this.profileDetailsEditList = this.personalDetails;
    // this.onEditPersonalDetails(this.profileDetails);
    this.onEditPersonalDetails(this.personalDetails);
  }

  loadEmpPersonalData() {
    this.httpservice.loadEmpData(Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          // this.profileDetails = data[0].personalInformation.personal_details.attributeValues;
          // this.profileDetails = data[0].personalInformation.personal_details;
          this.personalDetails = data[0].personalInformation.personal_details;
          // this.dataLoaded = data[0].personalInformation.personal_details.attributeValues.length !== 0;
          this.dataLoaded = data[0].personalInformation.personal_details.id !== 0;
        }
      );
  }

  onEditPersonalDetails(editArray) {
    this.profileDetailsEditList = editArray;
    // this.setEmployeeDetailsToEdit();
  }

  onPersonalEdit() {
    const jsonPost = {
      'title': this.personalDetails.title,
      'initials': this.personalDetails.initials,
      'fullName': this.personalDetails.full_name,
      'firstName': this.personalDetails.first_name,
      'lastName': this.personalDetails.last_name,
      'gender': this.personalDetails.gender,
      'dob': this.personalDetails.dob,
      'nic': this.personalDetails.nic,
      'passport': this.personalDetails.passport,
      'passportExpDate': this.personalDetails.passportExpDate,
      'maritalStatus': this.personalDetails.marital_status,
      'religion': this.personalDetails.religion,
      'foodPref': this.personalDetails.food_pref,
      'nationality': this.personalDetails.nationality,
      'drivingLicNo': this.personalDetails.drivingLicNo,
      'race': this.personalDetails.race,
      'previousMaritalStatus': this.previousMaritalStatus,
      'cadre' : this.workDetails.employee_type,
      'confirmationStatus': this.workDetails.confirmation_status,
      'designation': {
        'abbreviation': 'string',
        'band': 0,
        'category': {
          'desCategoryId': 0,
          'status': 0,
          'type': 'string'
        },
        'category_id': 0,
        'designation': this.designation,
        'designationCadre': 0,
        'designationGroup': 0,
        'designationGroupName': 'string',
        'id': 0,
        'status': 0
      }
    };
    this.httpservice.editPersonalDetails(jsonPost)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.openErrorModal(101, 'SUCCESS', '');
            this.loadEmpPersonalData();
            this.success.emit('complete');
          }
        }
      );
  }

  loadReligions() {
    this.httpservice.loadReligions()
      .subscribe(
        (data: any) => {
          this.religions = data;
        }, error => {
          console.log(error);
        }
      );
  }

  loadMaritalStatuses() {
    this.httpservice.loadMaritalStatuses()
      .subscribe(
        (data: any) => {
          this.maritalStatuses = data;
        }, error => {
          console.log(error);
        }
      );
  }

  loadTitles() {
    this.httpservice.loadTitles()
      .subscribe(
        (data: any) => {
          this.titles = data;
        }, error => {
          console.log(error);
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
