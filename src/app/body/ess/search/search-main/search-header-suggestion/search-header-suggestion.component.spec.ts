import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchHeaderSuggestionComponent} from './search-header-suggestion.component';

describe('SearchHeaderSuggestionComponent', () => {
  let component: SearchHeaderSuggestionComponent;
  let fixture: ComponentFixture<SearchHeaderSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchHeaderSuggestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeaderSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
