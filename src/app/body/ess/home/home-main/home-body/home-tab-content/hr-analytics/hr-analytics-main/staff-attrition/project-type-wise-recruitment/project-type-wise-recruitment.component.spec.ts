import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeWiseRecruitmentComponent } from './project-type-wise-recruitment.component';

describe('ProjectTypeWiseRecruitmentComponent', () => {
  let component: ProjectTypeWiseRecruitmentComponent;
  let fixture: ComponentFixture<ProjectTypeWiseRecruitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTypeWiseRecruitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeWiseRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
