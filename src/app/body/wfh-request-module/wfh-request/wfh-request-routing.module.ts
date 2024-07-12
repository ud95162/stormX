import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WfhRequestComponent} from './wfh-request.component';
import {WfhRequestMainComponent} from './wfh-request-main/wfh-request-main.component';
import {WfhRequestAdminViewComponent} from './wfh-request-main/wfh-request-admin-view/wfh-request-admin-view.component';

const routes: Routes = [{
  path: '', component: WfhRequestComponent,
  children: [{path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: WfhRequestMainComponent},
    {path: 'admin/main', component: WfhRequestAdminViewComponent}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WfhRequestRoutingModule { }
