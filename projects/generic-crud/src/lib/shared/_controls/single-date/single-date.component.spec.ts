import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleDateComponent } from './single-date.component';

describe('SingleDateComponent', () => {
  let component: SingleDateComponent;
  let fixture: ComponentFixture<SingleDateComponent>;

  beforeEach(waitForAsync(() => {
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
