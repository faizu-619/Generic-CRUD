import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModel, ButtonType } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gci-dynamic-buttons',
  templateUrl: './ionic-dynamic-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./ionic-dynamic-buttons.component.css']
})
export class IonicDynamicButtonsComponent {
  @Input() btnList: ButtonModel<any>[];

  readonly ButtonType = ButtonType;
}
