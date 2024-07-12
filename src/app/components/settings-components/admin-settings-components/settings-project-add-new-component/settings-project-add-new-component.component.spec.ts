import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsProjectAddNewComponentComponent} from './settings-project-add-new-component.component';

describe('SettingsProjectAddNewComponentComponent', () => {
  let component: SettingsProjectAddNewComponentComponent;
  let fixture: ComponentFixture<SettingsProjectAddNewComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsProjectAddNewComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsProjectAddNewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
