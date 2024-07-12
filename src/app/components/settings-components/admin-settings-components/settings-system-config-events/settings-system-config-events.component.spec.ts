import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsSystemConfigEventsComponent} from './settings-system-config-events.component';

describe('SettingsSystemConfigEventsComponent', () => {
  let component: SettingsSystemConfigEventsComponent;
  let fixture: ComponentFixture<SettingsSystemConfigEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsSystemConfigEventsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSystemConfigEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
