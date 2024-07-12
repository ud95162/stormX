import { TestBed } from '@angular/core/testing';

import { RnrPillarService } from './rnr-pillar.service';

describe('RnrPillarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RnrPillarService = TestBed.get(RnrPillarService);
    expect(service).toBeTruthy();
  });
});
