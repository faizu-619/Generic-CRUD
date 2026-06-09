import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import {FilterTextbox} from '../_models';
import {BaseControlValueAccessor} from '../_base';

@Component({
  selector: 'gc-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextBoxComponent),
      multi: true
    }
  ]
})
export class TextBoxComponent extends BaseControlValueAccessor implements OnInit {
  @Input() control: FilterTextbox;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onInputChange(event: any): void {
    this.updateValue(event.target.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
