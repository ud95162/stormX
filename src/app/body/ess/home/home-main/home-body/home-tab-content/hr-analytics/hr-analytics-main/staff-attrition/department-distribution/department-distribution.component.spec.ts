import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDistributionComponent } from './department-distribution.component';

describe('DepartmentDistributionComponent', () => {
  let component: DepartmentDistributionComponent;
  let fixture: ComponentFixture<DepartmentDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
