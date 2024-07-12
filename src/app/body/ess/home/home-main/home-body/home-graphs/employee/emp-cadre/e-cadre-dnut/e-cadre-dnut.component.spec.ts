import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ECadreDnutComponent} from './e-cadre-dnut.component';

describe('ECadreDnutComponent', () => {
  let component: ECadreDnutComponent;
  let fixture: ComponentFixture<ECadreDnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ECadreDnutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ECadreDnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
