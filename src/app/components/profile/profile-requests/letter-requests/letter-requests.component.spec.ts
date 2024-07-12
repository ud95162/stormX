import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LetterRequestsComponent} from './letter-requests.component';

describe('LetterRequestsComponent', () => {
  let component: LetterRequestsComponent;
  let fixture: ComponentFixture<LetterRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LetterRequestsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
