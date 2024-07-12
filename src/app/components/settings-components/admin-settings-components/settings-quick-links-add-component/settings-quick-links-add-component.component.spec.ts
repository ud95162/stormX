import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsQuickLinksAddComponentComponent} from './settings-quick-links-add-component.component';

describe('SettingsQuickLinksAddComponentComponent', () => {
  let component: SettingsQuickLinksAddComponentComponent;
  let fixture: ComponentFixture<SettingsQuickLinksAddComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsQuickLinksAddComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsQuickLinksAddComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
