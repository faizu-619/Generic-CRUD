import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, FilterSingleDate } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gcb-single-date',
  templateUrl: './bootstrap-single-date.component.html',
  styleUrls: ['./bootstrap-single-date.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
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

