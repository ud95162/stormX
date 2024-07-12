import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevWorkNewComponent } from './prev-work-new.component';

describe('PrevWorkNewComponent', () => {
  let component: PrevWorkNewComponent;
  let fixture: ComponentFixture<PrevWorkNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevWorkNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevWorkNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
