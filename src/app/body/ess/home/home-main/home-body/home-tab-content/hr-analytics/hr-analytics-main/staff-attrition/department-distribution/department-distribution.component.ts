import {Component, HostListener, Input, OnInit} from '@angular/core';
import {
  EmployeeService
} from "../../../../../../../../../../new-design/hr-dashboard/hr-dashboard/service/employee/employee.service";
import {
  HrAnalyticsService
} from "../../../../../../../../../../service/head-count-dashboard-services/hr-analytics.service";
import {AttritionFilters} from "../../AttritionFilters";
import {DepartmentWiseData} from "../../../models/AttritionResponse";
import {AmChartService} from "../../../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-department-distribution',
  templateUrl: './department-distribution.component.html',
  styleUrls: ['./department-distribution.component.css']
})
export class DepartmentDistributionComponent implements OnInit {

  @Input() companies;
  selectedCompanyID;
  selectedBuID;
  businessUnitsDataLoaded = false;
  businessUnits = [];
  startDate;
  endDate;
  departmentWiseData: DepartmentWiseData[];
  departmentWiseDataLoaded = false;
  attritionFilterSectionDisplay = false;

  constructor(private employeeService: EmployeeService,
              private attritionService: HrAnalyticsService,
              private amChartService: AmChartService) {
  }

  ngOnInit() {
    this.startDate = new Date().getFullYear() + '-01-01';
    this.endDate = new Date().toISOString().slice(0, 10);
    if (this.companies.length > 0) {
      this.selectedCompanyID = this.companies[0].id;
      this.getBusinessUnitsData();
    }
  }

  getBusinessUnitsData() {
    this.businessUnitsDataLoaded = false;
    this.employeeService.getBusinessUnits(this.selectedCompanyID)
      .subscribe((data: any) => {
        this.businessUnits = data;
        if (this.businessUnits.length > 0) {
          this.selectedBuID = this.businessUnits[0].id;
          this.businessUnitsDataLoaded = true;
        }
        this.filterDepartmentWiseData();
      });
  }

  changeDateRange() {
    if (this.startDate > this.endDate) {
      this.startDate = this.endDate;
    }
    this.filterDepartmentWiseData();
  }

  filterDepartmentWiseData() {
    const filters = new AttritionFilters([], [], [], [], [], this.startDate, this.endDate);
    filters.companyIDs.push(this.selectedCompanyID);
    filters.buIDs.push(this.selectedBuID);
    this.attritionService.getDepartmentWiseEmployeeSummary(filters)
      .subscribe( (data: any) => {
        this.departmentWiseData = data;
        this.drawChart();
        this.departmentWiseDataLoaded = true;
      });
  }


  drawChart() {
    const chart = this.amChartService.createStackedBarChart('depWiseEmployeeDistributionStackedChart', 'dep', ['Active', 'Resignation', 'Recruit'], ['#5CAED7', '#755CD7', '#995CD7']);
    for (const data of this.departmentWiseData) {
      if (data.activeCount > 0 || data.recruitCount > 0 || data.resignCount > 0) {
        chart.data.push({'dep': data.depName, 'Active': data.activeCount, 'Resignation': data.resignCount, 'Recruit': data.recruitCount});
      }
    }
  }

  displayDepartmentAttritionFilters($event) {
    $event.stopPropagation();
    this.attritionFilterSectionDisplay = !this.attritionFilterSectionDisplay;
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.attritionFilterSectionDisplay = false;
  }

}
