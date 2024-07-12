import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDesignationCategoryComponent } from './project-designation-category.component';

describe('ProjectDesignationCategoryComponent', () => {
  let component: ProjectDesignationCategoryComponent;
  let fixture: ComponentFixture<ProjectDesignationCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDesignationCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDesignationCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
