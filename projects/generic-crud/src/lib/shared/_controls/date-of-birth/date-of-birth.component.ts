import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as _moment from 'moment';
import * as _ from 'lodash';
import { FilterDateOfBirth } from '../_models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-date-of-birth',
  templateUrl: './date-of-birth.component.html',
  styleUrls: ['./date-of-birth.component.css']
})
export class DateOfBirthComponent implements OnInit, OnDestroy {
  @Input() control: FilterDateOfBirth;
  @Input() form: FormGroup;

  selectedYear = 0;
  selectedMonth = 0;
  selectedDay = 0;
  years = [];
  months = [];
  days = [];
  error: boolean;

  constructor() { }

  ngOnInit(): void {

    if (this.form.get(this.control.key).value) {
      const date = new Date(this.form.get(this.control.key).value);

      //console.log(moment(date).get("month")+1);
      this.selectedYear = _moment(date).get("year");
      const month = _moment(date).get("month") + 1;
      this.selectedMonth = month;
      this.DAYS(this.selectedMonth, this.selectedYear);
      this.selectedDay = _moment(date).get("date");

    }
    this.YEARS();
  }

  ngOnDestroy(): void {
  }

  YEARS(): any {
    this.years = [];
    const dateStart = _moment().add((-1 * this.control.maxAge), 'y');
    const dateEnd = _moment().add((-1 * this.control.minAge), 'y');
    while (dateEnd.diff(dateStart, 'years') >= 0) {
      this.years.push(dateStart.format('YYYY'));
      dateStart.add(1, 'year');
    }
    this.years = this.years.sort((a, b) => { return b - a });
    return this.years;
  }

  MONTHS(): any {
    this.months = [];
    const dateStart = _moment();
    const dateEnd = _moment().add(12, 'month');
    while (dateEnd.diff(dateStart, 'months') > 0) {
      this.months.push(dateStart.format('MM'));
      dateStart.add(1, 'month');
    }
    return this.months;
  }

  DAYS(month, year): any {
    this.days = [];
    const dateStart = _moment(`${year}-${month}`, 'YYYY-MM');
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

      var a = new Date(value)

      var f = _moment().diff(a, 'days');
      if (f >= 6570) {
        this.form.controls[this.control.key].setValue(value);
        this.error = false;
      } else {
        this.form.controls[this.control.key].setValue(null);
        this.error = true;
      }

    } else if (this.control && this.form) {
      this.form.controls[this.control.key].setValue(null);
    }
  }

  // private updateValue(value: string) {
  //   if (value && value.length && moment(value).isValid()) {
  //     var date = moment(value);
  //     this.selectedYear = date.year();
  //     this.selectedMonth = date.month();
  //     this.DAYS(this.selectedMonth, this.selectedYear);
  //     this.selectedDay = date.day();
  //   }
  // }

}
