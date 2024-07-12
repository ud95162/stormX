import { TestBed } from '@angular/core/testing';

import { PulseResourcesService } from './pulse-resources.service';

describe('PulseResourcesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PulseResourcesService = TestBed.get(PulseResourcesService);
    expect(service).toBeTruthy();
  });
});
