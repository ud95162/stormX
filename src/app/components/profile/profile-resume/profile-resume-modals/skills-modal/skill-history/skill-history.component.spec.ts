import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillHistoryComponent } from './skill-history.component';

describe('SkillHistoryComponent', () => {
  let component: SkillHistoryComponent;
  let fixture: ComponentFixture<SkillHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
