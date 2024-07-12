import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsModalComponent } from './qualifications-modal.component';

describe('QualificationsModalComponent', () => {
  let component: QualificationsModalComponent;
  let fixture: ComponentFixture<QualificationsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
