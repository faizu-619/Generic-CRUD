import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, DateRange, DateRangeLogic, FilterRangeDate } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gcb-range-date',
  templateUrl: './bootstrap-range-date.component.html',
  styleUrls: ['./bootstrap-range-date.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapRangeDateComponent),
      multi: true
    }
  ]
})
export class BootstrapRangeDateComponent extends BaseControlValueAccessor<any> {
  @Input() control: FilterRangeDate;
  private readonly dateRangeLogic = new DateRangeLogic();

  selectedRange: DateRange = { startDate: null, endDate: null };

  ngOnInit(): void {
    this.syncFromValue();
  }

  writeValue(value: any): void {
    super.writeValue(value);
    this.syncFromValue();
  }

  private syncFromValue(): void {
    if (this.value && this.value.startDate && this.value.endDate) {
      this.selectedRange = {
        startDate: new Date(this.value.startDate),
        endDate: new Date(this.value.endDate)
      };
      return;
    }

    this.selectedRange = { startDate: null, endDate: null };
  }

  get startDateValue(): string {
    return this.selectedRange.startDate ? this.toInputDate(this.selectedRange.startDate) : '';
  }

  get endDateValue(): string {
    return this.selectedRange.endDate ? this.toInputDate(this.selectedRange.endDate) : '';
  }

  onStartDateChange(value: string): void {
    this.selectedRange.startDate = value ? new Date(value) : null;
    this.emitRange();
  }

  onEndDateChange(value: string): void {
    this.selectedRange.endDate = value ? new Date(value) : null;
    this.emitRange();
  }

  clearSelection(): void {
    this.selectedRange = { startDate: null, endDate: null };
    this.updateValue(null as any);
  }

  get displayValue(): string {
    return this.dateRangeLogic.getDisplayValue(this.selectedRange);
  }

  private emitRange(): void {
    if (this.selectedRange.startDate && this.selectedRange.endDate) {
      this.updateValue({ ...this.selectedRange } as any);
      return;
    }

    this.updateValue(null as any);
  }

  private toInputDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}

