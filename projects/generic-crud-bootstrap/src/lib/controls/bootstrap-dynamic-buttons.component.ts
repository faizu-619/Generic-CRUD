import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModel, ButtonType } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gcb-dynamic-buttons',
  templateUrl: './bootstrap-dynamic-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./bootstrap-dynamic-buttons.component.css']
})
export class BootstrapDynamicButtonsComponent {
  @Input() btnList: ButtonModel<any>[];

  readonly ButtonType = ButtonType;
}
