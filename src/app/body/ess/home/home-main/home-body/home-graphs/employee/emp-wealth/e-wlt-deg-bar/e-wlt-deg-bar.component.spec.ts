import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EWltDegBarComponent} from './e-wlt-deg-bar.component';

describe('EWltDegBarComponent', () => {
  let component: EWltDegBarComponent;
  let fixture: ComponentFixture<EWltDegBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EWltDegBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EWltDegBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
