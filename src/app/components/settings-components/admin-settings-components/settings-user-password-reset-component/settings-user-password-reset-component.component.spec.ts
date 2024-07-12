import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsUserPasswordResetComponentComponent } from './settings-user-password-reset-component.component';

describe('SettingsUserPasswordResetComponentComponent', () => {
  let component: SettingsUserPasswordResetComponentComponent;
  let fixture: ComponentFixture<SettingsUserPasswordResetComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsUserPasswordResetComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsUserPasswordResetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
