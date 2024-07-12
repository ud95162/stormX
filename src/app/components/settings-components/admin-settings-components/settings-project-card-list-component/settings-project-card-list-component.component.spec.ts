import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsProjectCardListComponentComponent} from './settings-project-card-list-component.component';

describe('SettingsProjectCardListComponentComponent', () => {
  let component: SettingsProjectCardListComponentComponent;
  let fixture: ComponentFixture<SettingsProjectCardListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsProjectCardListComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsProjectCardListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
