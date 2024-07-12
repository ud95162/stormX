import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppUsageDashboardComponent} from './app-usage-dashboard/app-usage-dashboard.component';

const routes: Routes = [{
  path: '', component: AppUsageDashboardComponent,
  children: [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: AppUsageDashboardComponent}
  ]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AppUsageDashboardRoutingModule {
}
