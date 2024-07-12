import {TestBed} from '@angular/core/testing';

import {IssueLetterServiceService} from './issue-letter-service.service';

describe('IssueLetterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueLetterServiceService = TestBed.get(IssueLetterServiceService);
    expect(service).toBeTruthy();
  });
});
