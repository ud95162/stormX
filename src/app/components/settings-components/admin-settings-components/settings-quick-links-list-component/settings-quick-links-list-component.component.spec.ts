import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsQuickLinksListComponentComponent} from './settings-quick-links-list-component.component';

describe('SettingsQuickLinksListComponentComponent', () => {
  let component: SettingsQuickLinksListComponentComponent;
  let fixture: ComponentFixture<SettingsQuickLinksListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsQuickLinksListComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsQuickLinksListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
