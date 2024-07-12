import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruimentVsResignationComponent } from './recruiment-vs-resignation.component';

describe('RecruimentVsResignationComponent', () => {
  let component: RecruimentVsResignationComponent;
  let fixture: ComponentFixture<RecruimentVsResignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruimentVsResignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruimentVsResignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
