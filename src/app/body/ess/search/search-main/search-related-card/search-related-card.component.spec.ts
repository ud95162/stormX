import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchRelatedCardComponent} from './search-related-card.component';

describe('SearchRelatedCardComponent', () => {
  let component: SearchRelatedCardComponent;
  let fixture: ComponentFixture<SearchRelatedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRelatedCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRelatedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
