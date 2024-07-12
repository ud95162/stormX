import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevWorkEditComponent } from './prev-work-edit.component';

describe('PrevWorkEditComponent', () => {
  let component: PrevWorkEditComponent;
  let fixture: ComponentFixture<PrevWorkEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevWorkEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevWorkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
