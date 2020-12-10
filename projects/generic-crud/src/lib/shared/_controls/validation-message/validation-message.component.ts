import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { FilterBase } from '../_models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[lib-validation-message]',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() control: FilterBase<any>;
  @Input() parentFormSubmitted: any;

  validationMessageConstants = {
    required: 'This field is required.',
    email: 'This email is not valid.',
    minlength: 'Keyword must be greater than {{requiredLength}} characters, current length is {{actualLength}}.',
    maxlength: 'Keyword must not exceed {{requiredLength}} characters, current length is {{actualLength}}.',
    min: 'Number must be greater than {{min}}.',
    max: 'Number must not exceed {{max}}.',
    compare: 'This field is not valid or matched with {{compareWith}}.',
    exists: 'Already in use, please try with other.',
    mask: '"{{actualValue}}" is not valid, require e.g "{{requiredMask}}".'
  };

  get validationMessage() {
    let messages = '';
    const control = this.form.get(this.control.key);
    if (control && !control.valid) {
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          if (control.errors[key] !== null && typeof control.errors[key] === 'object') {
            if (key === 'pattern') {
              messages += `<div>${this.control.validationRegexMessage}</div>`;
            } else {
              let msg = `<div>${this.validationMessageConstants[key]}</div>`;
              for (const propKey in control.errors[key]) {
                if (control.errors[key].hasOwnProperty(propKey)) {
                  msg = _.replace(msg, RegExp(`{{${propKey}}}`, 'g'), control.errors[key][propKey]);
                }
              }
              messages += msg;
            }
          } else {
            messages += `<div>${this.validationMessageConstants[key]}</div>`;
          }
        }
      }
    }
    return messages;
  }

  constructor() { }

  ngOnInit(): void {
  }

  get isValid() { return (!this.parentFormSubmitted && this.form.controls[this.control.key].valid); }
}
