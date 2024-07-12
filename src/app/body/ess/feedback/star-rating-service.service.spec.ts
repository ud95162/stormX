import { TestBed } from '@angular/core/testing';

import { StarRatingServiceService } from './star-rating-service.service';

describe('StarRatingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StarRatingServiceService = TestBed.get(StarRatingServiceService);
    expect(service).toBeTruthy();
  });
});
