import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EWltClsBarComponent} from './e-wlt-cls-bar.component';

describe('EWltClsBarComponent', () => {
  let component: EWltClsBarComponent;
  let fixture: ComponentFixture<EWltClsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EWltClsBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EWltClsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
