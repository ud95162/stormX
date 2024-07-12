import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EGenderDnutComponent} from './e-gender-dnut.component';

describe('EGenderDnutComponent', () => {
  let component: EGenderDnutComponent;
  let fixture: ComponentFixture<EGenderDnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EGenderDnutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EGenderDnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
