import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChild} from '@angular/core';
import {ModalUiServiceService} from '../../../../../service/ui-services/modal-ui-service.service';
import {EducationTabNewComponent} from './education-tab-new/education-tab-new.component';
import {EducationTabEditComponent} from './education-tab-edit/education-tab-edit.component';
import {OtherQualificationsTabNewComponent} from './other-qualifications-tab-new/other-qualifications-tab-new.component';
import {OtherQualificationsTabEditComponent} from './other-qualifications-tab-edit/other-qualifications-tab-edit.component';
import {Router} from "@angular/router";
import {InterCommunicationServiceService} from "../../../../../service/support-services/inter-communication-service.service";

@Component({
  selector: 'app-qualifications-modal',
  templateUrl: './qualifications-modal.component.html',
  styleUrls: ['./qualifications-modal.component.css']
})
export class QualificationsModalComponent implements OnInit {
  @Input() qualificationInfo: any;
  @Input() employeeNo: any;
  @Input() modalType: any;
  @Input() modalId: any;
  @Input() eduDetailsToEdit: any;
  @Input() qualDetailsToEdit: any
  @Output() success = new EventEmitter<string>();
  @ViewChild(EducationTabNewComponent, {static: false}) educationTabNew: EducationTabNewComponent;
  @ViewChild(EducationTabEditComponent, {static: false}) educationTabEdit: EducationTabEditComponent;
  @ViewChild(OtherQualificationsTabNewComponent, {static: false}) qualificationTabNew: OtherQualificationsTabNewComponent;
  @ViewChild(OtherQualificationsTabEditComponent, {static: false}) qualificationTabEdit: OtherQualificationsTabEditComponent;
  employeeNoForComponent;
  educationDetailsForComponent;
  otherQualificationDetailsForComponent;
  activeTab;
  activeTabEducation;
  activeTabOther: string;

  constructor(private modalUiService: ModalUiServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.employeeNoForComponent = this.qualificationInfo.empNo;
    // this.educationDetailsForComponent = this.qualificationInfo.employeeEducations;
    // this.otherQualificationDetailsForComponent = this.qualificationInfo.employeeQualifications;
  }

  // ngAfterViewInit() {
  //   this.activeTab = this.educationDetailsForComponent;
  //   if (this.activeTab === 'Education') {
  //     this.activeTabEducation = 'is-active';
  //   }else {
  //     this.activeTabOther = 'is-active';
  //   }
  // }

  onChangeTab(tabName) {
    this.activeTab = tabName;
    switch (tabName) {
      case 'Education' :
        this.activeTabEducation = 'is-active';
        this.activeTabOther = null;
        break;
      case 'Other' :
        this.activeTabEducation = null;
        this.activeTabOther = 'is-active';
        break;
    }
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }

  save(activeTab) {
    switch (activeTab) {
      case 'Education' :
        const educationPostonFeed = (<HTMLInputElement>document.getElementById('qualificationPostOnFeedCheck')).checked;
        if (this.modalType === 'new') {
          this.educationTabNew.onSubmitEducationBtnClick(educationPostonFeed);
        } else if (this.modalType === 'edit') {
          this.educationTabEdit.onPostEdit(educationPostonFeed);
        }
        break;
      case 'Other' :
        const qualificationPostonFeed = (<HTMLInputElement>document.getElementById('qualificationPostOnFeedCheck')).checked;
        if (this.modalType === 'new') {
          this.qualificationTabNew.onSubmitQualificationBtnClick(qualificationPostonFeed);
        } else if (this.modalType === 'edit') {
          this.qualificationTabEdit.onQualificationPostEdit();
        }
        break;
    }
    this.interCommunicationServiceService.updateProfileContent(true);
    this.hideModal('editQualifications');
  }

  emitSuccess($event: string) {
    this.success.emit('complete');
  }

  delete() {
    if (this.activeTab === 'Education') {
      this.educationTabEdit.onEducationDelete();
    } else {
      this.qualificationTabEdit.onQualificationPostDelete();
    }
    this.hideModal('editQualifications');
  }
}
