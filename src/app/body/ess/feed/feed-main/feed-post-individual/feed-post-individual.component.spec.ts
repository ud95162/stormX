import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedPostIndividualComponent} from './feed-post-individual.component';

describe('FeedPostIndividualComponent', () => {
  let component: FeedPostIndividualComponent;
  let fixture: ComponentFixture<FeedPostIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedPostIndividualComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedPostIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
