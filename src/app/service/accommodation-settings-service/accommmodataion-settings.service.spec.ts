import { TestBed } from '@angular/core/testing';

import { AccommmodataionSettingsService } from './accommmodataion-settings.service';

describe('AccommmodataionSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccommmodataionSettingsService = TestBed.get(AccommmodataionSettingsService);
    expect(service).toBeTruthy();
  });
});
