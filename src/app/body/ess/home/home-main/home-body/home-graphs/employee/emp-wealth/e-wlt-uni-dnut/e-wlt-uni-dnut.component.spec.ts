import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EWltUniDnutComponent} from './e-wlt-uni-dnut.component';

describe('EWltUniDnutComponent', () => {
  let component: EWltUniDnutComponent;
  let fixture: ComponentFixture<EWltUniDnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EWltUniDnutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EWltUniDnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
