import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabWorkFromHomeDetailedViewComponent } from './home-tab-work-from-home-detailed-view.component';

describe('HomeTabWorkFromHomeComponent', () => {
  let component: HomeTabWorkFromHomeDetailedViewComponent;
  let fixture: ComponentFixture<HomeTabWorkFromHomeDetailedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabWorkFromHomeDetailedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabWorkFromHomeDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
