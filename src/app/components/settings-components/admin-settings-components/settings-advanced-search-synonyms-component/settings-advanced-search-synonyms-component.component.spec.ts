import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsAdvancedSearchSynonymsComponentComponent} from './settings-advanced-search-synonyms-component.component';

describe('SettingsAdvancedSearchSynonymsComponentComponent', () => {
  let component: SettingsAdvancedSearchSynonymsComponentComponent;
  let fixture: ComponentFixture<SettingsAdvancedSearchSynonymsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsAdvancedSearchSynonymsComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAdvancedSearchSynonymsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
