import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {SaveUpdatePreviousWorkDetail} from '../../../profile-resume-add-section/model/save-update-previous-work-detail.model';

@Component({
  selector: 'app-prev-work-edit',
  templateUrl: './prev-work-edit.component.html',
  styleUrls: ['./prev-work-edit.component.css']
})
export class PrevWorkEditComponent implements OnInit {
  @Input() employeeNo: any;
  @Input() prevWorkDetails: any;
  @Input() previousCompaniesList: any;
  @Input() previousJobRoleList: any;
  @Input() modalType: any;
  @Output() success = new EventEmitter<string>();

  errorCode;
  errorType;
  errorMessage;

  constructor(private httpservice: ProfileUserServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
  }

  editPrevWork() {
    if (this.prevWorkDetails.from_date < this.prevWorkDetails.to_date) {
      if (this.dis()) {
        alert('Please fill the required fields');
      } else {
        const saveUpdatePreviousWorkDetail = new SaveUpdatePreviousWorkDetail(this.prevWorkDetails.id, this.prevWorkDetails.title,
          this.prevWorkDetails.company, this.prevWorkDetails.from_date, this.prevWorkDetails.to_date);
        this.httpservice.editPreviousWorkingDetail(saveUpdatePreviousWorkDetail).subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              // this.loadingOverlayView = false;
              // this.showSuccessAlert = true;
              // this.loadEmpExperienceData();
              this.openErrorModal(101, 'SUCCESS', '');
              this.success.emit('complete');
            }
            // else if (data.httpStatusCode === 500) {
            //   this.showFailedAlert = true;
            // }
          }, error => {
            this.openErrorModal(1112, 'ERROR', 'Error updating previous work details');
          }
        );
      }
    }else {
      this.openErrorModal(1112, 'ERROR', 'End Date should be grater than start Date');
    }
  }

  delete() {
    this.httpservice.deletePreviousWorkingDetail(this.prevWorkDetails.id).subscribe(
      (data: any) => {
        if (data.httpStatusCode === 200) {
          // this.loadingOverlayView = false;
          // this.showSuccessAlert = true;
          this.openErrorModal(102, 'SUCCESS', '');
          this.success.emit('complete');
          this.interCommunicationServiceService.updateProfileContent(true);
          // this.loadEmpExperienceData();
        } else if (data.httpStatusCode === 500) {
          // this.showFailedAlert = true;
          this.openErrorModal(102, 'ERROR', 'Error deleting previous work');
        }
      }
    );
  }

  dis() {

    return this.prevWorkDetails.company === '' || this.prevWorkDetails.company == null ||
      this.prevWorkDetails.title === '' || this.prevWorkDetails.title == null ||
      this.prevWorkDetails.from_date === '' || this.prevWorkDetails.from_date == null ||
      this.prevWorkDetails.to_date === '' || this.prevWorkDetails.to_date == null;

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
