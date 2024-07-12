import { TestBed } from '@angular/core/testing';

import { FacilityManagementEventEmitterService } from './facility-management-event-emitter.service';

describe('FacilityManagementEventEmitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacilityManagementEventEmitterService = TestBed.get(FacilityManagementEventEmitterService);
    expect(service).toBeTruthy();
  });
});
