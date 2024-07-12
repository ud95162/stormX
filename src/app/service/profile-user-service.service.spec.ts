import {inject, TestBed} from '@angular/core/testing';

import {ProfileUserServiceService} from './profile-user-service.service';

describe('ProfileUserServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileUserServiceService]
    });
  });

  it('should be created', inject([ProfileUserServiceService], (service: ProfileUserServiceService) => {
    expect(service).toBeTruthy();
  }));
});
