import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsPageRequestsListComponentComponent} from './settings-page-requests-list-component.component';

describe('SettingsPageRequestsListComponentComponent', () => {
  let component: SettingsPageRequestsListComponentComponent;
  let fixture: ComponentFixture<SettingsPageRequestsListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPageRequestsListComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageRequestsListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
