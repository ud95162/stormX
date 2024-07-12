import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeTabSkillComponent} from './home-tab-skill.component';

describe('HomeTabSkillComponent', () => {
  let component: HomeTabSkillComponent;
  let fixture: ComponentFixture<HomeTabSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTabSkillComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
