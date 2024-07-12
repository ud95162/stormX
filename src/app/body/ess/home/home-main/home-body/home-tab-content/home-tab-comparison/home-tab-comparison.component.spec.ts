import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabComparisonComponent } from './home-tab-comparison.component';

describe('HomeTabComparisonComponent', () => {
  let component: HomeTabComparisonComponent;
  let fixture: ComponentFixture<HomeTabComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
