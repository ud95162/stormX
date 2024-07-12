import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomplishmentNewComponent } from './accomplishment-new.component';

describe('AccomplishmentNewComponent', () => {
  let component: AccomplishmentNewComponent;
  let fixture: ComponentFixture<AccomplishmentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomplishmentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomplishmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
