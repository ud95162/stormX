import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from 'app/body/ess/home/home.component';
import {HomeMainComponent} from './home-main/home-main.component';
import {HomeTabEmployeeComponent} from './home-main/home-body/home-tab-content/home-tab-employee/home-tab-employee.component';
import {HomeTabWorkFromHomeDetailedSummaryViewComponent} from './home-main/home-body/home-tab-content/home-tab-work-from-home/home-tab-work-from-home-detailed-summary-view/home-tab-work-from-home-detailed-summary-view.component';
import {HomeTabLeaveAdminGraphsComponent} from './home-main/home-body/home-tab-content/home-tab-leave-admin-graphs/home-tab-leave-admin-graphs.component';
import {HomeTabProjectComponent} from './home-main/home-body/home-tab-content/home-tab-project/home-tab-project.component';
import {UnderConstructionComponent} from './home-main/home-body/home-graphs/under-construction/under-construction.component';
import {
  HomeTabAttendanceComponent
} from "./home-main/home-body/home-tab-content/home-tab-attendance/home-tab-attendance.component";
import {
  HomeTabKnowledgeGraphComponent
} from "./home-main/home-body/home-tab-content/home-tab-knowledge-graph/home-tab-knowledge-graph.component";

const routes: Routes = [{
  path: '', component: HomeComponent,
  children: [{path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: HomeMainComponent},
    {path: 'employee', component: HomeTabEmployeeComponent},
    {path: 'work-effort', component: HomeTabWorkFromHomeDetailedSummaryViewComponent},
    {path: 'leave', component: HomeTabLeaveAdminGraphsComponent},
    {path: 'project', component: HomeTabProjectComponent},
    {path: 'under-construction', component: UnderConstructionComponent},
    {path: 'attendance', component: HomeTabAttendanceComponent},
    {path: 'knowledge-graph', component: HomeTabKnowledgeGraphComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
