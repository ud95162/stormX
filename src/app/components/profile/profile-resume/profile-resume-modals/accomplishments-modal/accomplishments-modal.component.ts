import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalUiServiceService} from '../../../../../service/ui-services/modal-ui-service.service';
import {AccomplishmentNewComponent} from './accomplishment-new/accomplishment-new.component';
import {AccomplishmentEditComponent} from './accomplishment-edit/accomplishment-edit.component';
import {ProfileUserServiceService} from "../../../../../service/profile-user-service.service";

@Component({
  selector: 'app-accomplishments-modal',
  templateUrl: './accomplishments-modal.component.html',
  styleUrls: ['./accomplishments-modal.component.css']
})
export class AccomplishmentsModalComponent implements OnInit {
  @Input() employeeNo: any;
  @Input() modalType: any;
  @Input() modalId: any;
  // @Input() accomplishmentInfo: any;
  @Input() accomplishmentDetailsToEdit: any;
  @Output() success = new EventEmitter<string>();
  @ViewChild(AccomplishmentNewComponent, {static: false}) accomplishmentsNew: AccomplishmentNewComponent;
  @ViewChild(AccomplishmentEditComponent, {static: false}) accomplishmentsEdit: AccomplishmentEditComponent;

  accomplishmentCategoryList: any;

  constructor(private httpservice: ProfileUserServiceService, private modalUiService: ModalUiServiceService) {
  }

  ngOnInit() {
      this.httpservice.getAccomplishmentCategories().subscribe((dataNew: any) => {
        this.accomplishmentCategoryList = dataNew;
      });
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }

  emitSuccess($event: string) {
    this.success.emit('complete');
  }

  saveAccomplishment() {
    const accomplishmentPostonFeed = (<HTMLInputElement>document.getElementById('accomplishmentPostonFeedCheck')).checked;
    if (this.modalType === 'new') {
      this.accomplishmentsNew.onSubmitAccomplishment(accomplishmentPostonFeed);
    } else {
      this.accomplishmentsEdit.onEditAccomplishment(accomplishmentPostonFeed);
    }
    this.hideModal('editAccomplishments');
  }

  deleteAccomplishment() {
    this.accomplishmentsEdit.onPostDelete();
    this.hideModal('editAccomplishments');
  }
}
