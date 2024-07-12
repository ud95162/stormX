import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {Router} from '@angular/router';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
import {Designation} from '../../../../classes/rnr/Designation';

@Component({
  selector: 'app-settings-designations-category-list-component',
  templateUrl: './settings-designations-category-list-component.component.html',
  styleUrls: ['./settings-designations-category-list-component.component.css']
})
export class SettingsDesignationsCategoryListComponentComponent implements OnInit {
  @Input() designationCadreList;
  @Input() designationCategories;
  @Input() designationGroups;
  designationCategoriesList = [];
  showDesignationCategoriesList = false;
  designationCategory: any;
  icon_direction = 'down';
  editDesignationGroupData = {
    abbreviation: '',
    designationCategoryId: 0,
    designationGroupId: 0,
    status: 0,
    type: ''
  };
  editDesignationData = {
    abbreviation: '',
    band: 0,
    category_id: 0,
    designation: '',
    designationCadre: 0,
    designationGroup: 0,
    id: 0,
    status: 0
  };
  editDesignationCadre = '';
  editDesignationCategory = '';
  designationGroupEditing = '';
  searchTerm = '';
  prevDesignationData: any;

  errorCode;
  errorType;
  errorMessage;

  constructor(private settingsServiceService: SettingsServiceService,
              public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private modalUiService: ModalUiServiceService) {
  }

  ngOnInit() {
    this.interCommunicationServiceService.loadDesignationGroup.subscribe(loadUsers => {
      if (loadUsers) {
        this.loadDesignationCategories();
      }
    });
  }

  loadDesignationCategories() {
    this.settingsServiceService.getDesignationCategories()
      .subscribe(
        (data: any) => {
          this.designationCategoriesList = data;
          // console.log('list loaded', this.designationCategoriesList)
          if (this.designationCategoriesList.length > 0) {
            this.showDesignationCategoriesList = true;
          } else {
            this.showDesignationCategoriesList = false;
          }
        }
      );
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }

  onClickShowHideDesignations(i: number, designationCategory: any) {
    // this.prevDesignationData = designationCategory.designationGroup;
    // this.editDesignationGroupData = designationCategory.designationGroup;
    // console.log('from drop down', this.editDesignationGroupData)
    // console.log('both', (<HTMLInputElement>document.getElementById('icon_direction_' + i)));
    if ((<HTMLInputElement>document.getElementById('designation_' + i)).style.display === '') {
      // console.log('down', (<HTMLInputElement>document.getElementById('icon_direction_' + i)));
      (<HTMLInputElement>document.getElementById('designation_' + i)).setAttribute('style', 'display:none');
      (<HTMLInputElement>document.getElementById('icon_direction_' + i)).setAttribute('xlink:href', '#pointer-down');
      this.icon_direction = 'down';
    } else {
      // console.log('up', (<HTMLInputElement>document.getElementById('icon_direction_' + i)));
      (<HTMLInputElement>document.getElementById('designation_' + i)).setAttribute('style', '');
      (<HTMLInputElement>document.getElementById('icon_direction_' + i)).setAttribute('xlink:href', '#pointer-up');
      this.icon_direction = 'up';

    }
  }

  setDesignationGroupDataToEdit(designationCategory: any) {
    if (designationCategory.designationCategory !== null) {
      this.editDesignationCategory = designationCategory.designationCategory.type;
    }
    this.prevDesignationData = designationCategory.designationGroup;
    this.editDesignationGroupData = Object.assign({}, designationCategory.designationGroup);
    // console.log('edit des group: ', this.editDesignationGroupData)
      this.showSaveQuoteModal('editDesignationGroup');
  }

  setDesignationDataToEdit(designation: any) {
    this.editDesignationData = Object.assign({}, designation);
    console.log('edit des : ', this.editDesignationData)
    console.log('des group: ', this.designationGroups)
    this.designationGroupEditing = this.designationGroups.find(x => x.designationGroupId === this.editDesignationData.designationGroup).type;
    this.editDesignationCadre = this.designationCadreList[this.designationCadreList.findIndex(
      x => x.id === this.editDesignationData.designationCadre)].cadre;
    this.showSaveQuoteModal('editDesignation');
  }

  editDesignationGroup() {
    const editJson = {
      'designationGroupId': 0,
      'prevDesGroupName': '',
      'type': '',
      'abbreviation': '',
      'designationCategoryId': 0,
      'previousDesignationCategoryId': 0
    };
    editJson.designationGroupId = this.editDesignationGroupData.designationGroupId;
    editJson.prevDesGroupName = this.prevDesignationData.type;
    editJson.type = this.editDesignationGroupData.type;
    editJson.abbreviation = this.editDesignationGroupData.abbreviation;
    editJson.designationCategoryId = this.designationCategories.find(x => x.type === this.editDesignationCategory).desCategoryId;
    editJson.previousDesignationCategoryId = this.prevDesignationData.designationCategoryId;

    // console.log('editGroup', editJson)
    this.settingsServiceService.editDesignationGroup(editJson)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200 && data.message === 'successful ') {
            this.interCommunicationServiceService.changeDesignationGroup(true);
            this.openErrorModal(1111, 'SUCCESS', 'Record updated successfully');
            this.editDesignationGroupData = {
              abbreviation: '',
              designationCategoryId: 0,
              designationGroupId: 0,
              status: 0,
              type: ''
            };
            this.loadDesignationCategories();
          } else {
            this.openErrorModal(1112, 'ERROR', data.message);
          }
          this.hideModal('editDesignationGroup');
        }
      );
  }


  deleteDesignationGroup() {
    let desGroupDeleteJson = {
      'designationGroupName': ''
    };
    desGroupDeleteJson.designationGroupName = this.editDesignationGroupData.type;
    this.settingsServiceService.deleteDesignationGroup(desGroupDeleteJson)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200 && data.message === 'successful ') {
            this.interCommunicationServiceService.changeDesignationGroup(true);
            this.openErrorModal(1111, 'SUCCESS', 'Designation group deleted successfully');
            this.editDesignationGroupData = {
              abbreviation: '',
              designationCategoryId: 0,
              designationGroupId: 0,
              status: 0,
              type: ''
            };
            this.loadDesignationCategories();
          } else {
            this.openErrorModal(2001, 'ERROR', data.message);
          }
          this.hideModal('editDesignationGroup');
        }
      );
  }

  editDesignation() {
    const editDesJson = {
      'id': 0,
      'designation': '',
      'abbreviation': '',
      'designationCadre': 0,
      'designationGroup': 0
    };

    editDesJson.id = this.editDesignationData.id;
    editDesJson.abbreviation = this.editDesignationData.abbreviation;
    editDesJson.designation = this.editDesignationData.designation;
    editDesJson.designationGroup = this.designationGroups.find(x => x.type === this.designationGroupEditing).designationGroupId;
    editDesJson.designationCadre = this.designationCadreList.find(x => x.cadre === this.editDesignationCadre).id;

    console.log('desEditJon', editDesJson)
    this.settingsServiceService.editDesignation(editDesJson)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200 && data.message === 'successful ') {
            // this.interCommunicationServiceService.changeDesignationGroup(true);
            this.openErrorModal(1111, 'SUCCESS', 'Record updated successfully');
            this.editDesignationData = {
              abbreviation: '',
              band: 0,
              category_id: 0,
              designation: '',
              designationCadre: 0,
              designationGroup: 0,
              id: 0,
              status: 0
            };
            this.editDesignationCadre = '';
            this.designationGroupEditing = '';
            this.loadDesignationCategories();
          } else {
            this.openErrorModal(1112, 'ERROR', data.message);
          }
          this.hideModal('editDesignation');
        }
      );
  }

  deleteDesignation() {
    this.settingsServiceService.deleteDesignation(this.editDesignationData.id)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200 && data.message === 'successful ') {
            // this.interCommunicationServiceService.changeDesignationGroup(true);
            this.openErrorModal(1111, 'SUCCESS', 'Designation deleted successfully');
            this.editDesignationData = {
              abbreviation: '',
              band: 0,
              category_id: 0,
              designation: '',
              designationCadre: 0,
              designationGroup: 0,
              id: 0,
              status: 0
            };
            this.loadDesignationCategories();
          } else {
            this.openErrorModal(2001, 'ERROR', data.message);
          }
          this.hideModal('editDesignation');
        }
      );
  }

  //added
  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }
}
