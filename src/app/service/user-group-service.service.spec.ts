import {TestBed} from '@angular/core/testing';

import {UserGroupServiceService} from './user-group-service.service';

describe('UserGroupServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserGroupServiceService = TestBed.get(UserGroupServiceService);
    expect(service).toBeTruthy();
  });
});
