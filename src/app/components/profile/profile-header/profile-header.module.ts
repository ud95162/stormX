import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderCardComponent} from './header-card/header-card.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {PostsModule} from '../../posts/posts.module';
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
  declarations: [HeaderCardComponent],
  exports: [HeaderCardComponent]
})
export class ProfileHeaderModule {
}
