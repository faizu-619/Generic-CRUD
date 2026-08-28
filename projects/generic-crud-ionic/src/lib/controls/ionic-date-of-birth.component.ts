import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, DateOfBirthLogic, FilterDateOfBirth } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gci-date-of-birth',
  templateUrl: './ionic-date-of-birth.component.html',
  styleUrls: ['./ionic-date-of-birth.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonicDateOfBirthComponent),
      multi: true
    }
  ]
})
export class IonicDateOfBirthComponent extends BaseControlValueAccessor<any> {
  @Input() control: FilterDateOfBirth;
  private readonly dateOfBirthLogic = new DateOfBirthLogic();

  selectedYear = 0;
  selectedMonth = 0;
  selectedDay = 0;
  years: number[] = [];
  days: number[] = [];
  error = false;

  ngOnInit(): void {
    this.syncFromValue();
    this.years = this.dateOfBirthLogic.getYears(this.control?.maxAge || 150, this.control?.minAge || 18);
  }

  writeValue(value: any): void {
    super.writeValue(value);
    this.syncFromValue();
  }

  private syncFromValue(): void {
    const parsed = this.dateOfBirthLogic.parseValue(this.value);
    if (parsed) {
      this.selectedYear = parsed.selectedYear;
      this.selectedMonth = parsed.selectedMonth;
      this.selectedDay = parsed.selectedDay;
      this.days = this.dateOfBirthLogic.getDays(this.selectedMonth, this.selectedYear);
      return;
    }

    this.selectedYear = 0;
    this.selectedMonth = 0;
    this.selectedDay = 0;
    this.days = [];
  }

  get months(): number[] {
    return this.dateOfBirthLogic.getMonths();
  }

  onSelectionChange(): void {
    this.days = this.dateOfBirthLogic.getDays(this.selectedMonth, this.selectedYear);

    const result = this.dateOfBirthLogic.buildChangeResult(
      {
        selectedYear: Number(this.selectedYear),
        selectedMonth: Number(this.selectedMonth),
        selectedDay: Number(this.selectedDay)
      },
      this.control?.minAge || 18
    );

    this.error = result.error;
    this.updateValue(result.value as any);
  }
}
