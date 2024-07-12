import { TestBed } from '@angular/core/testing';

import { RatingGroupRatingNameService } from './rating-group-rating-name.service';

describe('RatingGroupRatingNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RatingGroupRatingNameService = TestBed.get(RatingGroupRatingNameService);
    expect(service).toBeTruthy();
  });
});
