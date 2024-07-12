import { TestBed } from '@angular/core/testing';

import { OpdManagementServiceService } from './opd-management-service.service';

describe('OpdManagementServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpdManagementServiceService = TestBed.get(OpdManagementServiceService);
    expect(service).toBeTruthy();
  });
});
