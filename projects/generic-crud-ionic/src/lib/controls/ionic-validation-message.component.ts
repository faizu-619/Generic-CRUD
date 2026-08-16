import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterBase } from 'Generic-CRUD';

@Component({
  selector: 'gci-validation-message',
  templateUrl: './ionic-validation-message.component.html',
  styleUrls: ['./ionic-validation-message.component.css']
})
export class IonicValidationMessageComponent {
  @Input() form: FormGroup;
  @Input() control: FilterBase<any>;
  @Input() parentFormSubmitted: any;
}
