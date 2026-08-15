import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, FilterSingleDate } from 'Generic-CRUD';

@Component({
  selector: 'gcb-single-date',
  templateUrl: './bootstrap-single-date.component.html',
  styleUrls: ['./bootstrap-single-date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapSingleDateComponent),
      multi: true
    }
  ]
})
export class BootstrapSingleDateComponent extends BaseControlValueAccessor<any> {
  @Input() control: FilterSingleDate;

  onDateChange(value: string): void {
    this.updateValue(value as any);
  }

  onBlur(): void {
    this.onTouched();
  }
}

