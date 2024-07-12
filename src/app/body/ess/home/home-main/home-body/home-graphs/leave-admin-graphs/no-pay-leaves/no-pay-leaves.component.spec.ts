import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPayLeavesComponent } from './no-pay-leaves.component';

describe('NoPayLeavesComponent', () => {
  let component: NoPayLeavesComponent;
  let fixture: ComponentFixture<NoPayLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoPayLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPayLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
