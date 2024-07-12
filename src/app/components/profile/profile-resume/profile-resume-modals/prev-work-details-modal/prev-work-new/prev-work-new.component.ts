import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {SaveUpdatePreviousWorkDetail} from '../../../profile-resume-add-section/model/save-update-previous-work-detail.model';

@Component({
  selector: 'app-prev-work-new',
  templateUrl: './prev-work-new.component.html',
  styleUrls: ['./prev-work-new.component.css']
})
export class PrevWorkNewComponent implements OnInit {
  @Input() employeeNo: any;
  @Input() previousCompaniesList: any;
  @Input() previousJobRoleList: any;
  @Input() modalType: any;
  @Output() success = new EventEmitter<string>();

  errorCode;
  errorType;
  errorMessage;
  designation: any;
  companyName: any;
  fromDate: any;
  toDate: any;

  constructor(private httpservice: ProfileUserServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
  }

  savePreviousWorkDetail() {
    if (this.fromDate < this.toDate) {


      if (this.dis()) {
        alert('Please fill the required fields');
      } else {

        const saveUpdatePreviousWorkDetail: SaveUpdatePreviousWorkDetail = new SaveUpdatePreviousWorkDetail(
          0, this.designation, this.companyName, this.fromDate, this.toDate
        );

        this.httpservice.savePreviousWorkingDetail(saveUpdatePreviousWorkDetail)
          .subscribe(
            (data: any) => {
              if (data.httpStatusCode === 200) {
                this.designation = null;
                this.companyName = null;
                this.fromDate = null;
                this.toDate = null;
                this.openErrorModal(100, 'SUCCESS', '');
                this.interCommunicationServiceService.updateProfileContent(true);
                this.success.emit('complete');
              }
            }, error => {
              this.openErrorModal(1112, 'ERROR', 'Error saving previous work details');
            }
          );
      }
    } else {
      this.openErrorModal(1112, 'ERROR', 'End Date should be grater than start Date');
    }
  }

  // added
  dis() {

    return this.designation === '' || this.designation == null ||
      this.companyName === '' || this.companyName == null ||
      this.fromDate === '' || this.fromDate == null ||
      this.toDate === '' || this.toDate == null;

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
