import { TestBed } from '@angular/core/testing';

import { ModalUiServiceService } from './modal-ui-service.service';

describe('ModalUiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalUiServiceService = TestBed.get(ModalUiServiceService);
    expect(service).toBeTruthy();
  });
});
