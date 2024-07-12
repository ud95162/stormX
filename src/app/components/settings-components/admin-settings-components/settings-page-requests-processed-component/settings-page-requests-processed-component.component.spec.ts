import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsPageRequestsProcessedComponentComponent} from './settings-page-requests-processed-component.component';

describe('SettingsPageRequestsProcessedComponentComponent', () => {
  let component: SettingsPageRequestsProcessedComponentComponent;
  let fixture: ComponentFixture<SettingsPageRequestsProcessedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPageRequestsProcessedComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageRequestsProcessedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
