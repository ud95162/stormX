import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileInterviewComponent} from './profile-interview.component';
import {RecruitmentModule} from '../../../body/recruitment-module/recruitment/recruitment.module';

@NgModule({
  imports: [
    CommonModule,
    RecruitmentModule
  ],
  declarations: [ProfileInterviewComponent],
  exports: [ProfileInterviewComponent]
})
export class ProfileInterviewModule {
}
