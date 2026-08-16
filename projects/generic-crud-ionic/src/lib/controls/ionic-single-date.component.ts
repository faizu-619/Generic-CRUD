import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, FilterSingleDate } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gci-single-date',
  templateUrl: './ionic-single-date.component.html',
  styleUrls: ['./ionic-single-date.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonicSingleDateComponent),
      multi: true
    }
  ]
})
export class IonicSingleDateComponent extends BaseControlValueAccessor<any> {
  @Input() control: FilterSingleDate;

  get triggerId(): string {
    return `${this.control?.key || 'gci-single-date'}-trigger`;
  }

  onDateChange(value: string): void {
    this.updateValue(value as any);
  }

  onBlur(): void {
    this.onTouched();
  }
}
