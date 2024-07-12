import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyWiseEmployeeSummaryComponent } from './company-wise-employee-summary.component';

describe('CompanyWiseEmployeeSummaryComponent', () => {
  let component: CompanyWiseEmployeeSummaryComponent;
  let fixture: ComponentFixture<CompanyWiseEmployeeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyWiseEmployeeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyWiseEmployeeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
