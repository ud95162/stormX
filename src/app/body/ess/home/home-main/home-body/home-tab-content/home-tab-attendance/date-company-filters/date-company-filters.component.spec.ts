import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCompanyFiltersComponent } from './date-company-filters.component';

describe('DateCompanyFiltersComponent', () => {
  let component: DateCompanyFiltersComponent;
  let fixture: ComponentFixture<DateCompanyFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateCompanyFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCompanyFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
