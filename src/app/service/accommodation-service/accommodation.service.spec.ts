import { TestBed } from '@angular/core/testing';

import { AccommodationService } from './accommodation.service';

describe('AccomodationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccommodationService = TestBed.get(AccommodationService);
    expect(service).toBeTruthy();
  });
});
