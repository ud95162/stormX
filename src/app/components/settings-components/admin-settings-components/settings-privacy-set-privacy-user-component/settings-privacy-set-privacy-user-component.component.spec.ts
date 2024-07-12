import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsPrivacySetPrivacyUserComponentComponent} from './settings-privacy-set-privacy-user-component.component';

describe('SettingsPrivacySetPrivacyUserComponentComponent', () => {
  let component: SettingsPrivacySetPrivacyUserComponentComponent;
  let fixture: ComponentFixture<SettingsPrivacySetPrivacyUserComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPrivacySetPrivacyUserComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPrivacySetPrivacyUserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
