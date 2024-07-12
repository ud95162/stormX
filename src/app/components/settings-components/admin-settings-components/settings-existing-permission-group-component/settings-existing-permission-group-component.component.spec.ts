import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsExistingPermissionGroupComponentComponent} from './settings-existing-permission-group-component.component';

describe('SettingsExistingPermissionGroupComponentComponent', () => {
  let component: SettingsExistingPermissionGroupComponentComponent;
  let fixture: ComponentFixture<SettingsExistingPermissionGroupComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsExistingPermissionGroupComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsExistingPermissionGroupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
