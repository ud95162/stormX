import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeWiseTurnOverComponent } from './project-type-wise-turn-over.component';

describe('ProjectTypeWiseTurnOverComponent', () => {
  let component: ProjectTypeWiseTurnOverComponent;
  let fixture: ComponentFixture<ProjectTypeWiseTurnOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTypeWiseTurnOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeWiseTurnOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
