import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodsMainComponent } from './pods-main.component';

describe('PodsMainComponent', () => {
  let component: PodsMainComponent;
  let fixture: ComponentFixture<PodsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
