import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsViewTitleComponentComponent} from './settings-view-title-component.component';

describe('SettingsViewTitleComponentComponent', () => {
  let component: SettingsViewTitleComponentComponent;
  let fixture: ComponentFixture<SettingsViewTitleComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsViewTitleComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsViewTitleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
