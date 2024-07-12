import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProfileFeedbackPersonalComponent} from './profile-feedback-personal/profile-feedback-personal.component';
import {ProfileFeedbackComponent} from './profile-feedback.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProfileFeedbackAdminComponent} from './profile-feedback-admin/profile-feedback-admin.component';
import { ProfileFeedbackExcecutiveComponent } from './profile-feedback-excecutive/profile-feedback-excecutive.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    NgbModule,
    MatTabsModule
  ],
  declarations: [ProfileFeedbackComponent, ProfileFeedbackPersonalComponent, ProfileFeedbackAdminComponent, ProfileFeedbackExcecutiveComponent],
  exports: [ProfileFeedbackComponent, ProfileFeedbackPersonalComponent, ProfileFeedbackAdminComponent]
})
export class ProfileFeedbackModule {
}
