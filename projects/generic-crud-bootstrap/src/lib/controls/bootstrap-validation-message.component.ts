import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterBase } from 'Generic-CRUD';

@Component({
  selector: 'gcb-validation-message',
  templateUrl: './bootstrap-validation-message.component.html',
  styleUrls: ['./bootstrap-validation-message.component.css']
})
export class BootstrapValidationMessageComponent {
  @Input() form: FormGroup;
  @Input() control: FilterBase<any>;
  @Input() parentFormSubmitted: any;
}
