import {inject, TestBed} from '@angular/core/testing';

import {AttendanceServiceService} from './attendance-service.service';

describe('AttendanceServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendanceServiceService]
    });
  });

  it('should be created', inject([AttendanceServiceService], (service: AttendanceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
