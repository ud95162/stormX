import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventRoutingModule} from './event-routing.module';
import {EventComponent} from './event.component';
import {EventMainComponent} from './event-main/event-main.component';
import {FeedComponentsModule} from '../../../components/feed-components/feed-components.module';
import {EventComponentsModule} from '../../../components/event-components/event-components.module';
import {PostsModule} from '../../../components/posts/posts.module';
import {EventCreateViewComponent} from './event-main/event-view/event-create-view/event-create-view.component';
import {EventCalendarViewComponent} from './event-main/event-view/event-calendar-view/event-calendar-view.component';
import {EventVenueAvailabilityViewComponent} from './event-main/event-view/event-venue-availability-view/event-venue-availability-view.component';
import {EventViewSidebarComponent} from './event-main/event-view/event-view-sidebar/event-view-sidebar.component';
import {EventEditViewComponent} from './event-main/event-view/event-edit-view/event-edit-view.component';
import {FormsModule} from '@angular/forms';
import {AlertComponentsModule} from '../../../components/alert-components/alert-components.module';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    FeedComponentsModule,
    EventComponentsModule,
    PostsModule,
    FormsModule,
    AlertComponentsModule,
  ],
  declarations: [
    EventComponent,
    EventMainComponent,
    EventCreateViewComponent,
    EventCalendarViewComponent,
    EventVenueAvailabilityViewComponent,
    EventViewSidebarComponent,
    EventEditViewComponent
  ]
})
export class EventModule {
}
