import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationTabEditComponent } from './education-tab-edit.component';

describe('EducationTabEditComponent', () => {
  let component: EducationTabEditComponent;
  let fixture: ComponentFixture<EducationTabEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationTabEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationTabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
