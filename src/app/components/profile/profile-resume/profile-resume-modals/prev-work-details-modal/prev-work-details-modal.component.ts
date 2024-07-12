import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PrevWorkNewComponent} from './prev-work-new/prev-work-new.component';
import {PrevWorkEditComponent} from './prev-work-edit/prev-work-edit.component';
import {ModalUiServiceService} from '../../../../../service/ui-services/modal-ui-service.service';
import {AddPreviousWorkDetailPreloadData} from '../../profile-resume-add-section/model/add-previous-work-detail-preload-data.model';
import {ProfileUserServiceService} from '../../../../../service/profile-user-service.service';

@Component({
  selector: 'app-prev-work-details-modal',
  templateUrl: './prev-work-details-modal.component.html',
  styleUrls: ['./prev-work-details-modal.component.css']
})
export class PrevWorkDetailsModalComponent implements OnInit {
  @Input() employeeNo: any;
  @Input() modalType: any;
  @Input() modalId: any;
  @Input() prevWorkDetailsToEdit: any;
  @Output() success = new EventEmitter<string>();
  @ViewChild(PrevWorkNewComponent, {static: false}) prevWorkNew: PrevWorkNewComponent;
  @ViewChild(PrevWorkEditComponent, {static: false}) prevWorkEdit: PrevWorkEditComponent;

  addPreviousWorkDetailPreloadData: AddPreviousWorkDetailPreloadData;
  previousCompaniesList: string[];
  previousJobRoleList: string[];

  constructor(private httpservice: ProfileUserServiceService,
              private modalUiService: ModalUiServiceService) {
  }

  ngOnInit() {
    this.httpservice.loadAddPreviousWorkDetailPreloadData().subscribe(
      (data: any) => {
        this.addPreviousWorkDetailPreloadData = data;
        this.previousCompaniesList = this.addPreviousWorkDetailPreloadData.previousCompaniesList;
        this.previousJobRoleList = this.addPreviousWorkDetailPreloadData.previousJobRoleList;
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

  save() {
    if (this.modalType === 'new') {
      this.prevWorkNew.savePreviousWorkDetail();
    } else {
      this.prevWorkEdit.editPrevWork();
    }
    this.hideModal('editPrevWorkDetails');
  }

  deletePrevWork() {
    this.prevWorkEdit.delete();
    this.hideModal('editPrevWorkDetails');
  }
}
