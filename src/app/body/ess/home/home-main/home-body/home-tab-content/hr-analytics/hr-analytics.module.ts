import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrAnalyticsRoutingModule } from './hr-analytics-routing.module';
import { HrAnalyticsComponent } from './hr-analytics.component';
import { HrAnalyticsMainComponent } from './hr-analytics-main/hr-analytics-main.component';
import { StaffAttritionComponent } from './hr-analytics-main/staff-attrition/staff-attrition.component';
import { CompanyWiseEmployeeSummaryComponent } from './hr-analytics-main/staff-attrition/company-wise-employee-summary/company-wise-employee-summary.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import { RecResGrowthTurnSummaryComponent } from './hr-analytics-main/staff-attrition/rec-res-growth-turn-summary/rec-res-growth-turn-summary.component';
import { ProjectTypeWiseRecruitmentComponent } from './hr-analytics-main/staff-attrition/project-type-wise-recruitment/project-type-wise-recruitment.component';
import { ProjectTypeWiseResignationComponent } from './hr-analytics-main/staff-attrition/project-type-wise-resignation/project-type-wise-resignation.component';
import { RecruimentVsResignationComponent } from './hr-analytics-main/staff-attrition/recruiment-vs-resignation/recruiment-vs-resignation.component';
import { ProjectTypeWiseHeadGrowthComponent } from './hr-analytics-main/staff-attrition/project-type-wise-head-growth/project-type-wise-head-growth.component';
import { ProjectTypeWiseTurnOverComponent } from './hr-analytics-main/staff-attrition/project-type-wise-turn-over/project-type-wise-turn-over.component';
import { HeadGrowthTurnOverCumulativeComponent } from './hr-analytics-main/staff-attrition/head-growth-turn-over-cumulative/head-growth-turn-over-cumulative.component';
import { DepartmentDistributionComponent } from './hr-analytics-main/staff-attrition/department-distribution/department-distribution.component';
import { ResignEmpExperienceComponent } from './hr-analytics-main/staff-attrition/resign-emp-experience/resign-emp-experience.component';
import { EmployeeSummaryPipe } from './models/employee-summary.pipe';

@NgModule({
    declarations: [HrAnalyticsComponent, HrAnalyticsMainComponent, StaffAttritionComponent, CompanyWiseEmployeeSummaryComponent, RecResGrowthTurnSummaryComponent, ProjectTypeWiseRecruitmentComponent, ProjectTypeWiseResignationComponent, RecruimentVsResignationComponent, ProjectTypeWiseHeadGrowthComponent, ProjectTypeWiseHeadGrowthComponent, ProjectTypeWiseTurnOverComponent, HeadGrowthTurnOverCumulativeComponent, DepartmentDistributionComponent, ResignEmpExperienceComponent, EmployeeSummaryPipe],
    imports: [
        CommonModule,
        HrAnalyticsRoutingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule
    ]
})
export class HrAnalyticsModule { }
