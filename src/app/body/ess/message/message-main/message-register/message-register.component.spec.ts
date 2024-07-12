import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageRegisterComponent} from './message-register.component';

describe('MessageRegisterComponent', () => {
  let component: MessageRegisterComponent;
  let fixture: ComponentFixture<MessageRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageRegisterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
