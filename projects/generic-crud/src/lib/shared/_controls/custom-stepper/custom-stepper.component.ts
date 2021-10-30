import { Component, OnInit, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: CustomStepperComponent }]
})
export class CustomStepperComponent extends CdkStepper {
  @Input()
  activeClass = 'active';

  @Input()
  stepClickEnable = false;

  isNextButtonHidden(): boolean {
    return !(this.steps.length === this.selectedIndex + 1);
  }
}
