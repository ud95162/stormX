import {TestBed} from '@angular/core/testing';

import {SearchTrainingServiceService} from './search-training-service.service';

describe('SearchTrainingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchTrainingServiceService = TestBed.get(SearchTrainingServiceService);
    expect(service).toBeTruthy();
  });
});
