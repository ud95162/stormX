import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTabComponent } from './medical-tab.component';

describe('MedicalTabComponent', () => {
  let component: MedicalTabComponent;
  let fixture: ComponentFixture<MedicalTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
