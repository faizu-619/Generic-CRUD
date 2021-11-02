import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperDynamicFormComponent } from './stepper-dynamic-form.component';

describe('StepperDynamicFormComponent', () => {
  let component: StepperDynamicFormComponent;
  let fixture: ComponentFixture<StepperDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperDynamicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
