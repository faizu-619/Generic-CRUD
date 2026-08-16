import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import {FilterTextbox} from '../_models';
import {BaseControlValueAccessor} from '../_base';

@Component({
  standalone: false,
  selector: 'gc-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextBoxComponent),
      multi: true
    }
  ]
})
export class TextBoxComponent extends BaseControlValueAccessor implements OnInit {
  @Input() control: FilterTextbox = new FilterTextbox();

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
  }

  writeValue(value: any): void {
    setTimeout(() => {
      this._value = value;
      this.cdr.markForCheck();
    });
  }

  onInputChange(event: any): void {
    this.updateValue(event.target.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
