import { TestBed } from '@angular/core/testing';

import { SeatPlanServiceService } from './seat-plan-service.service';

describe('SeatPlanServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeatPlanServiceService = TestBed.get(SeatPlanServiceService);
    expect(service).toBeTruthy();
  });
});
