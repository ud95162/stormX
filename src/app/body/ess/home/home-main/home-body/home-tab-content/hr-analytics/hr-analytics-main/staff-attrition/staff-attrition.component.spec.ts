import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAttritionComponent } from './staff-attrition.component';

describe('StaffAttritionComponent', () => {
  let component: StaffAttritionComponent;
  let fixture: ComponentFixture<StaffAttritionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAttritionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAttritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
