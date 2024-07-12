import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationTabNewComponent } from './education-tab-new.component';

describe('EducationTabComponent', () => {
  let component: EducationTabNewComponent;
  let fixture: ComponentFixture<EducationTabNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationTabNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationTabNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
