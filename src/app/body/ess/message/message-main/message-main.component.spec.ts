import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageMainComponent} from './message-main.component';

describe('MessageMainComponent', () => {
  let component: MessageMainComponent;
  let fixture: ComponentFixture<MessageMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
