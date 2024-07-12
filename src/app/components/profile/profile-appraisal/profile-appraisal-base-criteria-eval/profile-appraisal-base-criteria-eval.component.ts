import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppraisalServiceService} from '../../../../service/employee-self-service-services/appraisal-service.service';

@Component({
  selector: 'app-profile-appraisal-base-criteria-eval',
  templateUrl: './profile-appraisal-base-criteria-eval.component.html',
  styleUrls: ['./profile-appraisal-base-criteria-eval.component.css']
})
export class ProfileAppraisalBaseCriteriaEvalComponent implements OnInit {

  @Input() employeeId;
  @Input() year;

  currentLocation: any;
  fromDate;
  toDate;
  fromDateForMonthlyCriteria;
  toDateForMonthlyCriteria;
  displayCollapseData = false;
  baseCriteriaResponse = [];
  monthlyCriteriaResponse = [];
  baseCriteriaResponseLoaded = false;
  monthlyCriteriaResponseLoaded = false;

  selectedTab: string;

  constructor(public router: Router,
              private appraisalService: AppraisalServiceService) {
    this.selectedTab = 'kpiEvaluation';
  }

  ngOnInit() {

    const date = new Date();
    this.toDate = this.formatDate(date);

    date.setFullYear(date.getFullYear() - 1);
    this.fromDate = this.formatDate(date);

    this.currentLocation = window.location.hash;

    this.fromDateForMonthlyCriteria = this.fromDate;
    this.toDateForMonthlyCriteria = this.toDate;
    this.loadEmployeeBaseCriteriaEvaluationValues();
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  changeDate() {
    this.baseCriteriaResponseLoaded = false;
    if (this.fromDate > this.toDate) {
      this.toDate = this.fromDate;
    }
    this.loadEmployeeBaseCriteriaEvaluationValues();
  }

  profileRedirect() {
    this.router.navigate(['./profile/main']);
  }

  loadEmployeeBaseCriteriaEvaluationValues() {
    this.appraisalService.getEmployeeBaseCriteriaEvaluation(this.employeeId,
      this.year, encodeURIComponent(new Date(this.fromDate).toString()), encodeURIComponent(new Date(this.toDate).toString()))
      .subscribe( (data: any) => {
        this.baseCriteriaResponse = data;
        this.baseCriteriaResponseLoaded = true;
      });
  }

  loadEmployeeMonthlyCriteriaEvaluationValues() {
    this.appraisalService.getEmployeeMonthlyCriteriaEvaluation(this.employeeId,
      this.year, encodeURIComponent(new Date(this.fromDateForMonthlyCriteria).toString()),
      encodeURIComponent(new Date(this.toDateForMonthlyCriteria).toString()))
      .subscribe( (data: any) => {
        this.monthlyCriteriaResponse = data;
        this.monthlyCriteriaResponseLoaded = true;
      });
  }

  displayMonthAndYear(kpiUniId: any) {
    if (kpiUniId !== null) {
      const data = kpiUniId.split('_');
      return data[2].slice(0, 3) + '-' + data[1];
    }
  }

  changeActiveTab(monthCriteria: string) {
    this.selectedTab = monthCriteria;
    if (this.selectedTab === 'kpiEvaluation') {
      this.baseCriteriaResponseLoaded = false;
      this.loadEmployeeBaseCriteriaEvaluationValues();
    } else {
      this.monthlyCriteriaResponseLoaded = false;
      this.loadEmployeeMonthlyCriteriaEvaluationValues();
    }
  }

  changeDateForMonthlyCriteria() {
    this.monthlyCriteriaResponseLoaded = false;
    if (this.fromDateForMonthlyCriteria > this.toDateForMonthlyCriteria) {
      this.toDateForMonthlyCriteria = this.fromDateForMonthlyCriteria;
    }
    this.loadEmployeeMonthlyCriteriaEvaluationValues();
  }
}
