import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsGradeListComponent } from './settings-grade-list.component';

describe('SettingsGradeListComponent', () => {
  let component: SettingsGradeListComponent;
  let fixture: ComponentFixture<SettingsGradeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsGradeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsGradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
