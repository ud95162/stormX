import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevWorkDetailsModalComponent } from './prev-work-details-modal.component';

describe('PrevWorkDetailsModalComponent', () => {
  let component: PrevWorkDetailsModalComponent;
  let fixture: ComponentFixture<PrevWorkDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevWorkDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevWorkDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
