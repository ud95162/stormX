import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabWorkFromHomeConfigurationsViewComponent } from './home-tab-work-from-home-configurations-view.component';

describe('HomeTabWorkFromHomeConfigurationsViewComponent', () => {
  let component: HomeTabWorkFromHomeConfigurationsViewComponent;
  let fixture: ComponentFixture<HomeTabWorkFromHomeConfigurationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabWorkFromHomeConfigurationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabWorkFromHomeConfigurationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
