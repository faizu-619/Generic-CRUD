import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import moment from 'moment';
import {FilterDateOfBirth} from '../_models';
import {BaseControlValueAccessor} from '../_base';

@Component({
  selector: 'gc-date-of-birth',
  templateUrl: './date-of-birth.component.html',
  styleUrls: ['./date-of-birth.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateOfBirthComponent),
      multi: true
    }
  ]
})
export class DateOfBirthComponent extends BaseControlValueAccessor implements OnInit, OnDestroy {
  @Input() control: FilterDateOfBirth;

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
    if (this.value) {
      const date = new Date(this.value);
      this.selectedYear = moment(date).get('year');
      this.selectedMonth = moment(date).get('month') + 1;
      this.DAYS(this.selectedMonth, this.selectedYear);
      this.selectedDay = moment(date).get('date');
    }
    this.YEARS();
  }

  ngOnDestroy(): void {
  }

  YEARS(): any {
    this.years = [];
    const dateStart = moment().add((-1 * this.control.maxAge), 'y');
    const dateEnd = moment().add((-1 * this.control.minAge), 'y');
    while (dateEnd.diff(dateStart, 'years') >= 0) {
      this.years.push(dateStart.format('YYYY'));
      dateStart.add(1, 'year');
    }
    this.years = this.years.sort((a, b) => b - a);
    return this.years;
  }

  MONTHS(): any {
    this.months = [];
    const dateStart = moment();
    const dateEnd = moment().add(12, 'month');
    while (dateEnd.diff(dateStart, 'months') > 0) {
      this.months.push(dateStart.format('MM'));
      dateStart.add(1, 'month');
    }
    return this.months;
  }

  DAYS(month, year): any {
    this.days = [];
    const dateStart = moment(`${year}-${month}`, 'YYYY-MM');
    if (dateStart.isValid()) {
      const dateEnd = dateStart.daysInMonth();
      for (let index = 1; index <= dateEnd; index++) {
        this.days.push(index);
      }
    }
    return this.days;
  }

  changeDate(): void {
    this.DAYS(this.selectedMonth, this.selectedYear);
    if (this.control && this.selectedMonth && this.selectedYear && this.selectedDay) {
      const value = `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`;
      const a = new Date(value);
      const f = moment().diff(a, 'days');
      if (f >= 6570) {
        this.updateValue(value);
        this.error = false;
      } else {
        this.updateValue(null);
        this.error = true;
      }
    } else {
      this.updateValue(null);
    }
  }
}
