import { Component, OnInit } from '@angular/core';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
import {OpdManagementServiceService} from '../../../../service/opd-management-service.service';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {GeneralOps} from '../../../../utility/GeneralOps';
import {AdminServiceService} from '../../../../service/admin-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {OpdExceptionalSummary} from '../models/opd-exceptional-summary';
import {CONSTANT} from '../../../../utility/Constants';

@Component({
  selector: 'app-settings-opd-designation-component',
  templateUrl: './settings-opd-designation-component.component.html',
  styleUrls: ['./settings-opd-designation-component.component.css']
})
export class SettingsOpdDesignationComponentComponent implements OnInit {

  generalOps = new GeneralOps();
  designationCategoriesList = [];
  designationList = [];
  selectedDesignation = 0;
  selectedYear = new Date().getFullYear();
  yearsList = [];
  sameForAllStatuses = false;
  maritalStatuses = [];
  maritalStatusRemoveArray = [];
  sectionsForMarital = 1;
  configArray: OpdExceptionalSummary[] = [];
  opdConfigData;
  opdConfigDataLoaded = false;
  selectedDesignationForAddConfig = 0;
  selectedYearForAddConfig = new Date().getFullYear();
  opdConfigAllStartDate = this.generalOps.formatDate(new Date());
  opdConfigAllEndDate = this.generalOps.formatDate(new Date());
  opdConfigAllAmount = 0;
  errorCode;
  errorType;
  errorMessage;
  validationErrorMessage = '';
  deleteConfigId;
  addSectionClicked = false;

  constructor(private modalService: ModalUiServiceService,
              private opdService: OpdManagementServiceService,
              private settingsService: SettingsServiceService,
              private adminService: AdminServiceService,
              private interCommunicationService: InterCommunicationServiceService) { }

  ngOnInit() {
    this.yearsList = this.generalOps.getYearList(new Date().getFullYear(), 2);
    this.loadDesignations();
    this.getMaritalStatuses();
    this.getOpdConfigData();
  }

  getOpdConfigData() {
    this.opdService.getOpdExceptionsData(this.selectedDesignation, this.selectedYear, 0 , 10000)
      .subscribe( (data: any) => {
        if (this.isEmpty(data)) {
          this.opdConfigDataLoaded = false;
        } else {
          this.opdConfigData = data;
          this.opdConfigDataLoaded = true;
        }
      });
  }

   isEmpty(obj) {
     console.log(Object.keys(obj).length === 0)
    return Object.keys(obj).length === 0;
  }

  getMaritalStatuses() {
    this.adminService.getDesignationsForAdd()
      .subscribe( (data: any) => {
        this.maritalStatuses = data.maritalStatuses;
        this.maritalStatusRemoveArray = data.maritalStatuses;
      });
  }

  setDefaultValuesWhenRemovingStatus() {
    this.adminService.getDesignationsForAdd()
      .subscribe( (data: any) => {
        this.maritalStatuses = data.maritalStatuses;
      });
  }

  expandSection() {
    if ((<HTMLInputElement>document.getElementById('opd-conf-marital-status')).value === '' ||
      (<HTMLInputElement>document.getElementById('opd-conf-startDate')).value === '' ||
      (<HTMLInputElement>document.getElementById('opd-conf-endDate')).value === '' ||
      (<HTMLInputElement>document.getElementById('opd-conf-amount')).value === '') {
      return this.setErrorMessage('Please fill all records');
    } else {
      if (this.validateAddConfigDateRange()) {
        const opdConfigs = new OpdExceptionalSummary(
          Number((<HTMLInputElement>document.getElementById('opd-conf-marital-status')).value),
          (<HTMLInputElement>document.getElementById('opd-conf-startDate')).value,
          (<HTMLInputElement>document.getElementById('opd-conf-endDate')).value,
          Number((<HTMLInputElement>document.getElementById('opd-conf-amount')).value));
        this.configArray.push(opdConfigs);
        this.sectionsForMarital++;
        this.maritalStatusRemoveArray.forEach((element, index) => {
          if ( Number(element.id) === Number((<HTMLInputElement>document.getElementById('opd-conf-marital-status')).value)) {
             this.maritalStatusRemoveArray.splice(index, 1);
          }
        });
        this.setDefaultValuesWhenRemovingStatus();
        this.setDefaultValuesToAddConfig();
      }
    }
  }

  loadDesignations() {
    this.settingsService.getDesignationCategories()
      .subscribe(
        (data: any) => {
          this.designationCategoriesList = data;
          if (this.designationCategoriesList.length > 0) {
            for (const val of this.designationCategoriesList) {
              for (const des of val.designation) {
                this.designationList.push(des);
              }
            }
            this.selectedDesignationForAddConfig = this.designationList[0].id;
          }
        }
      );
  }
  setDefaultValuesToAddConfig() {
    (<HTMLInputElement>document.getElementById('opd-conf-marital-status')).value = '';
    (<HTMLInputElement>document.getElementById('opd-conf-startDate')).value = '';
    (<HTMLInputElement>document.getElementById('opd-conf-endDate')).value = '';
    (<HTMLInputElement>document.getElementById('opd-conf-amount')).value = '';
  }
  addNewOpdConfig() {
    this.addSectionClicked = true;
    this.sectionsForMarital = 1;
    this.configArray = [];
    this.selectedDesignationForAddConfig = this.designationList[0].id;
    this.selectedYearForAddConfig = new Date().getFullYear();
    this.setDefaultValuesToAddConfig();
    this.getMaritalStatuses();
    this.showModal('opdSettingsModalWithDesignation');
  }

  editOpdConfig(editData) {
    this.selectedDesignationForAddConfig = editData.designationID;
    this.selectedYearForAddConfig = editData.year;
    (<HTMLInputElement>document.getElementById('opd-conf-edit-marital-status')).value = editData.maritalStatusID;
    (<HTMLInputElement>document.getElementById('opd-conf-edit-startDate')).value = editData.validStart;
    (<HTMLInputElement>document.getElementById('opd-conf-edit-endDate')).value = editData.validEnd;
    (<HTMLInputElement>document.getElementById('opd-conf-edit-amount')).value = editData.amount;
    this.showModal('opdConfigEditModalWithDesignation');
  }

  deleteOpdConfig(data) {
    this.deleteConfigId = data.id;
    this.showModal('deleteConfirmOpdDesignationConfig');
  }

  confirmConfigDeletion() {
    this.opdService.deleteOpdConfigurationsExceptionalData(this.deleteConfigId)
      .subscribe(() => {
      }, (deleteConfigError: HttpErrorResponse) => {
        if (deleteConfigError.status === 200) {
          this.openErrorModal(102, 'SUCCESS', '');
          this.hideModal('deleteConfirmOpdDesignationConfig');
          this.getOpdConfigData();
        } else {
          this.openErrorModal(6009, 'FAILED', '');
          this.hideModal('deleteConfirmOpdDesignationConfig');
          this.getOpdConfigData();
        }
      });
  }

  saveEditOpdConfig() {
    const json = {
      'amount': Number((<HTMLInputElement>document.getElementById('opd-conf-edit-amount')).value),
      'cadreID': 1,
      'designationID': this.selectedDesignationForAddConfig,
      'maritalStatusID': Number((<HTMLInputElement>document.getElementById('opd-conf-edit-marital-status')).value),
      'validEnd': (<HTMLInputElement>document.getElementById('opd-conf-edit-endDate')).value,
      'validStart': (<HTMLInputElement>document.getElementById('opd-conf-edit-startDate')).value,
      'year': this.selectedYearForAddConfig
    };
    if (this.validateEditDateRange()) {
      this.opdService.editOpdConfigurationsExceptionalData(json)
        .subscribe( (data: any) => {
        }, (editOpdError: HttpErrorResponse) => {
          if (editOpdError.status === 200) {
            this.openErrorModal(101, 'SUCCESS', '');
            this.hideModal('opdConfigEditModalWithDesignation');
            this.getOpdConfigData();
          } else {
            this.openErrorModal(6011, 'FAILED', '');
          }
        });
    }
  }

  saveNewOpdConfig() {
    const jsonArray = [];
      if (this.sameForAllStatuses) {
        for (const mar of this.maritalStatuses) {
          const json = {
            'amount': this.opdConfigAllAmount,
            'cadreID': 1,
            'designationID': this.selectedDesignationForAddConfig,
            'maritalStatusID': mar.id,
            'validEnd': this.opdConfigAllEndDate,
            'validStart': this.opdConfigAllStartDate,
            'year': this.selectedYearForAddConfig
          };
          jsonArray.push(json);
        }
      } else {
        if ((<HTMLInputElement>document.getElementById('opd-conf-marital-status')).value !== '' &&
          (<HTMLInputElement>document.getElementById('opd-conf-startDate')).value !== '' &&
          (<HTMLInputElement>document.getElementById('opd-conf-endDate')).value !== '' &&
          (<HTMLInputElement>document.getElementById('opd-conf-amount')).value !== '') {
          this.configArray.push(new OpdExceptionalSummary(
            Number((<HTMLInputElement>document.getElementById('opd-conf-marital-status')).value),
            (<HTMLInputElement>document.getElementById('opd-conf-startDate')).value,
            (<HTMLInputElement>document.getElementById('opd-conf-endDate')).value,
            Number((<HTMLInputElement>document.getElementById('opd-conf-amount')).value)
          ));
        }
        for (const conf of this.configArray) {
          const json = {
            'amount': conf.amount,
            'cadreID': 1,
            'designationID': this.selectedDesignationForAddConfig,
            'maritalStatusID': conf.maritalStatusID,
            'validEnd': conf.validEnd,
            'validStart': conf.validStart,
            'year': this.selectedYearForAddConfig
          };
          jsonArray.push(json);
        }
        this.configArray = [];
        this.setDefaultValuesToAddConfig();
      }
      this.opdService.addOpdConfigurationsExceptionalData(jsonArray)
        .subscribe((data: any) => {
        }, (opdConfigError: HttpErrorResponse) => {
          if (opdConfigError.status === 200) {
            this.openErrorModal(100, 'SUCCESS', '');
            this.hideModal('opdSettingsModalWithDesignation');
            this.getOpdConfigData();
          } else {
            this.openErrorModal(6010, 'FAILED', '');
          }
        });
  }

  changeAddConfigArrayValues(id) {
    this.configArray.forEach((element, index) => {
      if ( id === index) {
        element.validStart = (<HTMLInputElement>document.getElementById('opd-conf-new-startDate__' + id)).value;
        element.validEnd = (<HTMLInputElement>document.getElementById('opd-conf-new-endDate__' + id)).value;
        element.amount = Number((<HTMLInputElement>document.getElementById('opd-conf-new-amount__' + id)).value);
      }
    });
  }

  getDesNameFromID(desID) {
    for (const val of this.designationList) {
      if (val.id === Number(desID.split('#')[1])) {
        return val.designation;
      }
    }
  }
  getStatusNameFromID(statusID) {
    for (const marital of this.maritalStatuses) {
      if (marital.id === statusID) {
        return marital.name;
      }
    }
  }

  displayCommonSection() {
      this.sameForAllStatuses = !this.sameForAllStatuses;
  }

  validateAddConfigDateRange() {
    if (this.sameForAllStatuses) {
      if (this.opdConfigAllStartDate > this.opdConfigAllEndDate) {
        this.setErrorMessage(CONSTANT.ERROR_MSG.OPD_CONFIG.DATE_RANGE);
        return false;
      } else {
        return true;
      }
    } else {
      if ((<HTMLInputElement>document.getElementById('opd-conf-startDate')).value >
        (<HTMLInputElement>document.getElementById('opd-conf-endDate')).value) {
        this.setErrorMessage(CONSTANT.ERROR_MSG.OPD_CONFIG.DATE_RANGE);
        return false;
      } else {
        return true;
      }
    }
  }

  validateEditDateRange() {
    if ((<HTMLInputElement>document.getElementById('opd-conf-edit-startDate')).value >
      (<HTMLInputElement>document.getElementById('opd-conf-edit-endDate')).value) {
      this.setErrorMessage(CONSTANT.ERROR_MSG.OPD_CONFIG.DATE_RANGE);
      return false;
    } else {
      return true;
    }
  }

  displayEditModal(configs) {
    this.addSectionClicked = false;
    for (const val of configs) {
      for (let i  = 0; i < this.maritalStatusRemoveArray.length; i++) {
        if (val.maritalStatusID === this.maritalStatusRemoveArray[i].id) {
          this.maritalStatusRemoveArray.splice(this.maritalStatusRemoveArray[i], 1);
        }
      }
    }
    this.selectedDesignationForAddConfig = configs[0].designationID;
    this.selectedYearForAddConfig = configs[0].year;
    this.configArray = configs;
    this.setDefaultValuesWhenRemovingStatus();
    this.showModal('opdSettingsModalWithDesignation');
  }

  setErrorMessage(message: string) {
    this.validationErrorMessage = '* ' + message;
    setTimeout(() => this.validationErrorMessage = '', 6000);
  }


  showModal(modalID) {
    this.modalService.showModal(modalID);
  }
  hideModal(modalID) {
    this.sameForAllStatuses = false;
    this.getMaritalStatuses();
    this.modalService.hideModal(modalID);
  }


  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

}
