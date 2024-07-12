import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabProjectHistoryComponent } from './home-tab-project-history.component';

describe('HomeTabProjectHistoryComponent', () => {
  let component: HomeTabProjectHistoryComponent;
  let fixture: ComponentFixture<HomeTabProjectHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabProjectHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabProjectHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
