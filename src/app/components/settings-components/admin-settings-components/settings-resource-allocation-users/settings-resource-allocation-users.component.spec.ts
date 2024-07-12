import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsResourceAllocationUsersComponent } from './settings-resource-allocation-users.component';

describe('SettingsResourceAllocationUsersComponent', () => {
  let component: SettingsResourceAllocationUsersComponent;
  let fixture: ComponentFixture<SettingsResourceAllocationUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsResourceAllocationUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsResourceAllocationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
