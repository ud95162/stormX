import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {environment} from '../../../../../../../environments/environment';
import {Profile} from '../../../../../../_global/profile';

@Component({
  selector: 'app-other-qualifications-tab-new',
  templateUrl: './other-qualifications-tab-new.component.html',
  styleUrls: ['./other-qualifications-tab-new.component.css']
})
export class OtherQualificationsTabNewComponent implements OnInit {
  @Input() qualificationDetails: any;
  @Input() employeeNo: any;
  @Output() success = new EventEmitter<string>();

  qualificationList;
  loadingOverlayView = false;

  showQualificationSuccessAlert = false;
  showQualificationFailedAlert = false;

  errorCode;
  errorType;
  errorMessage;

  qualName= null;
  issuer= null;
  results= null;
  qualdate= null;
  description;
  image;
  showImage = false;
  showUploader = true;
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
    this.loadList();
  }

  loadList() {
    this.httpservice.loadAllQualifications()
      .subscribe(
        (data: any) => {
          this.qualificationList = data;
        }
      );
  }

  onSubmitQualificationBtnClick(qualificationPostonFeed) {
    if (this.qualName === '' || this.qualName === null || this.issuer === '' || this.issuer === null ||
      this.qualdate === '' || this.qualdate === null) {
      alert('Please fill the required fields');
      this.loadingOverlayView = false;
    } else {
      const json = {
        'qualificationName': this.qualName,
        'issuer': this.issuer,
        'date': this.qualdate,
        'results': this.results,
        'description': this.description,
        'saveToFeed': qualificationPostonFeed,
        'image': this.image
      };

      this.httpservice.saveQualification(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.openErrorModal(100, 'SUCCESS', '');
              this.issuer = null;
              this.qualdate = null;
              this.results = null;
              this.description = null;
              this.image = null;
              this.showImage = false;
              this.success.emit('complete');
            }
          }, error => {
            this.openErrorModal(1112, 'ERROR', 'Error saving qualifications');
          }
        );
    }
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
    this.image = uploadedImage;
    this.showImage = true;
    this.showUploader = false;
  }

  deleteUploadedImage() {
    this.image = null;
    this.showImage = false;
    this.showUploader = true;
  }
}
