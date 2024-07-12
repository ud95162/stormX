import {Component, HostListener, OnInit} from '@angular/core';
import {Event} from '../../../../../../../../_global/event';
import {EmployeeService} from '../../../../../../../../new-design/hr-dashboard/hr-dashboard/service/employee/employee.service';
import {WorkHoursDistributionComponent} from '../attendance-dashboard/work-hours-distribution/work-hours-distribution.component';

@Component({
  selector: 'app-date-company-filters',
  templateUrl: './date-company-filters.component.html',
  styleUrls: ['./date-company-filters.component.css']
})
export class DateCompanyFiltersComponent implements OnInit {
  singleDateCalendar = false;
  companyFilter = true;
  dateRangeFlter = true;
  selectedDate = Event.setCurrentDateTime().processedFullDate;
  selectedDateAndTime = Event.setCurrentDateTime().processedFullDate + 'T' +
    Event.setCurrentDateTime().roundupHour + ':' + Event.setCurrentDateTime().roundupMinute + ':00';
  companiesList = [];
  businessUnitList = [];
  departmentList = [];
  cadresList = [];
  selectedCompanyID = 0;
  selectedBUID = 0;
  selectedDepID = 0;
  selectedCadreID = 0;
  preInsertDataLoaded = false;
  companiesDataLoaded = false;
  businessUnitsDataLoaded = false;
  departmentsDataLoaded = false;
  cadreDataLoaded = false;
  filterSectionDisplay = false;
  companyFilterSectionDisplay = false;
  startDate = this.workHoursDistributionComponent.startDate;
  endDate = this.workHoursDistributionComponent.endDate;
  constructor(
    private employeeService: EmployeeService,
    private workHoursDistributionComponent: WorkHoursDistributionComponent) { }

  ngOnInit() {
    this.getPreInsertData();
  }
  dateChanged() {
    if (this.selectedDate < Event.setCurrentDateTime().processedFullDate) {
      this.selectedDateAndTime = this.selectedDate;
    } else {
      this.selectedDateAndTime = this.selectedDate + 'T' +
        Event.setCurrentDateTime().roundupHour + ':' + Event.setCurrentDateTime().roundupMinute + ':00';
    }
  }
  dateRangeChanged($event) {
    $event.stopPropagation();
    this.filterSectionDisplay = false;
    this.companyFilterSectionDisplay = !this.companyFilterSectionDisplay;
  }
  displayHideFilterSection($event) {
    $event.stopPropagation();
    this.companyFilterSectionDisplay = false;
    this.filterSectionDisplay = !this.filterSectionDisplay;
  }
  getPreInsertData() {
    this.employeeService.getEmployeePreInsertData(1)
      .subscribe((data: any) => {
        this.companiesList = data.workCompanies;
        this.cadresList = data.cadres;
        this.preInsertDataLoaded = true;
        this.getBusinessUnitsData();
      });
  }
  getBusinessUnitsData() {
    this.businessUnitsDataLoaded = false;
    this.selectedBUID = 0;
    this.selectedDepID = 0;
    this.employeeService.getBusinessUnits(this.selectedCompanyID)
      .subscribe((data: any) => {
        this.businessUnitList = data;
        this.businessUnitsDataLoaded = true;
        this.getDepartmentsData();
      });
  }

  getDepartmentsData() {
    this.selectedDepID = 0;
    this.departmentsDataLoaded = false;
    this.employeeService.getDepartments(this.selectedCompanyID, this.selectedBUID)
      .subscribe((data: any) => {
        this.departmentList = data;
        this.departmentsDataLoaded = true;
        this.getCadreData();
      });
  }

  getCadreData() {
    this.selectedCadreID = 0;
    this.cadreDataLoaded = false;
    this.employeeService.getCadres()
      .subscribe((data: any) => {
        this.cadresList = data;
        this.cadreDataLoaded = true;
      });
  }
 getData() {
   this.workHoursDistributionComponent.allFilters(this.startDate, this.endDate,
     this.selectedCompanyID, this.selectedBUID, this.selectedDepID, this.selectedCadreID);
 }
  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.companyFilterSectionDisplay = false;
    this.filterSectionDisplay = false;
  }
  getDateRange(data) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
}
