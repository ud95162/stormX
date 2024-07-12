import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileKnowledgeExtractionComponent } from './profile-knowledge-extraction.component';

describe('ProfileKnowledgeExtractionComponent', () => {
  let component: ProfileKnowledgeExtractionComponent;
  let fixture: ComponentFixture<ProfileKnowledgeExtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileKnowledgeExtractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileKnowledgeExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
