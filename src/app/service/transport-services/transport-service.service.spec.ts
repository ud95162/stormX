import { TestBed } from '@angular/core/testing';

import { TransportServiceService } from './transport-service.service';

describe('TransportServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransportServiceService = TestBed.get(TransportServiceService);
    expect(service).toBeTruthy();
  });
});
