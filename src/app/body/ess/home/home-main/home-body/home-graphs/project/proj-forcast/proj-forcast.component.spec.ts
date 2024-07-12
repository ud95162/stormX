import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjForcastComponent} from './proj-forcast.component';

describe('ProjForcastComponent', () => {
  let component: ProjForcastComponent;
  let fixture: ComponentFixture<ProjForcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjForcastComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
