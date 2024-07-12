import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FeedRoutingModule} from './feed-routing.module';
import {FeedComponent} from './feed.component';
import {FeedMainComponent} from './feed-main/feed-main.component';
import {FeedCoursesComponent} from './feed-main/feed-view/feed-courses/feed-courses.component';
import {FeedPostsComponent} from './feed-main/feed-view/feed-posts/feed-posts.component';
import {FeedViewComponent} from './feed-main/feed-view/feed-view.component';
import {FeedPostIndividualComponent} from './feed-main/feed-post-individual/feed-post-individual.component';
import {FeedNotificationComponent} from './feed-main/feed-view/feed-notification/feed-notification.component';
import {FeedProfProgressComponent} from './feed-main/feed-view/feed-prof-progress/feed-prof-progress.component';
import {PostsModule} from '../../../components/posts/posts.module';
import {ImageUploadModule} from 'angular2-image-upload';
import {FeedComponentsModule} from '../../../components/feed-components/feed-components.module';
import {EventComponentsModule} from '../../../components/event-components/event-components.module';
import {PageComponentsModule} from '../../../components/page-components/page-components.module';
import {AlertComponentsModule} from '../../../components/alert-components/alert-components.module';
import {WorkFromHomeNewsFeedComponent} from '../../../components/work-from-home-newsfeed/work-from-home-newsFeed.component';

@NgModule({
  imports: [
    CommonModule,
    FeedRoutingModule,
    PostsModule,
    ImageUploadModule.forRoot(),
    FeedComponentsModule,
    EventComponentsModule,
    PageComponentsModule,
    AlertComponentsModule
  ],
  declarations: [WorkFromHomeNewsFeedComponent, FeedComponent, FeedMainComponent, FeedCoursesComponent, FeedPostsComponent, FeedViewComponent, FeedPostIndividualComponent, FeedNotificationComponent, FeedProfProgressComponent]
})
export class FeedModule {
}
