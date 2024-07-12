import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsPermissionUserGroupsLayoutComponentComponent} from './settings-permission-user-groups-layout-component.component';

describe('SettingsPermissionUserGroupsLayoutComponentComponent', () => {
  let component: SettingsPermissionUserGroupsLayoutComponentComponent;
  let fixture: ComponentFixture<SettingsPermissionUserGroupsLayoutComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPermissionUserGroupsLayoutComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPermissionUserGroupsLayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
