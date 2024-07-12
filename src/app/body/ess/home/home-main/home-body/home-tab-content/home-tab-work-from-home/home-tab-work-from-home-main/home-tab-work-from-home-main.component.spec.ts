import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabWorkFromHomeMainComponent } from './home-tab-work-from-home-main.component';

describe('HomeTabWorkFromHomeMainComponent', () => {
  let component: HomeTabWorkFromHomeMainComponent;
  let fixture: ComponentFixture<HomeTabWorkFromHomeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabWorkFromHomeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabWorkFromHomeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
