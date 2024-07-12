import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherQualificationsTabEditComponent } from './other-qualifications-tab-edit.component';

describe('OtherQualificationsTabEditComponent', () => {
  let component: OtherQualificationsTabEditComponent;
  let fixture: ComponentFixture<OtherQualificationsTabEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherQualificationsTabEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherQualificationsTabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
