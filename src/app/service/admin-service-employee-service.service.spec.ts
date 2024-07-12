import { TestBed } from '@angular/core/testing';

import { AdminServiceEmployeeServiceService } from './admin-service-employee-service.service';

describe('AdminServiceEmployeeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminServiceEmployeeServiceService = TestBed.get(AdminServiceEmployeeServiceService);
    expect(service).toBeTruthy();
  });
});
