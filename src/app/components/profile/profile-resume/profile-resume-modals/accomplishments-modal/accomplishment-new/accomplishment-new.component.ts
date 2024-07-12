import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {Router} from '@angular/router';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {environment} from "../../../../../../../environments/environment";
import {Profile} from "../../../../../../_global/profile";

@Component({
  selector: 'app-accomplishment-new',
  templateUrl: './accomplishment-new.component.html',
  styleUrls: ['./accomplishment-new.component.css']
})
export class AccomplishmentNewComponent implements OnInit {
  @Input() employeeNo: any;
  @Input() accomplishmentCategoryList: any;
  @Output() success = new EventEmitter<string>();
  accomplishmentList: any;
  // accomplishmentCategoryList: any;
  accomplishmentName = null;
  issuer: any;
  accomplishmentFromDate = null;
  accomplishmentToDate = null;
  isOngoing = false;
  description: any;
  image: any;
  categoryID: 0;
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


  errorCode;
  errorType;
  errorMessage;

  constructor(private httpservice: ProfileUserServiceService, public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.loadList();
    // this.loadAccomplishmentCategories();
  }

  loadList() {
    this.httpservice.loadAllAccomplishments()
      .subscribe(
        (data: any) => {
          this.accomplishmentList = data;
        }
      );
  }

  // loadAccomplishmentCategories() {
  //   this.httpservice.getAccomplishmentCategories().subscribe((dataNew: any) => {
  //     this.accomplishmentCategoryList = dataNew;
  //   });
  // }

  onSubmitAccomplishment(accomplishmentPostonFeed) {
    if (this.accomplishmentName === '' || this.accomplishmentName === null || this.accomplishmentFromDate === '' ||
      this.accomplishmentFromDate === null || this.categoryID === undefined || this.categoryID === 0 ) {
      alert('Please fill the required fields');
    } else {
      const json = {
        'accomplishment': this.accomplishmentName,
        'issuer': this.issuer,
        'fromDate': this.accomplishmentFromDate,
        'toDate': this.accomplishmentToDate,
        'isOngoing': this.isOngoing,
        'description': this.description,
        'saveToFeed': accomplishmentPostonFeed,
        'image': this.image,
        'categoryID': this.categoryID
      };

      console.log(json);
      this.httpservice.saveAccomplishment(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.openErrorModal(100, 'SUCCESS', '');
              this.success.emit('complete');
              this.accomplishmentName = null;
              this.issuer = null;
              this.accomplishmentFromDate = null;
              this.accomplishmentToDate = null;
              this.isOngoing = false;
              this.description = null;
              this.categoryID = 0;
              this.interCommunicationServiceService.updateProfileContent(true);
            }
          }, error => {
            this.openErrorModal(1112, 'ERROR', 'Error saving accomplishment');
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
    console.log('IMAGE URL', url)
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
