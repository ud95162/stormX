import { Component, OnInit } from '@angular/core';
import {ModalUiServiceService} from "../../../../service/ui-services/modal-ui-service.service";
import {OpdManagementServiceService} from "../../../../service/opd-management-service.service";
import {AdminServiceService} from "../../../../service/admin-service.service";
import {GeneralOps} from "../../../../utility/GeneralOps";
import {HttpErrorResponse} from "@angular/common/http";
import {CONSTANT} from "../../../../utility/Constants";
import {InterCommunicationServiceService} from "../../../../service/support-services/inter-communication-service.service";

@Component({
  selector: 'app-settings-opd-with-marital-component',
  templateUrl: './settings-opd-with-marital-component.component.html',
  styleUrls: ['./settings-opd-with-marital-component.component.css']
})
export class SettingsOpdWithMaritalComponentComponent implements OnInit {

  generalOps = new GeneralOps();
  opdConfigData;
  maritalStatuses = [];
  opdConfigDataLoaded = false;
  selectedYear = new Date().getFullYear();
  yearsList = [];
  addButtonClicked = false;
  validationErrorMessage = '';
  deleteConfigId;
  errorCode;
  errorType;
  errorMessage;
  constructor(private modalService: ModalUiServiceService,
              private opdService: OpdManagementServiceService,
              private adminService: AdminServiceService,
              private interCommunicationService: InterCommunicationServiceService) { }

  ngOnInit() {
    this.yearsList = this.generalOps.getYearList(new Date().getFullYear(), 2);
    this.getMaritalStatuses();
    this.getOpdConfigData();
  }

  getMaritalStatuses() {
    this.adminService.getDesignationsForAdd()
      .subscribe( (data: any) => {
        this.maritalStatuses = data.maritalStatuses;
        this.opdConfigDataLoaded = this.maritalStatuses.length > 0;
      });
  }

  getOpdConfigData() {
    this.opdService.getOpdConfigurationDataWithMaritalStatus( this.selectedYear, 0 , 10000)
      .subscribe( (data: any) => {
        this.opdConfigData = data;
      });
  }

  addNewOpdConfig() {
    this.addButtonClicked = true;
    (<HTMLInputElement>document.getElementById('opd-config-marital-status')).value = '1';
    (<HTMLInputElement>document.getElementById('opd-config-year')).value = String(this.selectedYear);
    (<HTMLInputElement>document.getElementById('opd-config-startDate')).value = this.generalOps.formatDate(new Date());
    (<HTMLInputElement>document.getElementById('opd-config-endDate')).value = this.generalOps.formatDate(new Date());
    (<HTMLInputElement>document.getElementById('opd-config-amount')).value = String(0);
    this.showModal('opdSettingsModal');
  }

  editOpdConfig(data) {
    this.addButtonClicked = false;
    (<HTMLInputElement>document.getElementById('opd-config-marital-status')).value = data.maritalStatusID;
    (<HTMLInputElement>document.getElementById('opd-config-year')).value = data.year;
    (<HTMLInputElement>document.getElementById('opd-config-startDate')).value = data.validStart;
    (<HTMLInputElement>document.getElementById('opd-config-endDate')).value = data.validEnd;
    (<HTMLInputElement>document.getElementById('opd-config-amount')).value = data.amount;
    this.showModal('opdSettingsModal');
  }

  deleteOpdConfig(data) {
    this.deleteConfigId = data.id;
    this.showModal('deleteConfirmOpdMaritalConfig');
  }
  confirmConfigDeletion() {
    this.opdService.deleteOpdConfigurationWithMaritalStatus(this.deleteConfigId)
      .subscribe((data: any) => {
      }, (deleteConfigError: HttpErrorResponse) => {
        if (deleteConfigError.status === 200) {
          this.openErrorModal(102, 'SUCCESS', '');
          this.hideModal('deleteConfirmOpdMaritalConfig');
          this.getOpdConfigData();
        } else {
          this.openErrorModal(6009, 'FAILED', '');
          this.hideModal('deleteConfirmOpdMaritalConfig');
          this.getOpdConfigData();
        }
      });
  }

  setErrorMessage(message: string) {
    this.validationErrorMessage = '* ' + message;
    setTimeout(() => this.validationErrorMessage = '', 9000);
  }
  validateDate() {
    if ((<HTMLInputElement>document.getElementById('opd-config-startDate')).value >
      (<HTMLInputElement>document.getElementById('opd-config-endDate')).value) {
      this.setErrorMessage(CONSTANT.ERROR_MSG.OPD_CONFIG.DATE_RANGE);
      return false;
    } else if ((<HTMLInputElement>document.getElementById('opd-config-startDate')).value === '' ||
      (<HTMLInputElement>document.getElementById('opd-config-startDate')).value === undefined) {
      this.setErrorMessage(CONSTANT.ERROR_MSG.OPD_CONFIG.EMPTY_FROM_DATE);
    } else if ((<HTMLInputElement>document.getElementById('opd-config-endDate')).value === '' ||
      (<HTMLInputElement>document.getElementById('opd-config-endDate')).value === undefined) {
      this.setErrorMessage(CONSTANT.ERROR_MSG.OPD_CONFIG.EMPTY_TO_DATE);
      return false;
    } else {
      return true;
    }
  }
  validateAmount() {
    if ((<HTMLInputElement>document.getElementById('opd-config-amount')).value === '' ||
      (<HTMLInputElement>document.getElementById('opd-config-amount')).value === undefined ||
      (<HTMLInputElement>document.getElementById('opd-config-amount')).value === null) {
      this.setErrorMessage(CONSTANT.ERROR_MSG.OPD_CONFIG.EMPTY_OPD_AMOUNT);
      return false;
    } else {
      return true;
    }
  }

  changeDateRange() {
    if ((<HTMLInputElement>document.getElementById('opd-config-startDate')).value >
      (<HTMLInputElement>document.getElementById('opd-config-endDate')).value) {
      this.validationErrorMessage = '* ' + CONSTANT.ERROR_MSG.OPD_CONFIG.DATE_RANGE;
      setTimeout(() => this.validationErrorMessage = '', 4000);
    } else {
      this.validationErrorMessage = '';
    }
  }

  validateOpdConfig() {
    return this.validateDate() && this.validateAmount();
  }

  saveOpdConfig() {
    if (this.validateOpdConfig()) {
      const opdConf = [];
      const json = {
        'cadreID': 1,
        'maritalStatusID': Number((<HTMLInputElement>document.getElementById('opd-config-marital-status')).value),
        'year': (<HTMLInputElement>document.getElementById('opd-config-year')).value,
        'validStart': (<HTMLInputElement>document.getElementById('opd-config-startDate')).value,
        'validEnd': (<HTMLInputElement>document.getElementById('opd-config-endDate')).value,
        'amount' : parseFloat((<HTMLInputElement>document.getElementById('opd-config-amount')).value),
        'designationID': 0
      };
      opdConf.push(json);
      if (this.addButtonClicked) {
        this.opdService.addNewOpdConfigurationWithMaritalStatus(opdConf)
          .subscribe( (data: any) => {
          }, (opdConfigError: HttpErrorResponse) => {
            if (opdConfigError.status === 200) {
              this.openErrorModal(100, 'SUCCESS', '');
              this.hideModal('opdSettingsModal');
              this.getOpdConfigData();
            } else {
              this.openErrorModal(6010, 'FAILED', '');
            }
          });
      } else if (!this.addButtonClicked) {
        this.opdService.editOpdConfigurationWithMaritalStatus(json)
          .subscribe( (data: any) => {
          }, (editOpdError: HttpErrorResponse) => {
            if (editOpdError.status === 200) {
              this.openErrorModal(101, 'SUCCESS', '');
              this.hideModal('opdSettingsModal');
              this.getOpdConfigData();
            } else {
              this.openErrorModal(6011, 'FAILED', '');
            }
          });
      }
    }
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  showModal(modalID) {
    this.modalService.showModal(modalID);
  }
  hideModal(modalID) {
    this.modalService.hideModal(modalID);
  }

  statusNameFromID(id) {
    for (const marital of this.maritalStatuses) {
      if (marital.id === id) {
        return marital.name;
      }
    }
  }

}
