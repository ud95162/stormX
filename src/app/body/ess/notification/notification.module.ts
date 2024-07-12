import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotificationRoutingModule} from './notification-routing.module';
import {NotificationComponent} from './notification.component';
import {NotificationMainComponent} from './notification-main/notification-main.component';
import {NotiBdayCalComponent} from './notification-main/noti-bday-cal/noti-bday-cal.component';
import {NotiEventComponent} from './notification-main/noti-event/noti-event.component';
import {NotiListComponent} from './notification-main/noti-list/noti-list.component';
import {NotiHrCalenderComponent} from './notification-main/noti-hr-calender/noti-hr-calender.component';
import {AlertComponentsModule} from '../../../components/alert-components/alert-components.module';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    AlertComponentsModule,
    FormsModule
  ],
  declarations: [NotificationComponent, NotificationMainComponent, NotiBdayCalComponent, NotiEventComponent, NotiListComponent, NotiHrCalenderComponent]
})
export class NotificationModule {
}
