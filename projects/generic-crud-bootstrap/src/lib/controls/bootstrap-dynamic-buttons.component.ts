import { Component, Input } from '@angular/core';
import { ButtonModel, ButtonType } from 'Generic-CRUD';

@Component({
  selector: 'gcb-dynamic-buttons',
  templateUrl: './bootstrap-dynamic-buttons.component.html',
  styleUrls: ['./bootstrap-dynamic-buttons.component.css']
})
export class BootstrapDynamicButtonsComponent {
  @Input() btnList: ButtonModel<any>[];

  readonly ButtonType = ButtonType;
}
