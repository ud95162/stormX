import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchInterestedCardComponent} from './search-interested-card.component';

describe('SearchInterestedCardComponent', () => {
  let component: SearchInterestedCardComponent;
  let fixture: ComponentFixture<SearchInterestedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInterestedCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInterestedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
