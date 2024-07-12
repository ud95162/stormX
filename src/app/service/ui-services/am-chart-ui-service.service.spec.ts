import { TestBed } from '@angular/core/testing';

import { AmChartUiServiceService } from './am-chart-ui-service.service';

describe('AmChartUiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmChartUiServiceService = TestBed.get(AmChartUiServiceService);
    expect(service).toBeTruthy();
  });
});
