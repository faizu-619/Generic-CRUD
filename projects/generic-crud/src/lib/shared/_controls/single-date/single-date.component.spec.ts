import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDateComponent } from './single-date.component';

describe('SingleDateComponent', () => {
  let component: SingleDateComponent;
  let fixture: ComponentFixture<SingleDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
