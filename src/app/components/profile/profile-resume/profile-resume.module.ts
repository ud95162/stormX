import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileResumeComponent} from './profile-resume.component';
import {ResumeModule} from '../../resume/resume.module';
import {ProfileResumeAddSectionComponent} from './profile-resume-add-section/profile-resume-add-section.component';
import {AddQualificationComponent} from './profile-resume-add-section/add-qualification/add-qualification.component';
import {AddSkillComponent} from './profile-resume-add-section/add-skill/add-skill.component';
import {AddFamilyComponent} from './profile-resume-add-section/add-family/add-family.component';
import {HomeModule} from '../../../body/ess/home/home.module';
import {HomeTabProjectHistoryComponent} from '../../../body/ess/home/home-main/home-body/home-tab-content/home-tab-project-history/home-tab-project-history.component';
import {AddPreviousWorkDetailComponent} from './profile-resume-add-section/add-previous-work-detail/add-previous-work-detail.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProfileResumeModalsComponent} from './profile-resume-modals/profile-resume-modals.component';
import {PersonalDetailsModalComponent} from './profile-resume-modals/personal-details-modal/personal-details-modal.component';
import {PersonalTabComponent} from './profile-resume-modals/personal-details-modal/personal-tab/personal-tab.component';
import {FamilyTabComponent} from './profile-resume-modals/personal-details-modal/family-tab/family-tab.component';
import {ContactTabComponent} from './profile-resume-modals/personal-details-modal/contact-tab/contact-tab.component';
import {MedicalTabComponent} from './profile-resume-modals/personal-details-modal/medical-tab/medical-tab.component';
import { QualificationsModalComponent } from './profile-resume-modals/qualifications-modal/qualifications-modal.component';
import { EducationTabNewComponent } from './profile-resume-modals/qualifications-modal/education-tab-new/education-tab-new.component';
import { OtherQualificationsTabNewComponent } from './profile-resume-modals/qualifications-modal/other-qualifications-tab-new/other-qualifications-tab-new.component';
import {ResourceAllocationComponentsModule} from "../../resource-allocation-components/resource-allocation-components.module";
import {EducationFilterPipePipe} from './profile-resume-add-section/model/education-filter-pipe.pipe';
import { EducationTabEditComponent } from './profile-resume-modals/qualifications-modal/education-tab-edit/education-tab-edit.component';
import { OtherQualificationsTabEditComponent } from './profile-resume-modals/qualifications-modal/other-qualifications-tab-edit/other-qualifications-tab-edit.component';
import { SkillsModalComponent } from './profile-resume-modals/skills-modal/skills-modal.component';
import { SkillsNewComponent } from './profile-resume-modals/skills-modal/skills-new/skills-new.component';
import { SkillsEditComponent } from './profile-resume-modals/skills-modal/skills-edit/skills-edit.component';
import { AccomplishmentsModalComponent } from './profile-resume-modals/accomplishments-modal/accomplishments-modal.component';
import { AccomplishmentNewComponent } from './profile-resume-modals/accomplishments-modal/accomplishment-new/accomplishment-new.component';
import { AccomplishmentEditComponent } from './profile-resume-modals/accomplishments-modal/accomplishment-edit/accomplishment-edit.component';
import { PrevWorkDetailsModalComponent } from './profile-resume-modals/prev-work-details-modal/prev-work-details-modal.component';
import { PrevWorkNewComponent } from './profile-resume-modals/prev-work-details-modal/prev-work-new/prev-work-new.component';
import { PrevWorkEditComponent } from './profile-resume-modals/prev-work-details-modal/prev-work-edit/prev-work-edit.component';
import {ImageUploadModule} from "angular2-image-upload";
import { EmergencyContactTabComponent } from './profile-resume-modals/personal-details-modal/emergency-contact-tab/emergency-contact-tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SkillHistoryComponent } from './profile-resume-modals/skills-modal/skill-history/skill-history.component';

@NgModule({
  imports: [
    CommonModule,
    ResumeModule,
    HomeModule,
    FormsModule,
    NgbModule,
    ResourceAllocationComponentsModule,
    ImageUploadModule,
    MatTabsModule
  ],
  declarations: [ProfileResumeComponent, ProfileResumeAddSectionComponent, AddQualificationComponent, AddSkillComponent,
    AddFamilyComponent, AddPreviousWorkDetailComponent, AddPreviousWorkDetailComponent, ProfileResumeModalsComponent,
    PersonalDetailsModalComponent, PersonalTabComponent, FamilyTabComponent, ContactTabComponent, MedicalTabComponent,
    QualificationsModalComponent, EducationTabNewComponent, OtherQualificationsTabNewComponent, EducationFilterPipePipe,
    EducationTabEditComponent,
    OtherQualificationsTabEditComponent,
    SkillsModalComponent,
    SkillsNewComponent,
    SkillsEditComponent,
    AccomplishmentsModalComponent,
    AccomplishmentNewComponent,
    AccomplishmentEditComponent,
    PrevWorkDetailsModalComponent,
    PrevWorkNewComponent,
    PrevWorkEditComponent,
    EmergencyContactTabComponent,
    SkillHistoryComponent],
  exports: [ProfileResumeComponent]
})
export class ProfileResumeModule {
}
