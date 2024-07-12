import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsUserGroupsLayoutComponentComponent} from './settings-user-groups-layout-component.component';

describe('SettingsUserGroupsLayoutComponentComponent', () => {
  let component: SettingsUserGroupsLayoutComponentComponent;
  let fixture: ComponentFixture<SettingsUserGroupsLayoutComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsUserGroupsLayoutComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsUserGroupsLayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
