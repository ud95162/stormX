import { TestBed } from '@angular/core/testing';

import { KnowledgeExtractionSkillsService } from './knowledge-extraction-skills.service';

describe('KnowledgeExtractionSkillsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KnowledgeExtractionSkillsService = TestBed.get(KnowledgeExtractionSkillsService);
    expect(service).toBeTruthy();
  });
});
