import {TestBed} from '@angular/core/testing';

import {PermissionGroupServiceService} from './permission-group-service.service';

describe('PermissionGroupServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermissionGroupServiceService = TestBed.get(PermissionGroupServiceService);
    expect(service).toBeTruthy();
  });
});
