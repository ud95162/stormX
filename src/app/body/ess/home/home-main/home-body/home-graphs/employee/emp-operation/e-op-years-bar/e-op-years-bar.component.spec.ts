import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EOpYearsBarComponent} from './e-op-years-bar.component';

describe('EOpYearsBarComponent', () => {
  let component: EOpYearsBarComponent;
  let fixture: ComponentFixture<EOpYearsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EOpYearsBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOpYearsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
