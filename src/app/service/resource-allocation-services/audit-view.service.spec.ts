import { TestBed } from '@angular/core/testing';

import { AuditViewService } from './audit-view.service';

describe('AuditViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditViewService = TestBed.get(AuditViewService);
    expect(service).toBeTruthy();
  });
});
