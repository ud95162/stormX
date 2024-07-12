import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabLeaveAdminGraphsComponent } from './home-tab-leave-admin-graphs.component';

describe('HomeTabLeaveAdminGraphsComponent', () => {
  let component: HomeTabLeaveAdminGraphsComponent;
  let fixture: ComponentFixture<HomeTabLeaveAdminGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabLeaveAdminGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabLeaveAdminGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
