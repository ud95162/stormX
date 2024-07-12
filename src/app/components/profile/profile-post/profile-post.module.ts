import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaggedPhotosComponent} from './tagged-photos/tagged-photos.component';
import {ProfilePostComponent} from './profile-post.component';
import {ProfileOnlineListComponent} from './profile-online-list/profile-online-list.component';
import {ProfileFeedComponent} from './profile-feed/profile-feed.component';
import {PostsModule} from '../../posts/posts.module';
import {ImageUploadModule} from 'angular2-image-upload';
import {AlertComponentsModule} from '../../alert-components/alert-components.module';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    PostsModule,
    ImageUploadModule.forRoot(),
    AlertComponentsModule,
    FormsModule
  ],
  declarations: [TaggedPhotosComponent, ProfilePostComponent, ProfileOnlineListComponent, ProfileFeedComponent],
  exports: [TaggedPhotosComponent, ProfilePostComponent, ProfileOnlineListComponent, ProfileFeedComponent]
})

export class ProfilePostModule {
}
