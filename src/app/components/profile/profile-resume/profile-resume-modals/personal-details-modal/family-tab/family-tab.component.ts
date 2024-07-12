import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {Profile} from '../../../../../../_global/profile';

@Component({
  selector: 'app-family-tab',
  templateUrl: './family-tab.component.html',
  styleUrls: ['./family-tab.component.css']
})
export class FamilyTabComponent implements OnInit {

  @Input() familyDetails: any;
  @Input() employeeNo: any;
  @Output() success = new EventEmitter<string>();

  showEdit = false;

  dataLoaded = false;
  familyMemberid = null;
  familyMemName = null;
  familyMemBond = null;
  familyMemOccupation = null;
  // added
  errorCode;
  errorType;
  errorMessage;

  myMethodSubs: Subscription; // added

  loadingOverlayView = false;
  showFamilySuccessAlert = false;
  showFamilyFailedAlert = false;

  constructor(private httpservice: ProfileUserServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.loadEmpFamilyData();
    // });
    this.dataLoaded = this.familyDetails.length !== 0;
    this.showEdit = this.employeeNo === Profile.EMPLOYEE_ID;
  }

  loadEmpFamilyData() {
    this.httpservice.loadEmpData(Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.familyDetails = data[0].personalInformation.family_details;
          this.dataLoaded = this.familyDetails.length !== 0;
        }
      );
  }

  onFamilyEdit() {
    const json = {
      'id': this.familyMemberid,
      'emp_no': Profile.EMPLOYEE_ID,
      'bond': this.familyMemBond,
      'name': this.familyMemName,
      'occupation': this.familyMemOccupation
    };

    this.httpservice.editFamilyMember(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadEmpFamilyData();
            // this.openErrorModal(101, 'SUCCESS', '');
            this.familyMemName = '';
            this.familyMemBond = '';
            this.familyMemOccupation = '';
            this.familyMemberid = '';
            this.success.emit('complete');

          } else if (data.httpStatusCode === 500) {
          }
        }
      );
  }

  onFamilyPostDelete(i: number) {
    const familyID = this.familyDetails[i].id;
    this.httpservice.deleteFamilyMember(familyID)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadEmpFamilyData();
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

  onEditClick(i: number) {
    this.familyMemName = this.familyDetails[i].name;
    this.familyMemBond = this.familyDetails[i].bond;
    this.familyMemOccupation = this.familyDetails[i].occupation;
    this.familyMemberid = this.familyDetails[i].id;
  }

// ***************add new family member****************

  onAddNewFamilyMemberClick() {

    this.loadingOverlayView = true;
    if (this.familyMemName === '' || this.familyMemName === null) {
      alert('Please fill the required fields');
      this.loadingOverlayView = false;
    } else {
      const json = {
        'bond': this.familyMemBond,
        'name': this.familyMemName,
        'occupation': this.familyMemOccupation,
        'emp_no': Profile.EMPLOYEE_ID
      };

      this.httpservice.saveFamilyMember(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.familyMemName = '';
              this.familyMemBond = '';
              this.familyMemOccupation = '';
              this.loadEmpFamilyData();
            } else if (data.httpStatusCode === 500) {
              this.showFamilyFailedAlert = true;
            }
          }
        );
    }

  }

  saveFamily() {
    this.loadingOverlayView = true;
    if (this.familyMemName === '' || this.familyMemName === null) {
      alert('Please fill the required fields');
      this.loadingOverlayView = false;
    } else {
      const json = {
        'bond': this.familyMemBond,
        'name': this.familyMemName,
        'occupation': this.familyMemOccupation,
        'emp_no': Profile.EMPLOYEE_ID
      };

      this.httpservice.saveFamilyMember(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.loadingOverlayView = false;
              this.showFamilySuccessAlert = true;
              this.openErrorModal(100, 'SUCCESS', '');
              this.familyMemName = '';
              this.familyMemBond = '';
              this.familyMemOccupation = '';
              this.loadEmpFamilyData();
              this.success.emit('complete');
              this.interCommunicationServiceService.updateProfileContent(true);
            } else if (data.httpStatusCode === 500) {
              this.showFamilyFailedAlert = true;
            }
          }
        );
    }
  }

  familyWarningClose() {
    this.showFamilySuccessAlert = false;
    this.showFamilyFailedAlert = false;
  }

}
