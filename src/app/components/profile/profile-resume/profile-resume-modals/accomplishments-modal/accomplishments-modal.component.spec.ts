import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomplishmentsModalComponent } from './accomplishments-modal.component';

describe('AccomplishmentsModalComponent', () => {
  let component: AccomplishmentsModalComponent;
  let fixture: ComponentFixture<AccomplishmentsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomplishmentsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomplishmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
