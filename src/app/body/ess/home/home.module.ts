import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { HomeHeaderUserComponent } from './home-main/home-header-user/home-header-user.component';
import { HomeBodyComponent } from './home-main/home-body/home-body.component';
import { HomeTabEmployeeComponent } from './home-main/home-body/home-tab-content/home-tab-employee/home-tab-employee.component';
import { HomeTabSkillComponent } from './home-main/home-body/home-tab-content/home-tab-skill/home-tab-skill.component';
import { HomeTabProjectComponent } from './home-main/home-body/home-tab-content/home-tab-project/home-tab-project.component';
import { ProjCostComponent } from './home-main/home-body/home-graphs/project/proj-cost/proj-cost.component';
import { ProjForcastComponent } from './home-main/home-body/home-graphs/project/proj-forcast/proj-forcast.component';
import { ECadreDnutComponent } from './home-main/home-body/home-graphs/employee/emp-cadre/e-cadre-dnut/e-cadre-dnut.component';
import { ECadreLineComponent } from './home-main/home-body/home-graphs/employee/emp-cadre/e-cadre-line/e-cadre-line.component';
import { EGenderBarComponent } from './home-main/home-body/home-graphs/employee/emp-gender/e-gender-bar/e-gender-bar.component';
import { EGenderDnutComponent } from './home-main/home-body/home-graphs/employee/emp-gender/e-gender-dnut/e-gender-dnut.component';
import { EOpOviewComponent } from './home-main/home-body/home-graphs/employee/emp-operation/e-op-oview/e-op-oview.component';
import { EOpYearsBarComponent } from './home-main/home-body/home-graphs/employee/emp-operation/e-op-years-bar/e-op-years-bar.component';
import { EOpResBarComponent } from './home-main/home-body/home-graphs/employee/emp-operation/e-res/e-op-res-bar/e-op-res-bar.component';
import { EOpResDnutComponent } from './home-main/home-body/home-graphs/employee/emp-operation/e-res/e-op-res-dnut/e-op-res-dnut.component';
import { ERoleBarComponent } from './home-main/home-body/home-graphs/employee/emp-operation/e-role-bar/e-role-bar.component';
import { EWltClsBarComponent } from './home-main/home-body/home-graphs/employee/emp-wealth/e-wlt-cls-bar/e-wlt-cls-bar.component';
import { EWltDegBarComponent } from './home-main/home-body/home-graphs/employee/emp-wealth/e-wlt-deg-bar/e-wlt-deg-bar.component';
import { EWltUniDnutComponent } from './home-main/home-body/home-graphs/employee/emp-wealth/e-wlt-uni-dnut/e-wlt-uni-dnut.component';
import { ProjBaseComponent } from './home-main/home-body/home-graphs/project/proj-base/proj-base.component';
import { ProjCardComponent } from './home-main/home-body/home-graphs/project/proj-base/proj-card/proj-card.component';
import { AdminDashboardComponentsModule } from '../../../components/admin-dashboard-components/admin-dashboard-components.module';
import { ProjDashboardHeaderComponent } from './home-main/home-body/home-graphs/proj-dashboard-header/proj-dashboard-header.component';
import { HomeTabProjectDashboardComponent } from './home-main/home-body/home-tab-content/home-tab-project-dashboard/home-tab-project-dashboard.component';
import { HomeTabProjectHistoryComponent } from './home-main/home-body/home-tab-content/home-tab-project-history/home-tab-project-history.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeadCountDashboardComponentsModule} from '../../../components/head-count-dashboard-components/head-count-dashboard-components.module';
import { HomeTabComparisonComponent } from './home-main/home-body/home-tab-content/home-tab-comparison/home-tab-comparison.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HomeTabResourceMapComponent } from './home-main/home-body/home-tab-content/home-tab-resource-map/home-tab-resource-map.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HomeTabKnowledgeGraphComponent} from './home-main/home-body/home-tab-content/home-tab-knowledge-graph/home-tab-knowledge-graph.component';
import {KnowledgeGraphAdminModule} from '../../../components/knowledge-graph-admin/knowledge-graph-admin.module';
import {MatSortModule} from "@angular/material/sort";
// import { HomeTabWorkFromHomeDetailedViewComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-detailed-view/home-tab-work-from-home-detailed-view.component';
import { UserEmailPipe } from './home-main/home-body/home-tab-content/home-tab-work-from-home/models/user-email.pipe';
import {ImageUploadModule} from 'angular2-image-upload';
import {AngularFileUploaderModule} from "angular-file-uploader";
import {HomeTabWorkFromHomeHeaderComponent} from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-header/home-tab-work-from-home-header.component';
import {CustomFilterPipe} from './home-main/home-body/home-tab-content/home-tab-work-from-home/models/custom-filter.pipe';
import { HomeTabWorkFromHomeSummaryViewComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-summary-view/home-tab-work-from-home-summary-view.component';
import { HomeTabWorkFromHomeMainComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-main/home-tab-work-from-home-main.component';
import { WfhUserWorkTimeDnutComponent } from './home-main/home-body/home-graphs/work-from-home/wfh-user-work-time-dnut/wfh-user-work-time-dnut.component';
import { WfhProjectLowTimeUserWorkCountBarComponent } from './home-main/home-body/home-graphs/work-from-home/wfh-project-low-time-user-work-count-bar/wfh-project-low-time-user-work-count-bar.component';
import { UniquePipe } from './home-main/home-body/home-tab-content/home-tab-work-from-home/models/filters/unique.pipe';
import { HomeTabLeaveAdminGraphsComponent } from './home-main/home-body/home-tab-content/home-tab-leave-admin-graphs/home-tab-leave-admin-graphs.component';
import { StandardVsSpecialLeaveGraphComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/standard-vs-special-leave-graph/standard-vs-special-leave-graph.component';
import { StandardLeaveTypesGraphComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/standard-leave-types-graph/standard-leave-types-graph.component';
import { TotalCountOfLeavesGraphComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/total-count-of-leaves-graph/total-count-of-leaves-graph.component';
import { SpecialLeaveTypesGraphComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/special-leave-types-graph/special-leave-types-graph.component';
import { HomeTabWorkFromHomeConfigurationsViewComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-configurations-view/home-tab-work-from-home-configurations-view.component';
import { HomeTabWorkFromHomeDetailedSummaryViewComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-detailed-summary-view/home-tab-work-from-home-detailed-summary-view.component';
import { WfhWorkedHoursAnalysisLineChartComponent } from './home-main/home-body/home-graphs/work-from-home/wfh-worked-hours-analysis-line-chart/wfh-worked-hours-analysis-line-chart.component';
import { AttendanceOverviewComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-detailed-summary-view/attendance-overview/attendance-overview.component';
import { WorkedHoursAnalysisComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-detailed-summary-view/worked-hours-analysis/worked-hours-analysis.component';
import { OverallWorkedHoursDistributionComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-detailed-summary-view/overall-worked-hours-distribution/overall-worked-hours-distribution.component';
import { ProjectWiseWorkedHoursDistributionComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-detailed-summary-view/project-wise-worked-hours-distribution/project-wise-worked-hours-distribution.component';
import { LeaveAnalysisComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-detailed-summary-view/leave-analysis/leave-analysis.component';
import { EmployeeWiseWorkedHourAnalysisComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-detailed-summary-view/employee-wise-worked-hour-analysis/employee-wise-worked-hour-analysis.component';
import { TaskTimeAnalysisComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-detailed-summary-view/task-time-analysis/task-time-analysis.component';
import { WfhWorkedHourAnalysisDnutComponent } from './home-main/home-body/home-graphs/work-from-home/wfh-worked-hour-analysis-dnut/wfh-worked-hour-analysis-dnut.component';
import { WfhAverageHoursBarChartComponent } from './home-main/home-body/home-graphs/work-from-home/wfh-average-hours-bar-chart/wfh-average-hours-bar-chart.component';
import { AvgLeaveUtilizationComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/avg-leave-utilization/avg-leave-utilization.component';
import { LeaveApprovalPendingsComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/leave-approval-pendings/leave-approval-pendings.component';
import { NoPayLeavesComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/no-pay-leaves/no-pay-leaves.component';
import { OnsiteVisitAndOfficialLeaveComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/onsite-visit-and-official-leave/onsite-visit-and-official-leave.component';
import { UtilizedLeavesByDesGroupComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/utilized-leaves-by-des-group/utilized-leaves-by-des-group.component';
import { UtilizedComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/utilized/utilized.component';
import { UtilizedLeavesByProjectComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/utilized-leaves-by-project/utilized-leaves-by-project.component';
import { ShortLeaveUtlizationComponent } from './home-main/home-body/home-graphs/leave-admin-graphs/short-leave-utlization/short-leave-utlization.component';
import { HomeTabWorkFromHomeDetailedViewHeaderComponent } from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-detailed-view-header/home-tab-work-from-home-detailed-view-header.component';
import { AmChartsComponent } from './home-main/home-body/home-graphs/am-charts/am-charts.component';
import { UnderConstructionComponent } from './home-main/home-body/home-graphs/under-construction/under-construction.component';
import { DashboardHeaderComponent } from './home-main/home-body/home-graphs/project-dashboard/dashboard-header/dashboard-header.component';
import { ProjectGitlabPerformanceComponent } from './home-main/home-body/home-graphs/project-dashboard/project-gitlab-performance/project-gitlab-performance.component';
import { ProjectPerformanceTimelogComponent } from './home-main/home-body/home-graphs/project-dashboard/project-performance-timelog/project-performance-timelog.component';
import { ProjectFinanceDataComponent } from './home-main/home-body/home-graphs/project-dashboard/project-finance-data/project-finance-data.component';
import { ProjectPerformanceBacklogComponent } from './home-main/home-body/home-graphs/project-dashboard/project-performance-backlog/project-performance-backlog.component';
import { ProjectDesignationCategoryComponent } from './home-main/home-body/home-graphs/project-dashboard/project-designation-category/project-designation-category.component';
import { DesignationWiseMembersComponent } from './home-main/home-body/home-graphs/project-dashboard/designation-wise-members/designation-wise-members.component';
import { MembersDetailsComponent } from './home-main/home-body/home-graphs/project-dashboard/members-details/members-details.component';
import { ProjectHierarchyComponent } from './home-main/home-body/home-graphs/project-dashboard/project-hierarchy/project-hierarchy.component';
import { HomeTabAttendanceComponent } from './home-main/home-body/home-tab-content/home-tab-attendance/home-tab-attendance.component';
import { ProjectsAttendanceComponent } from './home-main/home-body/home-tab-content/home-tab-attendance/projects-attendance/projects-attendance.component';
import { ProjectsAttendancePipe } from './home-main/home-body/home-tab-content/home-tab-attendance/models/projects-attendance.pipe';
import { ProjectWiseComponent } from './home-main/home-body/home-tab-content/home-tab-attendance/projects-attendance/project-wise/project-wise.component';
import { ProjectMembersPipe } from './home-main/home-body/home-tab-content/home-tab-attendance/models/project-members.pipe';
import { AttendanceDashboardComponent } from './home-main/home-body/home-tab-content/home-tab-attendance/attendance-dashboard/attendance-dashboard.component';
import { WorkHoursDistributionComponent } from './home-main/home-body/home-tab-content/home-tab-attendance/attendance-dashboard/work-hours-distribution/work-hours-distribution.component';
import { DateCompanyFiltersComponent } from './home-main/home-body/home-tab-content/home-tab-attendance/date-company-filters/date-company-filters.component';
import { DateRangeFilterComponent } from './home-main/home-body/home-tab-content/home-tab-attendance/date-company-filters/date-range-filter/date-range-filter.component';
import { AttendanceSummeryComponent } from './home-main/home-body/home-tab-content/home-tab-attendance/attendance-dashboard/attendance-summery/attendance-summery.component';
import { OverallAttendanceSummeryComponent } from './home-main/home-body/home-tab-content/home-tab-attendance/attendance-dashboard/overall-attendance-summery/overall-attendance-summery.component';
import { ProjectsPipe } from './home-main/home-body/home-tab-content/home-tab-attendance/models/projects.pipe';
import { DailySummaryCardsComponent } from './home-main/home-body/home-tab-content/home-tab-attendance/attendance-dashboard/daily-summary-cards/daily-summary-cards.component';
import { EmpInOutDistributionComponent } from './home-main/home-body/home-tab-content/home-tab-attendance/attendance-dashboard/emp-in-out-distribution/emp-in-out-distribution.component';
import {HrAnalyticsModule} from "./home-main/home-body/home-tab-content/hr-analytics/hr-analytics.module";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        AdminDashboardComponentsModule,
        FormsModule,
        HeadCountDashboardComponentsModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        KnowledgeGraphAdminModule,
        MatSortModule,
        ImageUploadModule,
        AngularFileUploaderModule,
        HrAnalyticsModule
    ],
  exports: [
    HomeTabProjectHistoryComponent,
    UnderConstructionComponent
  ],
  declarations: [
    HomeComponent,
    HomeMainComponent,
    HomeHeaderUserComponent,
    HomeBodyComponent,
    HomeTabEmployeeComponent,
    HomeTabSkillComponent,
    HomeTabProjectComponent,
    ProjCostComponent,
    ProjForcastComponent,
    ECadreDnutComponent,
    ECadreLineComponent,
    EGenderBarComponent,
    EGenderDnutComponent,
    EOpOviewComponent,
    EOpYearsBarComponent,
    EOpResBarComponent,
    EOpResDnutComponent,
    ERoleBarComponent,
    EWltClsBarComponent,
    EWltDegBarComponent,
    EWltUniDnutComponent,
    ProjBaseComponent,
    ProjCardComponent,
    ProjDashboardHeaderComponent,
    HomeTabProjectDashboardComponent,
    HomeTabProjectHistoryComponent,
    HomeTabComparisonComponent,
    HomeTabResourceMapComponent,
    HomeTabKnowledgeGraphComponent,
    // HomeTabWorkFromHomeDetailedViewComponent,
    HomeTabWorkFromHomeHeaderComponent,
    CustomFilterPipe,
    UserEmailPipe,
    HomeTabWorkFromHomeSummaryViewComponent,
    HomeTabWorkFromHomeMainComponent,
    WfhUserWorkTimeDnutComponent,
    WfhProjectLowTimeUserWorkCountBarComponent,
    UniquePipe,
    HomeTabLeaveAdminGraphsComponent,
    StandardVsSpecialLeaveGraphComponent,
    StandardLeaveTypesGraphComponent,
    TotalCountOfLeavesGraphComponent,
    SpecialLeaveTypesGraphComponent,
    UniquePipe,
    HomeTabWorkFromHomeConfigurationsViewComponent,
    HomeTabWorkFromHomeDetailedSummaryViewComponent,
    WfhWorkedHoursAnalysisLineChartComponent,
    AttendanceOverviewComponent,
    WorkedHoursAnalysisComponent,
    OverallWorkedHoursDistributionComponent,
    ProjectWiseWorkedHoursDistributionComponent,
    LeaveAnalysisComponent,
    EmployeeWiseWorkedHourAnalysisComponent,
    TaskTimeAnalysisComponent,
    WfhWorkedHourAnalysisDnutComponent,
    WfhAverageHoursBarChartComponent,
    AvgLeaveUtilizationComponent,
    LeaveApprovalPendingsComponent,
    NoPayLeavesComponent,
    OnsiteVisitAndOfficialLeaveComponent,
    UtilizedLeavesByDesGroupComponent,
    UtilizedComponent,
    UtilizedLeavesByProjectComponent,
    ShortLeaveUtlizationComponent,
    WfhAverageHoursBarChartComponent,
    HomeTabWorkFromHomeDetailedViewHeaderComponent,
    AmChartsComponent,
    UnderConstructionComponent,
    DashboardHeaderComponent,
    ProjectGitlabPerformanceComponent,
    ProjectPerformanceTimelogComponent,
    ProjectFinanceDataComponent,
    ProjectPerformanceBacklogComponent,
    ProjectDesignationCategoryComponent,
    DesignationWiseMembersComponent,
    MembersDetailsComponent,
    ProjectHierarchyComponent,
    HomeTabAttendanceComponent,
    ProjectsAttendanceComponent,
    ProjectsAttendancePipe,
    ProjectWiseComponent,
    ProjectMembersPipe,
    AttendanceDashboardComponent,
    WorkHoursDistributionComponent,
    DateCompanyFiltersComponent,
    DateRangeFilterComponent,
    AttendanceSummeryComponent,
    OverallAttendanceSummeryComponent,
    ProjectsPipe,
    DailySummaryCardsComponent,
    EmpInOutDistributionComponent,
  ]
})
export class HomeModule {
}
