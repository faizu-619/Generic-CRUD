import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, FilterTextArea } from 'Generic-CRUD';

@Component({
  selector: 'gci-text-area',
  templateUrl: './ionic-text-area.component.html',
  styleUrls: ['./ionic-text-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonicTextAreaComponent),
      multi: true
    }
  ]
})
export class IonicTextAreaComponent extends BaseControlValueAccessor<any> {
  @Input() control: FilterTextArea;

  get rows(): number {
    return this.control?.rowLength || 3;
  }

  onInput(value: string): void {
    this.updateValue(value as any);
  }

  onBlur(): void {
    this.onTouched();
  }
}
