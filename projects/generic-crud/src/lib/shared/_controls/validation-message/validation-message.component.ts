import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterBase } from '../_models';
import { DEFAULT_VALIDATION_MESSAGES, ValidationMessageLogic } from '../_logic';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[gc-validation-message]',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() control: FilterBase<any>;
  @Input() parentFormSubmitted: any;
  private readonly validationMessageLogic = new ValidationMessageLogic();

  validationMessageConstants = DEFAULT_VALIDATION_MESSAGES;

  get validationMessage() {
    const frmControl = this.form.get(this.control.key);
    if (frmControl && !frmControl.valid) {
      return this.validationMessageLogic.formatMessages(
        frmControl.errors,
        this.control.validationRegexMessage,
        this.validationMessageConstants
      );
    }

    return '';
  }

  constructor() { }

  ngOnInit(): void {
  }

  get isValid() { return (!this.parentFormSubmitted || this.form.controls[this.control.key].valid); }
}
