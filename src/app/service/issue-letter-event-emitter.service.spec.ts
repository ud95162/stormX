import { TestBed } from '@angular/core/testing';

import { IssueLetterEventEmitterService } from './issue-letter-event-emitter.service';

describe('IssueLetterEventEmitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueLetterEventEmitterService = TestBed.get(IssueLetterEventEmitterService);
    expect(service).toBeTruthy();
  });
});
