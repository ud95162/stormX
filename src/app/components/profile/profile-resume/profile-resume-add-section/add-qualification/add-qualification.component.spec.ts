import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddQualificationComponent} from './add-qualification.component';

describe('AddQualificationComponent', () => {
  let component: AddQualificationComponent;
  let fixture: ComponentFixture<AddQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddQualificationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
