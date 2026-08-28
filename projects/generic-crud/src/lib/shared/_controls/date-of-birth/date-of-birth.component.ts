import {Component, forwardRef, Input, OnDestroy, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FilterDateOfBirth} from '../_models';
import {BaseControlValueAccessor} from '../_base';
import {DateOfBirthLogic} from '../_logic';

@Component({
  standalone: false,
  selector: 'gc-date-of-birth',
  templateUrl: './date-of-birth.component.html',
  styleUrls: ['./date-of-birth.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateOfBirthComponent),
      multi: true
    }
  ]
})
export class DateOfBirthComponent extends BaseControlValueAccessor implements OnInit, OnDestroy {
  @Input() control: FilterDateOfBirth = new FilterDateOfBirth();
  private readonly dateOfBirthLogic = new DateOfBirthLogic();

  selectedYear = 0;
  selectedMonth = 0;
  selectedDay = 0;
  years = [];
  months = [];
  days = [];
  error: boolean;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.syncFromValue();
    this.MONTHS();
    this.YEARS();
  }

  ngOnDestroy(): void {
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
      this.DAYS(this.selectedMonth, this.selectedYear);
      this.selectedDay = parsed.selectedDay;
      return;
    }

    this.selectedYear = 0;
    this.selectedMonth = 0;
    this.selectedDay = 0;
    this.days = [];
  }

  YEARS(): any {
    this.years = this.dateOfBirthLogic.getYears(this.control.maxAge, this.control.minAge);
    return this.years;
  }

  MONTHS(): any {
    this.months = this.dateOfBirthLogic.getMonths();
    return this.months;
  }

  DAYS(month, year): any {
    this.days = this.dateOfBirthLogic.getDays(Number(month), Number(year));
    return this.days;
  }

  changeDate(): void {
    this.DAYS(this.selectedMonth, this.selectedYear);

    const result = this.dateOfBirthLogic.buildChangeResult(
      {
        selectedYear: Number(this.selectedYear),
        selectedMonth: Number(this.selectedMonth),
        selectedDay: Number(this.selectedDay)
      },
      this.control?.minAge || 18
    );

    this.updateValue(result.value);
    this.error = result.error;
  }
}
