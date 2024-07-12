import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsNewDesignationPageComponent } from './settings-new-designation-page.component';

describe('SettingsNewDesignationPageComponent', () => {
  let component: SettingsNewDesignationPageComponent;
  let fixture: ComponentFixture<SettingsNewDesignationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsNewDesignationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsNewDesignationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
