import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabKnowledgeGraphComponent } from './home-tab-knowledge-graph.component';

describe('HomeTabKnowledgeGraphComponent', () => {
  let component: HomeTabKnowledgeGraphComponent;
  let fixture: ComponentFixture<HomeTabKnowledgeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabKnowledgeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabKnowledgeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
