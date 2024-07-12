import { TestBed } from '@angular/core/testing';

import { AmChartService } from './am-chart.service';

describe('AmChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmChartService = TestBed.get(AmChartService);
    expect(service).toBeTruthy();
  });
});
