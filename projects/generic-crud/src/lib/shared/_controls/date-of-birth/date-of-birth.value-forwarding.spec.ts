import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DateOfBirthComponent } from './date-of-birth.component';
import { RangeDateComponent } from '../range-date/range-date.component';

@Component({
  standalone: false,
  selector: 'lib-dob-host',
  template: `
    <gc-date-of-birth [formControl]="dobControl"></gc-date-of-birth>
    <gc-range-date [formControl]="rangeControl"></gc-range-date>
  `
})
class HostComponent {
  dobControl = new FormControl(null);
  rangeControl = new FormControl(null);
}

describe('date controls reflect writes from the form', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let dob: DateOfBirthComponent;
  let range: RangeDateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [HostComponent, DateOfBirthComponent, RangeDateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    dob = fixture.debugElement.query(By.directive(DateOfBirthComponent)).componentInstance;
    range = fixture.debugElement.query(By.directive(RangeDateComponent)).componentInstance;
  });

  it('date-of-birth reflects a value patched after view init', () => {
    host.dobControl.setValue('1990-05-17');
    fixture.detectChanges();

    expect(dob.selectedYear).toBe(1990);
    expect(dob.selectedMonth).toBe(5);
    expect(dob.selectedDay).toBe(17);
  });

  it('date-of-birth clears its selection on reset', () => {
    host.dobControl.setValue('1990-05-17');
    fixture.detectChanges();
    host.dobControl.reset();
    fixture.detectChanges();

    expect(dob.selectedYear).toBe(0);
    expect(dob.selectedMonth).toBe(0);
    expect(dob.selectedDay).toBe(0);
  });

  it('range-date reflects a range patched after view init', () => {
    host.rangeControl.setValue({ startDate: '2024-01-10', endDate: '2024-02-20' });
    fixture.detectChanges();

    expect(range.selectedRange.startDate).toEqual(new Date('2024-01-10'));
    expect(range.selectedRange.endDate).toEqual(new Date('2024-02-20'));
  });

  it('range-date repaints its rendered display value, not just its state', () => {
    const displayInput = () => fixture.debugElement
      .query(By.directive(RangeDateComponent))
      .query(By.css('input')).nativeElement.value;

    expect(displayInput()).toBe('');

    host.rangeControl.setValue({ startDate: '2024-01-10', endDate: '2024-02-20' });
    fixture.detectChanges();

    expect(displayInput()).toBe(range.getDisplayValue());
    expect(displayInput()).not.toBe('');
  });

  it('range-date clears its selection on reset', () => {
    host.rangeControl.setValue({ startDate: '2024-01-10', endDate: '2024-02-20' });
    fixture.detectChanges();
    host.rangeControl.reset();
    fixture.detectChanges();

    expect(range.selectedRange.startDate).toBeNull();
    expect(range.selectedRange.endDate).toBeNull();
  });
});
