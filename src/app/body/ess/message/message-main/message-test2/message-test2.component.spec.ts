import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageTest2Component} from './message-test2.component';

describe('MessageTest2Component', () => {
  let component: MessageTest2Component;
  let fixture: ComponentFixture<MessageTest2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageTest2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
