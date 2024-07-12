import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizedLeavesByProjectComponent } from './utilized-leaves-by-project.component';

describe('UtilizedLeavesByProjectComponent', () => {
  let component: UtilizedLeavesByProjectComponent;
  let fixture: ComponentFixture<UtilizedLeavesByProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizedLeavesByProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizedLeavesByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
