import { TestBed } from '@angular/core/testing';

import { KnowledgeExtractionCsrService } from './knowledge-extraction-csr.service';

describe('KnowledgeExtractionCsrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KnowledgeExtractionCsrService = TestBed.get(KnowledgeExtractionCsrService);
    expect(service).toBeTruthy();
  });
});
