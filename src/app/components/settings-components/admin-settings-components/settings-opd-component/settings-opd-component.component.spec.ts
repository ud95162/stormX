import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOpdComponentComponent } from './settings-opd-component.component';

describe('SettingsOpdComponentComponent', () => {
  let component: SettingsOpdComponentComponent;
  let fixture: ComponentFixture<SettingsOpdComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOpdComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOpdComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
