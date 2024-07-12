import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRequestsComponent} from './profile-requests.component';
import {LetterRequestsComponent} from './letter-requests/letter-requests.component';
import {FormsModule} from '@angular/forms';
import {ImageUploadModule} from 'angular2-image-upload';
import {AngularFileUploaderModule} from "angular-file-uploader";
import {NgxDropzoneModule} from 'ngx-dropzone';
import { ProfileChangePasswordComponent } from './profile-change-password/profile-change-password.component';

@NgModule({
  imports: [
    CommonModule,
    ImageUploadModule.forRoot(),
    FormsModule,
    AngularFileUploaderModule,
    NgxDropzoneModule,
    // PasswordStrengthMeterModule
  ],
  declarations: [ProfileRequestsComponent, LetterRequestsComponent, ProfileChangePasswordComponent],
  exports: [ProfileRequestsComponent, LetterRequestsComponent, ProfileChangePasswordComponent]
})
export class ProfileRequestsModule {
}
