import { TestBed } from '@angular/core/testing';

import { FaceRecAttendanceService } from './face-rec-attendance.service';

describe('FaceRecAttendanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaceRecAttendanceService = TestBed.get(FaceRecAttendanceService);
    expect(service).toBeTruthy();
  });
});
