import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabWorkFromHomeHeaderComponent } from './home-tab-work-from-home-header.component';

describe('HomeTabWorkFromHomeHeaderComponent', () => {
  let component: HomeTabWorkFromHomeHeaderComponent;
  let fixture: ComponentFixture<HomeTabWorkFromHomeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabWorkFromHomeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabWorkFromHomeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
