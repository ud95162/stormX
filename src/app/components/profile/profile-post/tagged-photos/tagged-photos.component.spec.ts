import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaggedPhotosComponent} from './tagged-photos.component';

describe('TaggedPhotosComponent', () => {
  let component: TaggedPhotosComponent;
  let fixture: ComponentFixture<TaggedPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaggedPhotosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
