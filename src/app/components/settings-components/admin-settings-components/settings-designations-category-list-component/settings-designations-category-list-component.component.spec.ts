import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsDesignationsCategoryListComponentComponent} from './settings-designations-category-list-component.component';

describe('SettingsDesignationsCategoryListComponentComponent', () => {
  let component: SettingsDesignationsCategoryListComponentComponent;
  let fixture: ComponentFixture<SettingsDesignationsCategoryListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsDesignationsCategoryListComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDesignationsCategoryListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
