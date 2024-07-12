import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCodelineIssueChartComponent } from './profile-codeline-issue-chart.component';

describe('ProfileCodelineIssueChartComponent', () => {
  let component: ProfileCodelineIssueChartComponent;
  let fixture: ComponentFixture<ProfileCodelineIssueChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCodelineIssueChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCodelineIssueChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
