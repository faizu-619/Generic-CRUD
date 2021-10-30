import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AutocompleteTextboxComponent } from './autocomplete-textbox.component';

describe('AutocompleteTextboxComponent', () => {
  let component: AutocompleteTextboxComponent;
  let fixture: ComponentFixture<AutocompleteTextboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
