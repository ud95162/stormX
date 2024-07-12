import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ERoleBarComponent} from './e-role-bar.component';

describe('ERoleBarComponent', () => {
  let component: ERoleBarComponent;
  let fixture: ComponentFixture<ERoleBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ERoleBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ERoleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
