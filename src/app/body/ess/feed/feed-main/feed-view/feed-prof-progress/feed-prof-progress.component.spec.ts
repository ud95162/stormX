import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedProfProgressComponent} from './feed-prof-progress.component';

describe('FeedProfProgressComponent', () => {
  let component: FeedProfProgressComponent;
  let fixture: ComponentFixture<FeedProfProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedProfProgressComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedProfProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
