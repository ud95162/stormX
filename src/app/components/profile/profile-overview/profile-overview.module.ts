import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {ProfileTimelineComponent} from '../profile-timeline/profile-timeline.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {ProfileOverviewComponent} from './profile-overview.component';
import {FormsModule} from '@angular/forms';
import { GitJiraDashboardComponent } from './profile-git-jira-dashboard/git-jira-dashboard.component';
import { DailyDashboardComponent } from './profile-daily-dashboard/daily-dashboard.component';
import { TimeRangeSelectorComponent } from './profile-time-range-selector/time-range-selector.component';
import { ProfileUserProjectsComponent } from './profile-user-projects/profile-user-projects.component';
import { ProfileSkillChartComponent } from './profile-skill-chart/profile-skill-chart.component';
import { ProfileCodelineIssueChartComponent } from './profile-codeline-issue-chart/profile-codeline-issue-chart.component';
import { ProfileAchievementsComponent } from './profile-achievements/profile-achievements.component';
import { ProfileExtraActivitiesComponent } from './profile-extra-activities/profile-extra-activities.component';
import {AppModule} from '../../../app.module';
// import {ProfileTimelineCardComponent} from "../profile-timeline/profile-timeline-card/profile-timeline-card.component";
// import {ProfileTimelineCardComponent} from '../profile-timeline/profile-timeline-card/profile-timeline-card.component';

@NgModule({
  imports: [
    CommonModule,
    ImageUploadModule.forRoot(),
    FormsModule
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [
    ProfileOverviewComponent, GitJiraDashboardComponent, DailyDashboardComponent, TimeRangeSelectorComponent, ProfileUserProjectsComponent, ProfileSkillChartComponent, ProfileCodelineIssueChartComponent, ProfileAchievementsComponent, ProfileExtraActivitiesComponent
  ],
  exports: [ProfileOverviewComponent]
})
export class ProfileOverviewModule {
}
