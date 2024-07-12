import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageTest3Component} from './message-test3.component';

describe('MessageTest3Component', () => {
  let component: MessageTest3Component;
  let fixture: ComponentFixture<MessageTest3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageTest3Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTest3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
