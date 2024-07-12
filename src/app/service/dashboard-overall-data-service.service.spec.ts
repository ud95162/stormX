import {inject, TestBed} from '@angular/core/testing';

import {DashboardOverallDataServiceService} from './dashboard-overall-data-service.service';

describe('DashboardOverallDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardOverallDataServiceService]
    });
  });

  it('should be created', inject([DashboardOverallDataServiceService], (service: DashboardOverallDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
