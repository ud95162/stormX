import { TestBed } from '@angular/core/testing';

import { SummaryViewService } from './summary-view.service';

describe('SummaryViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummaryViewService = TestBed.get(SummaryViewService);
    expect(service).toBeTruthy();
  });
});
