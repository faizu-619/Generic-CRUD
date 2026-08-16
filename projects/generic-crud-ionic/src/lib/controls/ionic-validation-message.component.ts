import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterBase } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gci-validation-message',
  templateUrl: './ionic-validation-message.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./ionic-validation-message.component.css']
})
export class IonicValidationMessageComponent {
  @Input() form: FormGroup;
  @Input() control: FilterBase<any>;
  @Input() parentFormSubmitted: any;
}
