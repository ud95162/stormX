import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsDesignationsDefineCategoryCardComponent} from './settings-designations-define-category-card.component';

describe('SettingsDesignationsDefineCategoryCardComponent', () => {
  let component: SettingsDesignationsDefineCategoryCardComponent;
  let fixture: ComponentFixture<SettingsDesignationsDefineCategoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsDesignationsDefineCategoryCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDesignationsDefineCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
