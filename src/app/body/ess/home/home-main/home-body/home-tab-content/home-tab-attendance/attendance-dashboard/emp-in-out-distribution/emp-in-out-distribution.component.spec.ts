import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInOutDistributionComponent } from './emp-in-out-distribution.component';

describe('EmpInOutDistributionComponent', () => {
  let component: EmpInOutDistributionComponent;
  let fixture: ComponentFixture<EmpInOutDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpInOutDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpInOutDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
