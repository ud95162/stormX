import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {ProfileMainComponent} from './profile-main/profile-main.component';
import {ProfileUserComponent} from './profile-main/profile-user/profile-user.component';
import {ProfileSearchComponent} from './profile-main/profile-search/profile-search.component';
import {ProfileLogsComponent} from './profile-main/profile-logs/profile-logs.component';
import {ActivityLogComponent} from './profile-main/profile-logs/tab-content/activity-log/activity-log.component';
import {PostsModule} from '../../../components/posts/posts.module';
import {ReviewsModule} from '../../../components/reviews/reviews.module';
import {ResumeModule} from '../../../components/resume/resume.module';
import {ProfileOverviewModule} from '../../../components/profile/profile-overview/profile-overview.module';
import {ProfileHeaderModule} from '../../../components/profile/profile-header/profile-header.module';
import {ProfilePostModule} from '../../../components/profile/profile-post/profile-post.module';
import {ImageUploadModule} from 'angular2-image-upload';
import {ProfileBodyModule} from '../../../components/profile/profile-body/profile-body.module';
import {AlertComponentsModule} from '../../../components/alert-components/alert-components.module';
import {ProfileTimelineModule} from '../../../components/profile/profile-timeline/profile-timeline.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PostsModule,
    ReviewsModule,
    ResumeModule,
    ProfileOverviewModule,
    ProfileHeaderModule,
    ProfileTimelineModule,
    ProfilePostModule,
    ImageUploadModule.forRoot(),
    ProfileBodyModule,
    AlertComponentsModule,
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [ProfileComponent, ProfileMainComponent, ProfileUserComponent, ProfileSearchComponent, ProfileLogsComponent, ActivityLogComponent],
  exports: [
    ProfileComponent
  ],

})
export class ProfileModule {
}
