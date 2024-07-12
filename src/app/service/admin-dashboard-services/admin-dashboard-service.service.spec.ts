import {TestBed} from '@angular/core/testing';

import {AdminDashboardServiceService} from './admin-dashboard-service.service';

describe('AdminDashboardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminDashboardServiceService = TestBed.get(AdminDashboardServiceService);
    expect(service).toBeTruthy();
  });
});
