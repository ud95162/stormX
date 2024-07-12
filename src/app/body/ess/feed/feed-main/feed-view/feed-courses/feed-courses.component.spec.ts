import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedCoursesComponent} from './feed-courses.component';

describe('FeedCoursesComponent', () => {
  let component: FeedCoursesComponent;
  let fixture: ComponentFixture<FeedCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedCoursesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
