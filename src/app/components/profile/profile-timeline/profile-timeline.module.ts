import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileTimelineCardComponent} from './profile-timeline-card/profile-timeline-card.component';
import {ProfileTimelineComponent} from './profile-timeline.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {FormsModule} from '@angular/forms';
import { ProfileTimelineAddRecordModalComponent } from './profile-timeline-modals/profile-timeline-add-record-modal/profile-timeline-add-record-modal.component';
import { ProfileTimelineEditModalComponent } from './profile-timeline-edit-modal/profile-timeline-edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ImageUploadModule.forRoot(),
    FormsModule
  ],
  declarations: [
    ProfileTimelineCardComponent,
    ProfileTimelineComponent,
    ProfileTimelineAddRecordModalComponent,
    ProfileTimelineEditModalComponent
  ],
  exports: [ProfileTimelineComponent]
})
export class ProfileTimelineModule { }
