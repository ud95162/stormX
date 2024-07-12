import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileFeedbackModule} from '../profile-feedback/profile-feedback.module';
import {ProfileBodyComponent} from './profile-body.component';
import {ProfileOverviewModule} from '../profile-overview/profile-overview.module';
import {ProfilePostModule} from '../profile-post/profile-post.module';
import {ProfileReviewModule} from '../profile-review/profile-review.module';
import {ProfileResumeModule} from '../profile-resume/profile-resume.module';
import {ProfileInterviewModule} from '../profile-interview/profile-interview.module';
import {ProfileAppraisalModule} from '../profile-appraisal/profile-appraisal.module';
import {ProfileKnowledgeExtractionModule} from '../profile-knowledge-extraction/profile-knowledge-extraction.module';
import {ProfileHeaderModule} from '../profile-header/profile-header.module';
import {ProfileTimelineCardComponent} from '../profile-timeline/profile-timeline-card/profile-timeline-card.component';
import {ProfileTimelineModule} from '../profile-timeline/profile-timeline.module';
import {ProfileSummaryModule} from "../profile-summary/profile-summary.module";
import {ProfileAttendanceModule} from "../profile-attendance/profile-attendance.module";

@NgModule({
    imports: [
        CommonModule,
        ProfileOverviewModule,
        ProfilePostModule,
        ProfileReviewModule,
        ProfileResumeModule,
        ProfileInterviewModule,
        ProfileAppraisalModule,
        ProfileFeedbackModule,
        ProfileKnowledgeExtractionModule,
        ProfileHeaderModule,
        ProfileTimelineModule,
        ProfileSummaryModule,
        ProfileAttendanceModule,

    ],
  declarations: [ProfileBodyComponent],
  exports: [ProfileBodyComponent]
})
export class ProfileBodyModule {
}
