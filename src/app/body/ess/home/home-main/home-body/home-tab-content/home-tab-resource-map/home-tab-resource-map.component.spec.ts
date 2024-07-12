import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabResourceMapComponent } from './home-tab-resource-map.component';

describe('HomeTabResourceMapComponent', () => {
  let component: HomeTabResourceMapComponent;
  let fixture: ComponentFixture<HomeTabResourceMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabResourceMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabResourceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
