import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSkillChartComponent } from './profile-skill-chart.component';

describe('ProfileSkillChartComponent', () => {
  let component: ProfileSkillChartComponent;
  let fixture: ComponentFixture<ProfileSkillChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSkillChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSkillChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
