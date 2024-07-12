import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeWiseResignationComponent } from './project-type-wise-resignation.component';

describe('ProjectTypeWiseResignationComponent', () => {
  let component: ProjectTypeWiseResignationComponent;
  let fixture: ComponentFixture<ProjectTypeWiseResignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTypeWiseResignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeWiseResignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
