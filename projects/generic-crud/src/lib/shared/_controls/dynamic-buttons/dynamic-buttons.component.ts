import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModel } from '../_models/button.model';

@Component({
  standalone: false,
  selector: 'gc-dynamic-buttons',
  templateUrl: './dynamic-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./dynamic-buttons.component.css']
})
export class DynamicButtonsComponent implements OnInit {
  @Input() btnList: ButtonModel<any>[];

  constructor() { }

  ngOnInit() {
  }

}
