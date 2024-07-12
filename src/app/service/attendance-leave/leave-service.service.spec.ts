import {TestBed} from '@angular/core/testing';

import {LeaveServiceService} from './leave-service.service';

describe('LeaveServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveServiceService = TestBed.get(LeaveServiceService);
    expect(service).toBeTruthy();
  });
});
