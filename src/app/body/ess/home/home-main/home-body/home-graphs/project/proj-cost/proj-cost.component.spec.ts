import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjCostComponent} from './proj-cost.component';

describe('ProjCostComponent', () => {
  let component: ProjCostComponent;
  let fixture: ComponentFixture<ProjCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjCostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
