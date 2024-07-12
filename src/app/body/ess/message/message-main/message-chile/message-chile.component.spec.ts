import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageChileComponent} from './message-chile.component';

describe('MessageChileComponent', () => {
  let component: MessageChileComponent;
  let fixture: ComponentFixture<MessageChileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageChileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageChileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
