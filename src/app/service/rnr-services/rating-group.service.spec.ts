import { TestBed } from '@angular/core/testing';

import { RatingGroupService } from './rating-group.service';

describe('RatingGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RatingGroupService = TestBed.get(RatingGroupService);
    expect(service).toBeTruthy();
  });
});
