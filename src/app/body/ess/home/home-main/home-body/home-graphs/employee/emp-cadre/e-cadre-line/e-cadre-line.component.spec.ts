import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ECadreLineComponent} from './e-cadre-line.component';

describe('ECadreLineComponent', () => {
  let component: ECadreLineComponent;
  let fixture: ComponentFixture<ECadreLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ECadreLineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ECadreLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
