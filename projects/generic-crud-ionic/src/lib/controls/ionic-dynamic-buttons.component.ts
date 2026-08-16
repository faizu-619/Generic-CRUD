import { Component, Input } from '@angular/core';
import { ButtonModel, ButtonType } from 'Generic-CRUD';

@Component({
  selector: 'gci-dynamic-buttons',
  templateUrl: './ionic-dynamic-buttons.component.html',
  styleUrls: ['./ionic-dynamic-buttons.component.css']
})
export class IonicDynamicButtonsComponent {
  @Input() btnList: ButtonModel<any>[];

  readonly ButtonType = ButtonType;
}
