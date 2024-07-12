import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EOpResDnutComponent} from './e-op-res-dnut.component';

describe('EOpResDnutComponent', () => {
  let component: EOpResDnutComponent;
  let fixture: ComponentFixture<EOpResDnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EOpResDnutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOpResDnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
