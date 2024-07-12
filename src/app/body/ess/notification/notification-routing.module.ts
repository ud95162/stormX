import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotificationComponent} from './notification.component';
import {NotificationMainComponent} from './notification-main/notification-main.component';

const routes: Routes = [{
  path: '', component: NotificationComponent,
  children: [{path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: NotificationMainComponent}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule {
}
