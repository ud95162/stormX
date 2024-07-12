import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ProfileAppraisalComponent} from './profile-appraisal.component';
import {ProfileAppraisalPerformanceAppraisalFormComponent} from './profile-appraisal-performance-appraisal-form/profile-appraisal-performance-appraisal-form.component';
import {ProfileAppraisalAppraiseeListViewComponent} from './profile-appraisal-appraisee-list-view/profile-appraisal-appraisee-list-view.component';
import {ProfileAppraisalSelfAppraisalFormComponent} from './profile-appraisal-self-appraisal-form/profile-appraisal-self-appraisal-form.component';
import {ProfileAppraisalAppraisalInterviewsComponent} from './profile-appraisal-appraisal-interviews/profile-appraisal-appraisal-interviews.component';
import {FormsModule} from '@angular/forms';
import {AppraisalComponentModule} from '../../appraisal-components/appraisal-component.module';
import { ProfileAppraisalAccomplishmentsComponent } from './profile-appraisal-accomplishments/profile-appraisal-accomplishments.component';
import { ProfileAppraisalBaseCriteriaEvalComponent } from './profile-appraisal-base-criteria-eval/profile-appraisal-base-criteria-eval.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {LeaveComponentsModule} from "../../leave-components/leave-components.module";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AppraisalComponentModule,
    MatTabsModule,
    NgbNavModule,
    LeaveComponentsModule

  ],
  declarations: [ProfileAppraisalComponent, ProfileAppraisalPerformanceAppraisalFormComponent, ProfileAppraisalAppraiseeListViewComponent, ProfileAppraisalSelfAppraisalFormComponent, ProfileAppraisalAppraisalInterviewsComponent, ProfileAppraisalAccomplishmentsComponent, ProfileAppraisalBaseCriteriaEvalComponent],
  exports: [ProfileAppraisalComponent, ProfileAppraisalPerformanceAppraisalFormComponent, ProfileAppraisalAppraiseeListViewComponent, ProfileAppraisalSelfAppraisalFormComponent, ProfileAppraisalAppraisalInterviewsComponent]
})
export class ProfileAppraisalModule {
}
