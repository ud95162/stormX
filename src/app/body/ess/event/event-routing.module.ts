import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventComponent} from './event.component';
import {EventMainComponent} from './event-main/event-main.component';
import {EventCreateViewComponent} from './event-main/event-view/event-create-view/event-create-view.component';
import {EventVenueAvailabilityViewComponent} from './event-main/event-view/event-venue-availability-view/event-venue-availability-view.component';
import {EventEditViewComponent} from './event-main/event-view/event-edit-view/event-edit-view.component';

const routes: Routes = [{
  path: '', component: EventComponent,
  children: [{path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: EventMainComponent},
    {path: 'venue', component: EventVenueAvailabilityViewComponent},
    {path: 'create', component: EventCreateViewComponent},
    {path: 'edit', component: EventEditViewComponent}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
