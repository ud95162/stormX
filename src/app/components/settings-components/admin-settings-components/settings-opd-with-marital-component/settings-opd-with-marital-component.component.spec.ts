import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOpdWithMaritalComponentComponent } from './settings-opd-with-marital-component.component';

describe('SettingsOpdWithMaritalComponentComponent', () => {
  let component: SettingsOpdWithMaritalComponentComponent;
  let fixture: ComponentFixture<SettingsOpdWithMaritalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOpdWithMaritalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOpdWithMaritalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
