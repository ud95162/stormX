import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomplishmentEditComponent } from './accomplishment-edit.component';

describe('AccomplishmentEditComponent', () => {
  let component: AccomplishmentEditComponent;
  let fixture: ComponentFixture<AccomplishmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomplishmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomplishmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
