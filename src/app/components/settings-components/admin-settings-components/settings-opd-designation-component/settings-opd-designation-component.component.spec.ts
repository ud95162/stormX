import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOpdDesignationComponentComponent } from './settings-opd-designation-component.component';

describe('SettingsOpdDesignationComponentComponent', () => {
  let component: SettingsOpdDesignationComponentComponent;
  let fixture: ComponentFixture<SettingsOpdDesignationComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOpdDesignationComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOpdDesignationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
