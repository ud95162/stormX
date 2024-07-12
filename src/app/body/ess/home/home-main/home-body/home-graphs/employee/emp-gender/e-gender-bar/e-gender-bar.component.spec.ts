import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EGenderBarComponent} from './e-gender-bar.component';

describe('EGenderBarComponent', () => {
  let component: EGenderBarComponent;
  let fixture: ComponentFixture<EGenderBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EGenderBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EGenderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
