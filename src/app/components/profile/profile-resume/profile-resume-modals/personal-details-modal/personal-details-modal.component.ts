import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalUiServiceService} from '../../../../../service/ui-services/modal-ui-service.service';
import {ProfileUserServiceService} from '../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../service/support-services/inter-communication-service.service';
import {PersonalTabComponent} from './personal-tab/personal-tab.component';
import {MedicalTabComponent} from './medical-tab/medical-tab.component';
import {ContactTabComponent} from './contact-tab/contact-tab.component';
import {FamilyTabComponent} from './family-tab/family-tab.component';
import {EmergencyContactTabComponent} from "./emergency-contact-tab/emergency-contact-tab.component";

@Component({
  selector: 'app-personal-details-modal',
  templateUrl: './personal-details-modal.component.html',
  styleUrls: ['./personal-details-modal.component.css']
})
export class PersonalDetailsModalComponent implements OnInit {
  @ViewChild(PersonalTabComponent, {static: false}) personalTab: PersonalTabComponent;
  @ViewChild(FamilyTabComponent, {static: false}) FamilyTab: FamilyTabComponent;
  @ViewChild(ContactTabComponent, {static: false}) contactTab: ContactTabComponent;
  @ViewChild(MedicalTabComponent, {static: false}) medicalTab: MedicalTabComponent;
  @ViewChild(EmergencyContactTabComponent, {static: false}) emergencyTab: EmergencyContactTabComponent;
  @Input() personalInfo: any;
  @Input() employeeNo: any;
  @Input() workDetails: any;
  @Output() success = new EventEmitter<string>();

  showEdit = false;
  dataLoaded = false;
  profileDetails = [];
  profileDetailsEditList = [];
  religions = [];
  titles = [];
  maritalStatuses = [];

  //added
  errorCode;
  errorType;
  errorMessage;
  activeTabPersonal = 'is-active';
  activeTabFamily = null;
  activeTabContact = null;
  activeTabMedical = null;
  activeTabEmergency = null;
  activeTab = 'Personal';

  constructor(private httpservice: ProfileUserServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private modalUiService: ModalUiServiceService) {
  }

  ngOnInit() {
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
    if (this.activeTab === 'Family') {
      this.interCommunicationServiceService.updateProfileContent(true);
      this.emitSuccess('complete');
    }
  }

  onChangeTab(tabName) {
    this.activeTab = tabName;
    switch (tabName) {
      case 'Personal' :
        this.activeTabPersonal = 'is-active';
        this.activeTabFamily = null;
        this.activeTabContact = null;
        this.activeTabMedical = null;
        this.activeTabEmergency = null;
        break;
      case 'Family' :
        this.activeTabPersonal = null;
        this.activeTabFamily = 'is-active';
        this.activeTabContact = null;
        this.activeTabMedical = null;
        this.activeTabEmergency = null;
        break;
      case 'Contact' :
        this.activeTabPersonal = null;
        this.activeTabContact = 'is-active';
        this.activeTabFamily = null;
        this.activeTabMedical = null;
        this.activeTabEmergency = null;
        break;
      case 'Emergency' :
        this.activeTabPersonal = null;
        this.activeTabContact = null;
        this.activeTabFamily = null;
        this.activeTabMedical = null;
        this.activeTabEmergency = 'is-active';
        break;
      case 'Medical' :
        this.activeTabPersonal = null;
        this.activeTabMedical = 'is-active';
        this.activeTabFamily = null;
        this.activeTabContact = null;
        this.activeTabEmergency = null;
        break;
    }
  }

  save(activeTab: string) {
    switch (activeTab) {
      case 'Personal' :
        this.personalTab.onPersonalEdit();
        this.hideModal('editPersonalDetails');
        break;
      case 'Family':
        if (this.FamilyTab.familyMemberid === null) {
          this.FamilyTab.saveFamily();
        } else {
          this.FamilyTab.onFamilyEdit();
        }
        break;
      case 'Contact':
        this.contactTab.onContactEdit();
        this.hideModal('editPersonalDetails');
        break;
      case 'Medical':
        this.medicalTab.onMedicalEdit();
        this.hideModal('editPersonalDetails');
        break;
      case 'Emergency':
        this.emergencyTab.onEmergencyContactEdit();
        this.hideModal('editPersonalDetails');
        break;
    }
  }

  addNewFamilyMember() {
    this.FamilyTab.onAddNewFamilyMemberClick();
  }

  emitSuccess($event: string) {
    this.success.emit('complete');
  }
}
