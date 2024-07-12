import {inject, TestBed} from '@angular/core/testing';

import {InterCommunicationServiceService} from './inter-communication-service.service';

describe('InterCommunicationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterCommunicationServiceService]
    });
  });

  it('should be created', inject([InterCommunicationServiceService], (service: InterCommunicationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
