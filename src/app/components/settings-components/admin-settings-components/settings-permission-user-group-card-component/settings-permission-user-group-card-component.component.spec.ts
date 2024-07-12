import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsPermissionUserGroupCardComponentComponent} from './settings-permission-user-group-card-component.component';

describe('SettingsPermissionUserGroupCardComponentComponent', () => {
  let component: SettingsPermissionUserGroupCardComponentComponent;
  let fixture: ComponentFixture<SettingsPermissionUserGroupCardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPermissionUserGroupCardComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPermissionUserGroupCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
