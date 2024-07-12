import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileKnowledgeExtractionComponent} from './profile-knowledge-extraction.component';
import {KnowledgeExtractionModule} from '../../knowledge-extraction/knowledge-extraction.module';

// change this
import {RecruitmentModule} from '../../../body/recruitment-module/recruitment/recruitment.module';

@NgModule({
  imports: [
    CommonModule,
    RecruitmentModule,
    KnowledgeExtractionModule
  ],
  declarations: [ProfileKnowledgeExtractionComponent],
  exports: [ProfileKnowledgeExtractionComponent]
})
export class ProfileKnowledgeExtractionModule { }
