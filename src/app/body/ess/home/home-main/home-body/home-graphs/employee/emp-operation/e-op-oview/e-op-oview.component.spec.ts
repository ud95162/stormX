import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EOpOviewComponent} from './e-op-oview.component';

describe('EOpOviewComponent', () => {
  let component: EOpOviewComponent;
  let fixture: ComponentFixture<EOpOviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EOpOviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOpOviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
