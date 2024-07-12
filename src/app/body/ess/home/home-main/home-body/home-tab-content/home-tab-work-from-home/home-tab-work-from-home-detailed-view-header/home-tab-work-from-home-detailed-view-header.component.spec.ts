import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabWorkFromHomeDetailedViewHeaderComponent } from './home-tab-work-from-home-detailed-view-header.component';

describe('HomeTabWorkFromHomeDetailedViewHeaderComponent', () => {
  let component: HomeTabWorkFromHomeDetailedViewHeaderComponent;
  let fixture: ComponentFixture<HomeTabWorkFromHomeDetailedViewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabWorkFromHomeDetailedViewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabWorkFromHomeDetailedViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
