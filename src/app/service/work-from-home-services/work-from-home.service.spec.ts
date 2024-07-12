import { TestBed } from '@angular/core/testing';

import { WorkFromHomeService } from './work-from-home.service';

describe('WorkFromHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkFromHomeService = TestBed.get(WorkFromHomeService);
    expect(service).toBeTruthy();
  });
});
