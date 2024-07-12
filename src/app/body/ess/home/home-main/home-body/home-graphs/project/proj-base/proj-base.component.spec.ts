import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjBaseComponent} from './proj-base.component';

describe('ProjBaseComponent', () => {
  let component: ProjBaseComponent;
  let fixture: ComponentFixture<ProjBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjBaseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
