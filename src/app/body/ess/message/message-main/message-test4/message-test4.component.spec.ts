import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageTest4Component} from './message-test4.component';

describe('MessageTest4Component', () => {
  let component: MessageTest4Component;
  let fixture: ComponentFixture<MessageTest4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageTest4Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTest4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
