import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsGradeDefineCardComponent } from './settings-grade-define-card.component';

describe('SettingsGradeDefineCardComponent', () => {
  let component: SettingsGradeDefineCardComponent;
  let fixture: ComponentFixture<SettingsGradeDefineCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsGradeDefineCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsGradeDefineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
