import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizedComponent } from './utilized.component';

describe('UtilizedComponent', () => {
  let component: UtilizedComponent;
  let fixture: ComponentFixture<UtilizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
