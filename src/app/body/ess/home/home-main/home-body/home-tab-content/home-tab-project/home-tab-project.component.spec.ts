import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeTabProjectComponent} from './home-tab-project.component';

describe('HomeTabProjectComponent', () => {
  let component: HomeTabProjectComponent;
  let fixture: ComponentFixture<HomeTabProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTabProjectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
