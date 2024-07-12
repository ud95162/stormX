import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitJiraDashboardComponent } from './git-jira-dashboard.component';

describe('GitJiraDashboardComponent', () => {
  let component: GitJiraDashboardComponent;
  let fixture: ComponentFixture<GitJiraDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitJiraDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitJiraDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
