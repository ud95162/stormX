import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignEmpExperienceComponent } from './resign-emp-experience.component';

describe('ResignEmpExperienceComponent', () => {
  let component: ResignEmpExperienceComponent;
  let fixture: ComponentFixture<ResignEmpExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResignEmpExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignEmpExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
