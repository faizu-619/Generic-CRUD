import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterTextArea } from '../_models/filter-text-area';
import { BaseControlValueAccessor } from '../_base/base-control-value-accessor';

@Component({
  selector: 'gc-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent extends BaseControlValueAccessor implements OnInit {
  @Input() control: FilterTextArea;

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
