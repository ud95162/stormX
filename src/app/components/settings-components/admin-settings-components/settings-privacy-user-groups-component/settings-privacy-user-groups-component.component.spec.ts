import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsPrivacyUserGroupsComponentComponent} from './settings-privacy-user-groups-component.component';

describe('SettingsPrivacyUserGroupsComponentComponent', () => {
  let component: SettingsPrivacyUserGroupsComponentComponent;
  let fixture: ComponentFixture<SettingsPrivacyUserGroupsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPrivacyUserGroupsComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPrivacyUserGroupsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
