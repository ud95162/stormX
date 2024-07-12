import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchResultPeopleComponent} from './search-result-people.component';

describe('SearchResultPeopleComponent', () => {
  let component: SearchResultPeopleComponent;
  let fixture: ComponentFixture<SearchResultPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultPeopleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
