import { TestBed } from '@angular/core/testing';

import { KpiServiceService } from './kpi-service.service';

describe('KpiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KpiServiceService = TestBed.get(KpiServiceService);
    expect(service).toBeTruthy();
  });
});
