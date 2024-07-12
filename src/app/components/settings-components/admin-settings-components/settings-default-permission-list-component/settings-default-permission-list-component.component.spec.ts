import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsDefaultPermissionListComponentComponent} from './settings-default-permission-list-component.component';

describe('SettingsDefaultPermissionListComponentComponent', () => {
  let component: SettingsDefaultPermissionListComponentComponent;
  let fixture: ComponentFixture<SettingsDefaultPermissionListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsDefaultPermissionListComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDefaultPermissionListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
