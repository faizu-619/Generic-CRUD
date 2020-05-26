import { Component, OnInit, Input } from '@angular/core';
import { ButtonModel } from '../_models/button.model';

@Component({
  selector: 'lib-dynamic-buttons',
  templateUrl: './dynamic-buttons.component.html',
  styleUrls: ['./dynamic-buttons.component.css']
})
export class DynamicButtonsComponent implements OnInit {
  @Input() btnList: ButtonModel<any>[];

  constructor() { }

  ngOnInit() {
  }

}
