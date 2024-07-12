import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EOpResBarComponent} from './e-op-res-bar.component';

describe('EOpResBarComponent', () => {
  let component: EOpResBarComponent;
  let fixture: ComponentFixture<EOpResBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EOpResBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOpResBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
