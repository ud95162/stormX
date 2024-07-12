import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {Profile} from '../../../../../_global/profile';
import {Search} from '../../../../../_global/search';
import {ProfileUserServiceService} from '../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../service/support-services/inter-communication-service.service';
import {ModalUiServiceService} from '../../../../../service/ui-services/modal-ui-service.service';

@Component({
  selector: 'app-profile-timeline-add-record-modal',
  templateUrl: './profile-timeline-add-record-modal.component.html',
  styleUrls: ['./profile-timeline-add-record-modal.component.css']
})
export class ProfileTimelineAddRecordModalComponent implements OnInit {

  @Output() successful = new EventEmitter();
  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/timeline/upload?emp_no=' + Profile.EMPLOYEE_ID;
  // imageUploadUrl = '119.235.9.12:7070/codegen/file/timeline/upload?emp_no=' + Profile.EMPLOYEE_ID;
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
  uploadedTimelinePicture;
  loadTimelinePicture = false;
  showUploaderNew = true;

  imageToEdit;
  showImagetoEdit;
  showUploaderEdit = false;

  timeLineTypeButton = 0;
  empId = Profile.EMPLOYEE_ID;
  searchEmpId = Search.SEARCH_EMPLOYEE_ID;
  userType = Profile.USER_TYPE;

  description: any;

  errorCode;
  errorType;
  errorMessage;
  // companyOrAccomplishmentType;

  selectedTimelineGroup: any = 'company';

  constructor(private httpservice: ProfileUserServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private modalUiService: ModalUiServiceService) {
  }

  ngOnInit() {
    // console.log('user type', this.userType)
  }



  // Image Upload

  uploadFinish(url, from) {
    const uploadedImage = url.serverResponse.response.body[0];
    switch (from) {
      case 'new':
        this.uploadedTimelinePicture = uploadedImage;
        this.loadTimelinePicture = true;
        this.showUploaderNew = false;
        break;
      case 'edit':
        this.imageToEdit = uploadedImage;
        this.showImagetoEdit = true;
        this.showUploaderEdit = false;
        break;
    }
  }

  deleteUploadedImage(from) {
    switch (from) {
      case 'new':
        this.uploadedTimelinePicture = null;
        this.loadTimelinePicture = false;
        this.showUploaderNew = true;
        break;
      case 'edit':
        this.imageToEdit = null;
        this.showImagetoEdit = false;
        this.showUploaderEdit = true;
        break;
    }
  }


  onTimelineSave() {
    const timelineTitle = (<HTMLInputElement>document.getElementById('input_timelineTitle')).value;
    const timelineDate = (<HTMLInputElement>document.getElementById('input_timelineDate')).value;
    // const timelineDescription = (<HTMLInputElement>document.getElementById('input_timelineDescription')).value;
    const timelineDescription = this.description;
    const timelineImage = this.uploadedTimelinePicture;

    let timelineType;
    let currentEmployeeId = this.empId;

    if (this.timeLineTypeButton === 1) {
      timelineType = 1; // personal
      currentEmployeeId = this.empId;
    } else {
      timelineType = 0; // company
      if (this.userType === '1' || this.userType === '5' || this.userType === '8' || this.userType === '18') {
        currentEmployeeId = this.searchEmpId;
        if (currentEmployeeId == null) {
          currentEmployeeId = this.empId;
        }
      }
    }


    if (timelineTitle === '' || timelineTitle === null || timelineDate === '' || timelineDate === null) {
      alert('Please fill the required fields');
    } else {

      const jsonPost = {
        'title': timelineTitle,
        'description': timelineDescription,
        'type': timelineType,
        'employeeNo': currentEmployeeId,
        'image': timelineImage,
        'date': timelineDate,
        'timelineGroup': this.selectedTimelineGroup
      };
      this.httpservice.saveTimelineRecord(jsonPost)
        .subscribe(
          (data: any) => {
            // console.log('Saved data', data);
            if (data.httpStatusCode === 200) {
              this.loadEmployeeTimeline();
              this.openErrorModal(100, 'SUCCESS', '');
              (<HTMLInputElement>document.getElementById('input_timelineTitle')).value = '';
              (<HTMLInputElement>document.getElementById('input_timelineDate')).value = '';
              // (<HTMLInputElement>document.getElementById('input_timelineDescription')).value = '';
              this.description = '';
              this.uploadedTimelinePicture = null;
              this.hideModal('addToTimelineModal');
              this.interCommunicationServiceService.updateProfileContent(true);
              this.successful.emit('success');
              // (<any>$('#addToTimelineModal')).modal('hide');
              // location.reload();
            }
            //  console.log(jsonPost);
          }
        );
    }
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }


  loadEmployeeTimeline() {
    // this.httpservice.loadEmpTimeline(this.employeeIdToLoad, Profile.EMPLOYEE_ID)
    //   .subscribe(
    //     (data: any) => {
    //       this.timelineArray = data;
    //       this.dataLoaded = true;
    //     }
    //   );
  }

}
