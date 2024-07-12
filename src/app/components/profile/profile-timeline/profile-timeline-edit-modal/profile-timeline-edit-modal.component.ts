import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
import {environment} from "../../../../../environments/environment";
import {Profile} from "../../../../_global/profile";
import {ProfileUserServiceService} from "../../../../service/profile-user-service.service";
import {InterCommunicationServiceService} from "../../../../service/support-services/inter-communication-service.service";

@Component({
  selector: 'app-profile-timeline-edit-modal',
  templateUrl: './profile-timeline-edit-modal.component.html',
  styleUrls: ['./profile-timeline-edit-modal.component.css']
})
export class ProfileTimelineEditModalComponent implements OnChanges {

  @Input() timelineInstanceData;
  @Input() editIdClicked;
  @Output() successful = new EventEmitter();

  companyOrAccomplishmentType;

  imageToEdit;
  showImagetoEdit;
  showUploaderEdit = false;

  uploadedTimelinePicture;
  loadTimelinePicture = false;
  showUploaderNew = true;

  errorCode;
  errorType;
  errorMessage;

  editTimelineId;
  editTimelineTitle;
  editTimelineDesc;
  editTimelineDate;
  editTimelineImage;

  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/timeline/upload?emp_no=' + Profile.EMPLOYEE_ID;
  uploadImageSize = environment.POST_IMAGE_SIZE;

  constructor(private modalUiService: ModalUiServiceService,
              private httpservice: ProfileUserServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService) { }

  ngOnChanges() {
    // console.log('edit on changes');
    // console.log(this.interCommunicationServiceService.profileTimelineData);
  }

  getData(data) {
    console.log(data);
  }

  instanceType(event) {
    this.timelineInstanceData.group = event.target.value;
  }


  deleteUploadedImage(from) {
    switch (from) {
      case 'new':
        this.uploadedTimelinePicture = null;
        this.loadTimelinePicture = false;
        this.showUploaderNew = true;
        break;
      case 'edit':
        this.timelineInstanceData.image = null;
        this.showImagetoEdit = false;
        this.showUploaderEdit = true;
        break;
    }
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
        this.timelineInstanceData.image = uploadedImage;
        this.showImagetoEdit = true;
        this.showUploaderEdit = false;
        break;
    }
  }

  onTimelinePostEdit() {
    // console.log(this.editTimelineId)
    const timelineImage = this.imageToEdit;
    const timelineType = 0;

    if (this.timelineInstanceData.title === '' || this.timelineInstanceData.title === null || this.timelineInstanceData.date === '' ||
      this.timelineInstanceData.date === null) {
      alert('Please fill the required fields');
    } else {
      const jsonPost = {
        'timeLineId': this.timelineInstanceData.id,
        'title': this.timelineInstanceData.title,
        'date': this.timelineInstanceData.date,
        'description': this.timelineInstanceData.description,
        'image': this.timelineInstanceData.image,
        'type': timelineType,
        'reason': '',
        'timelineGroup' : this.timelineInstanceData.group
      };
      console.log(jsonPost)
      this.httpservice.editTimelineRecord(jsonPost)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              // console.log(data)
              this.openErrorModal(100, 'SUCCESS', '');

              // this.loadEmployeeTimeline();
              this.interCommunicationServiceService.updateProfileContent(true);
              this.successful.emit('success');
            }
          }
        );
    }
    this.hideModal('editTimeline');
  }
  onTimelinePostDelete() {
    this.httpservice.deleteTimelineRecord(this.timelineInstanceData.id)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.openErrorModal(100, 'SUCCESS', '');
            // this.loadEmployeeTimeline();
            this.interCommunicationServiceService.updateProfileContent(true);
            this.successful.emit('success');
          }
        }
      );
    this.hideModal('editTimeline');
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
    // console.log(this.editTimelineId)
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }
}
