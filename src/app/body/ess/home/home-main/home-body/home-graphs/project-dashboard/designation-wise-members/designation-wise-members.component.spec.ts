import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationWiseMembersComponent } from './designation-wise-members.component';

describe('DesignationWiseMembersComponent', () => {
  let component: DesignationWiseMembersComponent;
  let fixture: ComponentFixture<DesignationWiseMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationWiseMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationWiseMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
