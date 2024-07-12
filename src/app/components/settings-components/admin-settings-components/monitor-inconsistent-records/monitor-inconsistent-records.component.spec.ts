import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorInconsistentRecordsComponent } from './monitor-inconsistent-records.component';

describe('MonitorInconsistentRecordsComponent', () => {
  let component: MonitorInconsistentRecordsComponent;
  let fixture: ComponentFixture<MonitorInconsistentRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorInconsistentRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorInconsistentRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
