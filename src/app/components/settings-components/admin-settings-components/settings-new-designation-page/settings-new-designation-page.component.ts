import {Component, Input, OnInit} from '@angular/core';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
import {EmployeeService} from '../../../../new-design/hr-dashboard/hr-dashboard/service/employee/employee.service';
import {
  DesignationCategory, DesignationCombination,
  DesignationGroup,
  DesignationGroupWise, DesignationList
} from '../../../../classes/settings/designationGroup';
import { data } from 'jquery';

@Component({
  selector: 'app-settings-new-designation-page',
  templateUrl: './settings-new-designation-page.component.html',
  styleUrls: ['./settings-new-designation-page.component.css']
})
export class SettingsNewDesignationPageComponent implements OnInit {

  filterSectionDisplay: any;
  selectedCompanyID: any;
  selectedBUID: any;
  selectedCadreID: any;
  searchTerm: any;

  allDesignations = [];
  companyData = [];
  businessUnitsData = [];
  departmentsData = [];
  officeData = [];
  cadresList = [];
  subCadreData = [];
  designationCategory = [];
  designationGroup = [];
  designationList = [];
  designationObject = {
    designationName: '',
    abbreviation: '',
  };

  companyDataLoaded = false;
  buDataLoaded = false;
  deptDataLoaded = false;
  officeDataLoaded = false;
  subCadreDataLoaded = false;
  cadreDataLoaded = false;
  showNextButton = true;
  showSaveButton = false;

  newDesignationDetails = new DesignationGroupWise(null, null, null, null);

  textFieldValue: any;
  selectFieldValue: any;
  designationGroupsSelected: any;
  displayFilterSection: any;
  selectedDepID: any;



  constructor(private modalService: ModalUiServiceService,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getAllDesignationsGroups();
    this.getAllDesignationsGroupWise();
    this.getCompanyDetails();
    this.getCadres();
    this.getAllDesignations();
  }

  getAllDesignationsGroups() {
    this.newDesignationDetails.designationCategory = new DesignationCategory(null, null, null);
    this.newDesignationDetails.designationGroup = new DesignationGroup(null, null, null, null, null);
    this.newDesignationDetails.designationList = new DesignationList(null, null, null, null,
                            null, null, null, null, null, null);
    this.newDesignationDetails.designationCombination = new DesignationCombination(null, null, null, null,
                            null, null, null, null, null, null, null);
  }

  getAllDesignations() {
    this.employeeService.getAllDesignations()
      .subscribe((data: any) => {
        this.allDesignations = data;
      });
  }

  getAllDesignationsGroupWise() {

  }

  showModal(modalId: string) {
    this.modalService.showModal(modalId);
  }

  addNewDesignation() {
    this.showModal('newDesignationModal');
  }

  getCompanyDetails() {
    this.companyDataLoaded = false;
    this.companyData = [];
    this.newDesignationDetails.designationCombination.companyID = null;
    this.newDesignationDetails.designationCombination.buID = null;
    this.newDesignationDetails.designationCombination.deptID = null;
    this.newDesignationDetails.designationCombination.officeID = null;
    this.employeeService.getCompany()
      .subscribe((data: any) => {
        if (this.companyData) {
          this.companyData = data;
          this.companyDataLoaded = true;
          this.newDesignationDetails.designationCombination.companyID = this.companyData[0].companyID;
          this.getBusinessUnitsDetails();
        }
    });
  }

  getBusinessUnitsDetails() {
    this.buDataLoaded = false;
    this.businessUnitsData = [];
    this.newDesignationDetails.designationCombination.buID = null;
    this.newDesignationDetails.designationCombination.deptID = null;
    this.newDesignationDetails.designationCombination.officeID = null;
    this.employeeService.getBusinessUnits(this.newDesignationDetails.designationCombination.companyID)
      .subscribe((data: any) => {
        this.businessUnitsData = data;
        if (this.businessUnitsData.length > 0) {
          this.newDesignationDetails.designationCombination.buID = this.businessUnitsData[0].id;
          this.buDataLoaded = true;
        }
        this.getDepartmentsDetails();
      });
  }

  getDepartmentsDetails() {
    this.deptDataLoaded = false;
    this.departmentsData = [];
    this.newDesignationDetails.designationCombination.deptID = null;
    this.newDesignationDetails.designationCombination.officeID = null;
    this.employeeService.getDepartments(this.newDesignationDetails.designationCombination.companyID,
      this.newDesignationDetails.designationCombination.buID)
      .subscribe((data: any) => {
        this.departmentsData = data;
        if (this.departmentsData.length > 0) {
          this.newDesignationDetails.designationCombination.deptID = this.departmentsData[0].id;
          this.deptDataLoaded = true;
        }
        this.getOfficeDetails();
      });
  }

  getOfficeDetails() {
    this.officeDataLoaded = false;
    this.officeData = [];
    this.newDesignationDetails.designationCombination.officeID = null;
    this.employeeService.getOffices(this.newDesignationDetails.designationCombination.companyID,
      this.newDesignationDetails.designationCombination.buID, this.newDesignationDetails.designationCombination.deptID)
      .subscribe((data: any) => {
        this.officeData = data;
        if (this.officeData.length > 0) {
          this.newDesignationDetails.designationCombination.officeID = this.officeData[0].id;
          this.officeDataLoaded = true;
        }
      });
  }

  getCadres() {
    this.cadreDataLoaded = false;
    this.cadresList = [];
    this.newDesignationDetails.designationCombination.cadreID = null;
    this.employeeService.getCadres()
      .subscribe((data: any) => {
        this.cadresList = data;
        this.newDesignationDetails.designationCombination.cadreID = this.cadresList[0].id;
        this.cadreDataLoaded = true;
      });
  }

  getSubCadres() {
    this.subCadreDataLoaded = false;
    this.subCadreData = [];
    this.newDesignationDetails.designationCombination.subCadreID = null;
    this.employeeService.getSubCadres(this.newDesignationDetails.designationCombination.cadreID)
      .subscribe((data: any) => {
        this.subCadreData = data;
        if (this.subCadreData.length > 0) {
          this.newDesignationDetails.designationCombination.subCadreID = this.subCadreData[0].id;
          this.subCadreDataLoaded = true;
        }
      });
  }

  setNewDesignationGroups() {
    this.showNextButton = false;
    this.showSaveButton = true;
    this.designationGroupsSelected = true;
    this.designationList = [];
    this.getDesignationCategories();
    this.getDesignationGroups();
  }

  getDesignationCategories() {
    this.employeeService.getDesignationCategory()
      .subscribe((data: any) => {
        this.designationCategory = data;
      });
  }

  getDesignationGroups() {
    this.employeeService.getDesignationGroups()
      .subscribe((data: any) => {
        this.designationGroup = data;
      });
  }

  resetNewDesignationGroups() {
    this.showNextButton = true;
    this.showSaveButton = false;
    this.designationGroupsSelected = false;
  }

  addToDesignationList() {
    this.designationList.push(this.designationObject);
    this.designationObject = {
      designationName: '',
      abbreviation: '',
    };
  }

  removeCard(index: number) {
    if (index !== -1) {
      this.designationList.splice(index, 1);
    }

    console.log(this.designationList);
  }

  saveNewDesignation() {
    for (let i = 0; i < this.designationList.length; i++) {
      this.newDesignationDetails.designationList.designationName = this.designationList[i].designationName;
      this.newDesignationDetails.designationList.abbreviation = this.designationList[i].abbreviation;
    }

  }

  hideModal(modalId: any) {
    this.modalService.hideModal(modalId);
  }


  displayHideFilterSection($event: MouseEvent) {

  }

  getSearchResults($event: KeyboardEvent) {

  }

  displayFiltersOnClick() {
    this.filterSectionDisplay = true;
  }
}
