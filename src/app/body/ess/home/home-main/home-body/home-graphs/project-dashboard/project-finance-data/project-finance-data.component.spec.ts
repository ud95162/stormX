import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFinanceDataComponent } from './project-finance-data.component';

describe('ProjectFinanceDataComponent', () => {
  let component: ProjectFinanceDataComponent;
  let fixture: ComponentFixture<ProjectFinanceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFinanceDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFinanceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
