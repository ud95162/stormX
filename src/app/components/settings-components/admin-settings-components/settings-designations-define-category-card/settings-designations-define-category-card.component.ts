import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-settings-designations-define-category-card',
  templateUrl: './settings-designations-define-category-card.component.html',
  styleUrls: ['./settings-designations-define-category-card.component.css']
})
export class SettingsDesignationsDefineCategoryCardComponent implements OnInit {
  @Input() cardTitle;
  @Input() callingType;
  @Input() titleLabel;
  @Output() DesignationCadreListEmitter = new EventEmitter<any>();
  @Output() designationCategoriesEmitter = new EventEmitter<any>();
  @Output() designationGroupsEmitter = new EventEmitter<any>();

  @Input() designationPreInsert;
  @Input() showDesignationPreInsert;
  @Input() allDesignationMainCategories;
  @Input() showDesignationMainCategories;

  designationObj = {
    'name': '',
    'abbreviation': '',
    'category': '',
    'mainCategory': '',
    'designationCadre': ''
  };
  errorCode;
  errorType;
  errorMessage;

  constructor(private settingsServiceService: SettingsServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.designationObj.category = this.designationPreInsert.designationGroups[0].type;
    this.designationObj.designationCadre = this.designationPreInsert.employeeCadreList[0].cadre;
    this.designationObj.mainCategory = this.allDesignationMainCategories[0].type;
  }
  saveCategoryDesignation(type, callingType) {
    switch (type) {
      case 'category-main':
        this.saveCategoryMain(callingType);
        break;
      case 'category':
        this.saveCategory(callingType);
        break;
      case 'designation':
        this.saveDesignation(callingType);
        break;
    }
  }

  saveCategoryMain(callingType) {
    if (this.designationObj.name === '') {
      document.getElementById('categoryname' + callingType).classList.add('error');
    } else {
      document.getElementById('categoryname' + callingType).classList.remove('error');
      const json = {
        'type': this.designationObj.name,
      };

      this.settingsServiceService.designationCategoryMainSave(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200 && data.message === 'successful ') {
              this.interCommunicationServiceService.changeDesignationCategory(true);
              this.openErrorModal(1111, 'SUCCESS', 'Designation category saved successfully');
              (<HTMLInputElement>document.getElementById('categoryname' + callingType)).value = '';
              // this.loadDesignationCategories();
            } else {
              this.openErrorModal(1112, 'ERROR', data.message);
            }
          }, error => {
            this.openErrorModal(1112, 'ERROR', '');
          }
        );
    }
  }

  saveCategory(callingType) {
    if (this.designationObj.name === '') {
      document.getElementById('categoryname' + callingType).classList.add('error');
    } else if (this.designationObj.abbreviation === '') {
      document.getElementById('categoryname' + callingType).classList.remove('error');
      document.getElementById('categoryabbreviation' + callingType).classList.add('error');
    } else {
      document.getElementById('categoryname' + callingType).classList.remove('error');
      document.getElementById('categoryabbreviation' + callingType).classList.remove('error');
      const json = {
        'type': this.designationObj.name,
        'abbreviation': this.designationObj.abbreviation,
        'designationCategoryId': this.allDesignationMainCategories.find(
          searchFor => searchFor.type === this.designationObj.mainCategory).desCategoryId
      };
      // console.log('Json', json)

      this.settingsServiceService.designationCategorySave(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200 && data.message === 'successful ') {
              this.interCommunicationServiceService.changeDesignationGroup(true);
              this.openErrorModal(1111, 'SUCCESS', 'Designation group saved successfully');
              (<HTMLInputElement>document.getElementById('categoryname' + callingType)).value = '';
              (<HTMLInputElement>document.getElementById('categoryabbreviation' + callingType)).value = '';
              this.designationObj.mainCategory = this.allDesignationMainCategories[0].type;
              // this.loadDesignationPreInsert();
            } else {
              this.openErrorModal(1112, 'ERROR', data.message);
            }
          }, error => {
            this.openErrorModal(1112, 'ERROR', '');
          }
        );
    }
  }

  saveDesignation(callingType) {
    if (this.designationObj.name === '') {
      document.getElementById('categoryname' + callingType).classList.add('error');
    } else if (this.designationObj.abbreviation === '') {
      document.getElementById('categoryname' + callingType).classList.remove('error');
      document.getElementById('categoryabbreviation' + callingType).classList.add('error');
    } else {
      document.getElementById('categoryname' + callingType).classList.remove('error');
      document.getElementById('categoryabbreviation' + callingType).classList.remove('error');

      const json = {
        'abbreviation': this.designationObj.abbreviation,
        'designationGroup': this.designationPreInsert.designationGroups.find(searchFor => searchFor.type === this.designationObj.category).designationGroupId,
        'designation': this.designationObj.name,
        'designationCadre': this.designationPreInsert.employeeCadreList.find(searchFor => searchFor.cadre === this.designationObj.designationCadre).id
      };

      this.settingsServiceService.designationSave(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200 && data.message === 'successful ') {
              this.interCommunicationServiceService.changeDesignationGroup(true);
              this.openErrorModal(101, 'SUCCESS', 'Designation saved successfully');
              (<HTMLInputElement>document.getElementById('categoryname' + callingType)).value = '';
              (<HTMLInputElement>document.getElementById('categoryabbreviation' + callingType)).value = '';
              this.designationObj.category = this.designationPreInsert.designationGroups[0].type;
              this.designationObj.designationCadre = this.designationPreInsert.employeeCadreList[0].cadre;
              // this.loadDesignationPreInsert();
            } else {
              this.openErrorModal(1112, 'ERROR', data.message);
            }
          }, error => {
            this.openErrorModal(1112, 'ERROR', '');
          }
        );

    }
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
