import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomStepperComponent } from './custom-stepper.component';

describe('CustomStepperComponent', () => {
  let component: CustomStepperComponent;
  let fixture: ComponentFixture<CustomStepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
