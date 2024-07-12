import { TestBed } from '@angular/core/testing';

import { OpdManagementEventEmitterService } from './opd-management-event-emitter.service';

describe('OpdManagementEventEmitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpdManagementEventEmitterService = TestBed.get(OpdManagementEventEmitterService);
    expect(service).toBeTruthy();
  });
});
