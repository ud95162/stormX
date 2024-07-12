import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {Profile} from '../../../../../../_global/profile';
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-other-qualifications-tab-edit',
  templateUrl: './other-qualifications-tab-edit.component.html',
  styleUrls: ['./other-qualifications-tab-edit.component.css']
})
export class OtherQualificationsTabEditComponent implements OnInit {
  @Input() qualificationDetails: any;
  @Input() employeeNo: any;
  @Output() success = new EventEmitter<string>();

  qualificationList;
  loadingOverlayView = false;

  showQualificationSuccessAlert = false;
  showQualificationFailedAlert = false;
  dataLoaded = false;
  errorCode;
  errorType;
  errorMessage;
  private showEdit: boolean;
  showImage;
  showUploader;
  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/timeline/upload?emp_no=' + Profile.EMPLOYEE_ID;
  uploadImageSize = environment.POST_IMAGE_SIZE;
  customStyle = {
    selectButton: {
      'background-color': 'transparent',
      'border-radius': '25px',
      'color': '#333333',
      'box-shadow': 'none',
      'margin': '0'
    },
    clearButton: {
      'display': 'none'
    },
    layout: {
      'background-color': 'transparent',
      'color': '#838383',
      'font-size': '10px !important',
      'width': '100%',
      'font-family': 'roboto'
    },
    previewPanel: {
      'display': 'none'
    }
  };

  constructor(private httpservice: ProfileUserServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    if (this.qualificationDetails.length === 0) {
      this.dataLoaded = false;
    } else {
      this.dataLoaded = true;
    }
    if (this.employeeNo === Profile.EMPLOYEE_ID) {
      this.showEdit = true;
    } else {
      this.showEdit = false;
    }
    this.loadList();
  }

  loadEmpQualificationData() {
    this.httpservice.loadEmpData(Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.qualificationDetails = data[0].educationInformation.employeeQualifications;
          if (this.qualificationDetails.length === 0) {
            this.dataLoaded = false;
          } else {
            this.dataLoaded = true;
          }
        }
      );
  }

  loadList() {
    this.httpservice.loadAllQualifications()
      .subscribe(
        (data: any) => {
          this.qualificationList = data;
        }
      );

  }

  onQualificationPostEdit() {
    const json = {
      'id': this.qualificationDetails.id,
      'qualificationName': this.qualificationDetails.name,
      'issuer': this.qualificationDetails.issuer,
      'date': this.qualificationDetails.date,
      'results': this.qualificationDetails.results,
      'description': this.qualificationDetails.description,
      'reason': '',
      'image': this.qualificationDetails.image
    };

    this.httpservice.editQualification(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.openErrorModal(101, 'SUCCESS', '');
          }
          this.success.emit('complete');
        }, error => {
          this.openErrorModal(1112, 'ERROR', 'Error updating qualifications');
        }
      );
  }

  onQualificationPostDelete() {
    const qualificationID = this.qualificationDetails.id;

    this.httpservice.deleteQualification(qualificationID)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.openErrorModal(102, 'SUCCESS', '');
            this.loadEmpQualificationData();
            this.success.emit('complete');
            this.interCommunicationServiceService.updateProfileContent(true);
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
  // Image Upload
  uploadFinish(url) {
    const uploadedImage = url.serverResponse.response.body[0];
    this.qualificationDetails.image = uploadedImage;
    this.showImage = true;
    this.showUploader = false;
  }

  deleteUploadedImage() {
    this.qualificationDetails.image = null;
    this.showImage = false;
    this.showUploader = true;
  }

}
