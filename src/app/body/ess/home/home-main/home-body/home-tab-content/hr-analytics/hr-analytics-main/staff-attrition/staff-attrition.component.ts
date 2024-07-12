import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {
  HrAnalyticsService
} from '../../../../../../../../../service/head-count-dashboard-services/hr-analytics.service';
import {CompanyWiseEmployeeSummaryCount} from '../../models/StaffAttrition';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {
  EmployeeService
} from '../../../../../../../../../new-design/hr-dashboard/hr-dashboard/service/employee/employee.service';
import {NgbDatepicker, NgbDateStruct, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerNavigateEvent} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker';
import {GeneralOps} from '../../../../../../../../../utility/GeneralOps';
import {AttritionFilters} from '../AttritionFilters';
import {formattingTokens} from 'ngx-bootstrap/chronos/format/format';
import {
  HeadGrowthAndTurnOverResponse,
  RecruitmentAndResignationResponse,
  ResignEmployeesExperienceSummary
} from '../../models/AttritionResponse';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-staff-attrition',
  templateUrl: './staff-attrition.component.html',
  styleUrls: ['./staff-attrition.component.css']
})
export class StaffAttritionComponent implements AfterViewInit {

  generalOps = new GeneralOps();
  companyWiseEmployeeSummary: CompanyWiseEmployeeSummaryCount[];
  companyWiseEmployeeSummaryDataLoaded = false;

  // filter inputs define
  preInsertDataLoaded = false;
  businessUnitsDataLoaded = false;
  departmentsDataLoaded = false;
  companiesList = [];
  businessUnitList = [];
  cadresList = [];
  selectedCompanyID = 0;
  selectedBUID = 0;
  selectedDepID = 0;
  selectedCadreID = 0;

  // multiple select sections

  @ViewChild('departmentSelect') departmentSelect;
  selectedDepartments;
  public staffAttritionDepartments = new FormControl();
  departmentsData = [];
  allDepIDs = [];
  selectedDepIDs = [];
  allDepartmentsChecked = true;
  isInitialLoadOfDep = true;
  initialDepartments = [];

  // cadre select sections
  @ViewChild('cadreSelect') cadreSelect;
  selectedCadres;
  public staffAttritionCadres = new FormControl();
  cadresData = [];
  allCadreIDs = [];
  selectedCadreIDs = [];
  allCadresChecked = true;
  isInitialLoadOfCadre = true;
  initialCadres = [];

  // year select section
  yearsList = [];
  public staffAttritionYears = new FormControl([new Date().getFullYear()]);

  // month select section
  monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public staffAttritionMonths = new FormControl(this.monthList.slice(0, new Date().getMonth() + 1));


  recruitmentResignationDataSummary: RecruitmentAndResignationResponse;
  headGrowthTurnOverDataSummary: HeadGrowthAndTurnOverResponse;
  summaryDataLoaded = false;

  resignEmployeesExperienceSummary: ResignEmployeesExperienceSummary;
  resignEmployeeSummaryDataLoaded = false;
  attritionFilterSectionDisplay = false;
  constructor(private attritionService: HrAnalyticsService,
              private employeeService: EmployeeService,
              private formBuilder: FormBuilder) { }


  /**
   * The ngAfterViewInit() function is a lifecycle hook in Angular that is called after Angular has fully initialized the component's view.
   * In this function, the following tasks are performed:
   *
   * 1. The yearsList variable is assigned the value returned by the generalOps.getYearList() method.
   * This method takes the current year as a parameter and generates a list of two years back.
   *
   * 2. The getCompanyWiseEmployeeCounts() method is called to retrieve the employee summaries with counts for each company.
   *
   * 3. The getPreInsertData() method is called to fetch some pre-inserted data.
   *
   * 4. The generalOps.getMonthNoFromName() method is called to get the month number based on the month name.
   *
   * 5. The filterAnalytics() method is called to apply filters and display the analytics data.
   *
   */
  ngAfterViewInit() {
    this.yearsList = this.generalOps.getYearList(new Date().getFullYear(), 2);
    this.getCompanyWiseEmployeeCounts();
    this.getPreInsertData();
    this.generalOps.getMonthNoFromName();
    this.filterAnalytics();
  }


  /**
   * call pre insert data get endpoint for set
   * company list and cadres list...
   * after retrieve companies data call the
   * getBusinessUnitsData() method
   */
  getPreInsertData() {
    this.employeeService.getEmployeePreInsertData(1)
      .subscribe((data: any) => {
        this.preInsertDataLoaded = true;
        this.companiesList = data.workCompanies;
        this.cadresData = data.cadres;
        this.cadresList = data.cadres;
        this.allCadreIDs = data.cadres;
        this.selectedCadres = data.cadres;
        this.mapCadreIDs(data.cadres);
        this.getBusinessUnitsData();
      });
  }

  /**
   * this will call after set value to this.selectedCompanyID
   * it also call when company change from dropdown.
   * after set value to this.selectedBUID then call endpoint to get departments data
   */
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

  /**
   * this will call after data set to this.selectedBUID
   * it will call again when business unit change from dropdown
   */
  getDepartmentsData() {
    this.selectedDepID = 0;
    this.departmentsDataLoaded = false;
    this.employeeService.getDepartments(this.selectedCompanyID, this.selectedBUID)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.departmentsData = data;
          this.departmentsDataLoaded = true;
          this.allDepIDs = data;
          this.selectedDepartments = data;
          this.mapDepartmentIDs(data);
        } else {
          this.departmentsDataLoaded = false;
        }
      });
  }

  mapCadreIDs(data) {
    this.deSelectAll('cadre');
    this.allCadreIDs = [];
    this.selectedCadreIDs = [];
    data.map((cadre) => {
      this.allCadreIDs.push(cadre.cadreID);
      this.selectedCadreIDs.push(cadre.cadreID);
    });
    if (this.isInitialLoadOfCadre) {
      this.initialCadres = this.allCadreIDs;
      this.isInitialLoadOfCadre = false;
    }
    this.allCadresChecked = true;
  }

  mapDepartmentIDs(data) {
    this.deSelectAll('dep');
    this.allDepIDs = [];
    this.selectedDepIDs = [];
    data.map((dep) => {
      this.allDepIDs.push(dep.id);
      this.selectedDepIDs.push(dep.id);
    });
    if (this.isInitialLoadOfDep) {
      this.initialDepartments = this.allDepIDs;
      this.isInitialLoadOfDep = false;
    }
    this.allDepartmentsChecked = true;
  }


  getCompanyWiseEmployeeCounts() {
    this.attritionService.getCompanyWiseEmployeeCountSummary()
      .subscribe( (data: any) => {
        this.companyWiseEmployeeSummary = data;
        this.companyWiseEmployeeSummaryDataLoaded = true;
      });
  }

  getNameFromId(section: string, id: any) {
    if (id  !== undefined) {
      switch (section) {
        case 'dep':
          return this.departmentsData.find(o => o.id === id).name;
        case 'cadre':
          return this.cadresData.find(o => o.cadreID === id).cadreName;
      }
    }
  }


  changeAction(section: string) {
    switch (section) {
      case 'dep':
        this.allDepartmentsChecked = this.selectedDepIDs.length === this.allDepIDs.length;
        break;
      case 'cadre':
        this.allCadresChecked = this.selectedCadreIDs.length === this.allCadreIDs.length;
    }
  }

  returnArrayLength(section) {
    switch (section) {
      case 'dep':
        return this.selectedDepIDs.length - 1;
      case 'cadre':
        return this.selectedCadreIDs.length - 1;
    }
  }

  onAllChanged(section: string, checked: any) {
    switch (section) {
      case 'dep':
        this.selectedDepIDs = [];
        if (checked) {
          this.selectedDepIDs = this.allDepIDs;
          this.selectAll(section);
        } else {
          this.selectedDepIDs = [];
          this.deSelectAll(section);
        }
        break;
      case 'cadre':
          this.selectedCadreIDs = [];
          if (checked) {
            this.selectedCadreIDs = this.allCadreIDs;
            this.selectAll(section);
          } else {
            this.selectedCadreIDs = [];
            this.deSelectAll(section);
          }
          break;
    }
  }

  selectAll(section: string) {
    switch (section) {
      case 'dep':
        this.departmentSelect.options.forEach((x) => {
          x.select();
        });
        break;
      case 'cadre':
        this.cadreSelect.options.forEach((x) => {
          x.select();
        });
        break;
    }
  }

  deSelectAll(section: string) {
    switch (section) {
      case 'dep':
        if (this.departmentSelect !== undefined) {
          this.departmentSelect.options.forEach((x) => {
            x.deselect();
          });
        }
        break;
      case 'cadre':
        if (this.cadreSelect !== undefined) {
          this.cadreSelect.options.forEach((x) => {
            x.deselect();
          });
        }
        break;
    }
  }


  /**
   *
   * First, it sets the  attritionFilterSectionDisplay  variable to  false , which hides the attrition filter section.
   *
   * Then, it creates an instance of the  AttritionFilters  class, passing empty arrays and strings as parameters.
   * This class is used to store the selected filter options for attrition analytics.
   *
   * Next, it checks if a company ID ( selectedCompanyID ) and a business unit ID ( selectedBUID ) have been selected.
   * If so, it adds them to the  companyIDs  and  buIDs  arrays in the  filters  object respectively.
   *
   * It also assigns the  selectedDepIDs  array to the  departmentIDs  property and
   * the  selectedCadreIDs  array to the  cadreIDs  property of the  filters  object.
   *
   * The function then calls the  setDatesArrayForAttritionFilters()  method to set the  dates  property of the  filters  object.
   *
   * After that, it makes an HTTP request to the  getResignEmployeesExperienceSummary()  method of the  attritionService
   * to retrieve the summary data for resigning employees' experience. The returned data
   * is assigned to the  resignEmployeesExperienceSummary  variable, and the  resignEmployeeSummaryDataLoaded  flag is set to  true .
   *
   * Next, it calls the  getEmployeeRecruitmentAndResignationSummary()  method and
   * the  getEmployeeHeadGrowthAndTurnOverSummary()  method of the  attritionService
   * to retrieve the data related to employee recruitment, resignation, head growth, and turnover.
   *
   * These two requests are executed concurrently using the  forkJoin()  function,
   * which returns an array containing the results of both requests.
   * The results are then assigned to the  recruitmentResignationDataSummary
   * and  headGrowthTurnOverDataSummary  variables respectively. Finally, the  summaryDataLoaded  flag is set to  true .
   *
   */

  filterAnalytics() {
    this.attritionFilterSectionDisplay = false;
    const filters = new AttritionFilters([], [], [], [], [], '', '');
    if (this.selectedCompanyID !== 0) {
      filters.companyIDs.push(this.selectedCompanyID);
    }
    if (this.selectedBUID !== 0) {
      filters.buIDs.push(this.selectedBUID);
    }
    filters.departmentIDs = this.selectedDepIDs;
    filters.cadreIDs = this.selectedCadreIDs;
    filters.dates = this.setDatesArrayForAttritionFilters();


    this.attritionService.getResignEmployeesExperienceSummary(filters)
      .subscribe( (data: any) => {
        this.resignEmployeesExperienceSummary = data;
        this.resignEmployeeSummaryDataLoaded = true;
      });

    const recruitmentResignationData = this.attritionService.getEmployeeRecruitmentAndResignationSummary(filters);
    const headGrowthTurnOverData = this.attritionService.getEmployeeHeadGrowthAndTurnOverSummary(filters);

    forkJoin([recruitmentResignationData, headGrowthTurnOverData]).subscribe((result: any) => {
      this.recruitmentResignationDataSummary = result[0];
      this.headGrowthTurnOverDataSummary = result[1];
      this.summaryDataLoaded = true;
    });
  }

  /**
   * This function generates an array of dates based on the selected years and months for staff attrition filters.
   *
   * It starts by initializing an empty array called "dates".
   *
   * Then, it iterates over each selected year from the "staffAttritionYears" variable.
   *
   * Inside the first loop, it further iterates over each selected month from the "staffAttritionMonths" variable.
   *
   * For each combination of year and month,
   * it retrieves the corresponding month value using a map called "monthNoMap" from the "generalOps" object.
   *
   * Then, it constructs a date string in the format "year-monthValue-01,
   * year-monthValue-endDate" using the year, monthValue,
   * and the result of calling the "getMonthEndDate" function from the "generalOps" object with the year and month as arguments.
   *
   * Finally, it pushes the constructed date string into the "dates" array.
   *
   * The function then returns the populated "dates" array.
   */
  setDatesArrayForAttritionFilters() {
    const dates = [];
    for ( const year of this.staffAttritionYears.value ) {
      for ( const month of this.staffAttritionMonths.value ) {
        const monthValue = this.generalOps.monthNoMap.get(month);
        dates.push(year + '-' + monthValue + '-01,' + year + '-' + monthValue + '-' + this.generalOps.getMonthEndDate(year, month));
      }
    }
    return dates;
  }

  displayStaffAttritionFilters($event) {
    $event.stopPropagation();
    this.attritionFilterSectionDisplay = !this.attritionFilterSectionDisplay;
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.attritionFilterSectionDisplay = false;
  }
}
