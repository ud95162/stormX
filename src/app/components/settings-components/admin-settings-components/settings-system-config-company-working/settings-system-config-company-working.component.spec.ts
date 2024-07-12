import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsSystemConfigCompanyWorkingComponent} from './settings-system-config-company-working.component';

describe('SettingsSystemConfigCompanyWorkingComponent', () => {
  let component: SettingsSystemConfigCompanyWorkingComponent;
  let fixture: ComponentFixture<SettingsSystemConfigCompanyWorkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsSystemConfigCompanyWorkingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSystemConfigCompanyWorkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
