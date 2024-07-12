import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortLeaveUtlizationComponent } from './short-leave-utlization.component';

describe('ShortLeaveUtlizationComponent', () => {
  let component: ShortLeaveUtlizationComponent;
  let fixture: ComponentFixture<ShortLeaveUtlizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortLeaveUtlizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortLeaveUtlizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
