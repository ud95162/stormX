import { TestBed } from '@angular/core/testing';

import { FacilityManagementServiceService } from './facility-management-service.service';

describe('FacilityManagementServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacilityManagementServiceService = TestBed.get(FacilityManagementServiceService);
    expect(service).toBeTruthy();
  });
});
