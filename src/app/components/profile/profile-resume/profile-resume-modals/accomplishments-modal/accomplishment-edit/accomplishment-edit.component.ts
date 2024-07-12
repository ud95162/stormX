import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {Router} from '@angular/router';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {environment} from "../../../../../../../environments/environment";
import {Profile} from "../../../../../../_global/profile";

@Component({
  selector: 'app-accomplishment-edit',
  templateUrl: './accomplishment-edit.component.html',
  styleUrls: ['./accomplishment-edit.component.css']
})
export class AccomplishmentEditComponent implements OnInit {
  @Input() employeeNo: any;
  @Input() accomplishmentDetails: any;
  @Input() accomplishmentCategoryList: any;
  @Output() success = new EventEmitter<string>();
  accomplishmentList: any;
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
  errorCode;
  errorType;
  errorMessage;

  constructor(private httpservice: ProfileUserServiceService, public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    console.log('accomplishmentDetails', this.accomplishmentDetails);
    this.loadList();
  }

  loadList() {
    this.httpservice.loadAllAccomplishments()
      .subscribe(
        (data: any) => {
          this.accomplishmentList = data;
        }
      );
  }

  onEditAccomplishment(accomplishmentPostonFeed) {
    const jsonPost = {
      'id': this.accomplishmentDetails.id,
      'accomplishment': this.accomplishmentDetails.accomplishment,
      'issuer': this.accomplishmentDetails.issuer,
      'fromDate': this.accomplishmentDetails.fromDate,
      'toDate': this.accomplishmentDetails.toDate,
      'isOngoing': this.accomplishmentDetails.isOngoing,
      'description': this.accomplishmentDetails.description,
      'reason': '',
      'saveToFeed': accomplishmentPostonFeed,
      'image': this.accomplishmentDetails.image,
      'categoryID': this.accomplishmentDetails.categoryID
    };
    console.log('edit', jsonPost)
    this.httpservice.editAccomplishment(jsonPost)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            // this.loadEmpAccomplishmentData();
            this.openErrorModal(101, 'SUCCESS', '');
          }
        }, error => {
          this.openErrorModal(1112, 'ERROR', 'Error updating accomplishment');
        }
      );
  }

  onPostDelete() {
    const accomplishmentID = this.accomplishmentDetails.id;
    this.httpservice.deleteAccomplishment(accomplishmentID)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            // this.loadEmpAccomplishmentData();
            this.openErrorModal(102, 'SUCCESS', '');
            this.success.emit('complete');
            this.interCommunicationServiceService.updateProfileContent(true);
          } else if (data.httpStatusCode === 500) {
            this.openErrorModal(102, 'ERROR', 'Error deleting accomplishment');
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
    this.accomplishmentDetails.image = uploadedImage;
    this.showImage = true;
    this.showUploader = false;
  }

  deleteUploadedImage() {
    this.accomplishmentDetails.image = null;
    this.showImage = false;
    this.showUploader = true;
  }

}
