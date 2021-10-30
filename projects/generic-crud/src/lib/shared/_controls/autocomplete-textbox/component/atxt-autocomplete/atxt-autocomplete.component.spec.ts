import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AtxtAutocompleteComponent } from './atxt-autocomplete.component';

describe('AtxtAutocompleteComponent', () => {
  let component: AtxtAutocompleteComponent;
  let fixture: ComponentFixture<AtxtAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AtxtAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtxtAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
