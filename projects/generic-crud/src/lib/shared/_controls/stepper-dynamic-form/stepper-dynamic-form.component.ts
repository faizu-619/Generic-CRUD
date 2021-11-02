import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { DynamicControlService } from '../_services/filter-control.service';
import { StepperFormModel } from '../_models/stepper-form.model';
import { CustomStepperComponent } from '../custom-stepper/custom-stepper.component';

@Component({
  selector: 'lib-stepper-dynamic-form',
  templateUrl: './stepper-dynamic-form.component.html',
  styleUrls: ['./stepper-dynamic-form.component.css']
})
export class StepperDynamicFormComponent implements OnInit {
  @ViewChild('cdkStepper', { static: false }) stepper: CustomStepperComponent;
  @Input() controlsArray: StepperFormModel[];
  @Output() OnSubmit = new EventEmitter();
  @Output() OnValuesChange = new EventEmitter();
  @Output() OnStepChange = new EventEmitter();
  @Input() isLinear = true;
  @Input() isEditable = true;

  form: FormGroup;
  submited = false;

  get formArray(): AbstractControl {
    return this.form.get('steps');
  }

  constructor(
    private ctrlService: DynamicControlService,
    private fb: FormBuilder) { }

  public updateValue(value: any): void {
    this.formArray.patchValue(value || {});
  }

  ngOnInit() {
    console.log(this.controlsArray);
    if (this.controlsArray && this.controlsArray.length) {
      this.setFormGroup(this.controlsArray);
    } else {
      this.setFormGroup([]);
    }
  }

  setFormGroup(frms: StepperFormModel[]): void {
    const steps = [];
    for (const iterator of frms) {
      steps.push(this.ctrlService.toFormGroup(iterator.form));
    }

    this.form = new FormGroup({
      steps: this.fb.array(steps),
    });
    this.onChanges();
  }

  changeStep(event: any): void {
    this.OnStepChange.emit(event);
  }

  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      this.submited = false;
      this.OnValuesChange.emit(val);
    });
  }

  SubmitForm(): boolean {
    if (this.formArray.valid) {
      this.submited = true;
      this.OnSubmit.emit(this.formArray.value);
      return true;
    }
    this.submited = false;
    return false;
  }

}
