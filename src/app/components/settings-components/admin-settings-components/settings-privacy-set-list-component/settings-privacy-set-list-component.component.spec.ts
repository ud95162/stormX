import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsPrivacySetListComponentComponent} from './settings-privacy-set-list-component.component';

describe('SettingsPrivacySetListComponentComponent', () => {
  let component: SettingsPrivacySetListComponentComponent;
  let fixture: ComponentFixture<SettingsPrivacySetListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPrivacySetListComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPrivacySetListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
