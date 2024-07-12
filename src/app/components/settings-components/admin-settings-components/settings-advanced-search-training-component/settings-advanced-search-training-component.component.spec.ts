import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsAdvancedSearchTrainingComponentComponent} from './settings-advanced-search-training-component.component';

describe('SettingsAdvancedSearchTrainingComponentComponent', () => {
  let component: SettingsAdvancedSearchTrainingComponentComponent;
  let fixture: ComponentFixture<SettingsAdvancedSearchTrainingComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsAdvancedSearchTrainingComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAdvancedSearchTrainingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
