import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterBase } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gcb-validation-message',
  templateUrl: './bootstrap-validation-message.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./bootstrap-validation-message.component.css']
})
export class BootstrapValidationMessageComponent {
  @Input() form: FormGroup;
  @Input() control: FilterBase<any>;
  @Input() parentFormSubmitted: any;
}
