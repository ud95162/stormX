import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Profile} from '../../../../_global/profile';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
import {environment} from "../../../../../environments/environment";
import {ProfileUserServiceService} from "../../../../service/profile-user-service.service";
import {InterCommunicationServiceService} from "../../../../service/support-services/inter-communication-service.service";

// import {getDayOfWeek} from 'ngx-bootstrap/chronos/units/day-of-week';

@Component({
  selector: 'app-profile-timeline-card',
  templateUrl: './profile-timeline-card.component.html',
  styleUrls: ['./profile-timeline-card.component.css']
})
export class ProfileTimelineCardComponent implements OnChanges,OnInit {

  date;
  milestones;
  description;
  dayOfWeek;
  month;
  mothDay;
  likeCount;
  instanceImage;
  instanceTitle;
  instanceId;

  editTimelineId;
  editTimelineTitle;
  editTimelineDesc;
  editTimelineDate;
  editTimelineImage;

  imageToEdit;
  showImagetoEdit;
  showUploaderEdit = false;

  uploadedTimelinePicture;
  loadTimelinePicture = false;
  showUploaderNew = true;

  errorCode;
  errorType;
  errorMessage;

  companyOrAccomplishmentType;
  userType = Profile.USER_TYPE;

  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/timeline/upload?emp_no=' + Profile.EMPLOYEE_ID;
  uploadImageSize = environment.POST_IMAGE_SIZE;

  @Input() timelineData: JSON;
  @Output() myEvent = new EventEmitter();
  @Output() emitIdEvent = new EventEmitter();
  group: any;
  editTimelineData = {
    id: '',
    group: '',
    title: '',
    date: '',
    description: '',
    image: ''
  };
  showEdit = false;

  constructor(private modalUiService: ModalUiServiceService,
              private httpservice: ProfileUserServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    if (this.userType === '1' || this.userType === '5' || this.userType === '8' || this.userType === '18') {
      this.showEdit = true;
    }
    // console.log('SHOW EDIT', this.showEdit)
  }

  ngOnChanges() {
    if (this.timelineData == null) {

    } else {

      this.date = this.timelineData['date'];
      this.milestones = this.timelineData['milestones'];
      this.description = this.milestones[0]['description'];
      this.likeCount = this.milestones[0]['likeCount'];
      this.instanceTitle = this.milestones[0]['title'];
      this.group = this.milestones[0]['type'];
      this.instanceId = this.milestones[0]['id'];
      this.dayOfWeek = this.getDayOfWeek(this.date);
      this.mothDay = this.date.substring(8, 10);

      if (this.milestones[0]['image'] !== undefined) {
        this.instanceImage = this.milestones[0]['image'];
      } else {
        this.instanceImage = './assets/images/winner-cup.png';
      }
      this.month = this.getMonth(this.date);
    }

  }

  instanceType(event) {
    this.companyOrAccomplishmentType = event.target.value;
  }

  onTimelinePostDelete() {
    this.httpservice.deleteTimelineRecord(this.instanceId )
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {

            this.openErrorModal(102, 'DELETE', '');
            // this.loadEmployeeTimeline();
            this.interCommunicationServiceService.updateProfileContent(true);
            // this.successful.emit('success');
          }
        }
      );
    this.hideModal('editTimeline');
  }

  getMonth(date) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const d = new Date(date);
    // document.write("Th/**/e current month is " + monthNames[d.getMonth()]);
    return monthNames[d.getMonth()];
  }

  getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

  showSaveQuoteModal(modalId) {
    this.interCommunicationServiceService.editProfileTimelineInstance(this.milestones[0]);
    // console.log(this.interCommunicationServiceService.profileTimelineData);
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  emitId(instanceId) {
    // console.log('emitted id', instanceId)
    this.emitIdEvent.emit(instanceId);
  }
}
