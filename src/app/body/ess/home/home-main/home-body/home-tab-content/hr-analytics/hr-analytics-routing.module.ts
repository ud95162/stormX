import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HrAnalyticsComponent} from "./hr-analytics.component";
import {HrAnalyticsMainComponent} from "./hr-analytics-main/hr-analytics-main.component";

const routes: Routes = [{
  path: '', component: HrAnalyticsComponent,
  children: [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: HrAnalyticsMainComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrAnalyticsRoutingModule { }
