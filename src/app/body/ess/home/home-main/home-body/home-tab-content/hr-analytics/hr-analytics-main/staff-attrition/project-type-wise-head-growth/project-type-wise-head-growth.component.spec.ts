import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeWiseHeadGrowthComponent } from './project-type-wise-head-growth.component';

describe('ProjectTypeWiseHeadGrowthComponent', () => {
  let component: ProjectTypeWiseHeadGrowthComponent;
  let fixture: ComponentFixture<ProjectTypeWiseHeadGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTypeWiseHeadGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeWiseHeadGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
