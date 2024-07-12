import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjCardComponent} from './proj-card.component';

describe('ProjCardComponent', () => {
  let component: ProjCardComponent;
  let fixture: ComponentFixture<ProjCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
