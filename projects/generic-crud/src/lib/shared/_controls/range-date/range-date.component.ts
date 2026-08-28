import { Component, OnInit, Input, forwardRef, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterRangeDate } from '../_models/filter-range-date';
import { BaseControlValueAccessor } from '../_base/base-control-value-accessor';
import { DateRange, DateRangeLogic, DateRangeSelectionState } from '../_logic';

@Component({
  standalone: false,
    selector: 'gc-range-date',
    templateUrl: './range-date.component.html',
    styleUrls: ['./range-date.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RangeDateComponent),
            multi: true
        }
    ]
})
export class RangeDateComponent extends BaseControlValueAccessor implements OnInit {
    @Input() control: FilterRangeDate = new FilterRangeDate();
    private readonly dateRangeLogic = new DateRangeLogic();

    isReady = false;
    isOpen = false;
    
    // Calendar state
    currentMonth: Date = new Date();
    nextMonth: Date = new Date();
    selectedRange: DateRange = { startDate: null, endDate: null };
    hoverDate: Date | null = null;
    
    // Date selection state
    isSelectingEndDate = false;
    
    // Calendar data
    weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
    
    currentMonthDays: Date[][] = [];
    nextMonthDays: Date[][] = [];

    constructor(private elementRef: ElementRef) {
        super();
    }

    ngOnInit() {
        this.initializeMonths();
        this.generateCalendars();
        this.syncFromValue();
        this.isReady = true;
    }

    writeValue(value: any): void {
        super.writeValue(value);
        this.syncFromValue();
    }

    private syncFromValue(): void {
        const value: any = this.value;
        if (value && value.startDate && value.endDate) {
            this.selectedRange = {
                startDate: new Date(value.startDate),
                endDate: new Date(value.endDate)
            };
            this.isSelectingEndDate = false;
            return;
        }

        this.selectedRange = { startDate: null, endDate: null };
        this.isSelectingEndDate = false;
    }

    initializeMonths(): void {
        const months = this.dateRangeLogic.initializeMonths();
        this.currentMonth = months.currentMonth;
        this.nextMonth = months.nextMonth;
    }

    generateCalendars(): void {
        this.currentMonthDays = this.generateMonthDays(this.currentMonth);
        this.nextMonthDays = this.generateMonthDays(this.nextMonth);
    }

    generateMonthDays(monthDate: Date): Date[][] {
        return this.dateRangeLogic.generateMonthDays(monthDate);
    }

    toggleCalendar(): void {
        if (this.control?.isDisabled) {
            return;
        }
        this.isOpen = !this.isOpen;
    }

    previousMonth(): void {
        const months = this.dateRangeLogic.shiftMonths(this.currentMonth, this.nextMonth, -1);
        this.currentMonth = months.currentMonth;
        this.nextMonth = months.nextMonth;
        this.generateCalendars();
    }

    nextMonthClick(): void {
        const months = this.dateRangeLogic.shiftMonths(this.currentMonth, this.nextMonth, 1);
        this.currentMonth = months.currentMonth;
        this.nextMonth = months.nextMonth;
        this.generateCalendars();
    }

    selectDate(date: Date): void {
        const nextState = this.dateRangeLogic.selectDate(
            this.getSelectionState(),
            date,
            this.control?.invalidDates || []
        );

        const shouldApply =
            nextState.selectedRange.startDate !== null
            && nextState.selectedRange.endDate !== null
            && !nextState.isSelectingEndDate;

        this.selectedRange = nextState.selectedRange;
        this.isSelectingEndDate = nextState.isSelectingEndDate;
        this.hoverDate = nextState.hoverDate;

        if (shouldApply) {
            this.applySelection();
        }
    }

    applySelection(): void {
        if (this.selectedRange.startDate && this.selectedRange.endDate) {
            this.updateValue(this.selectedRange);
            this.isOpen = false;
        }
    }

    clearSelection(): void {
        const cleared = this.dateRangeLogic.clearSelection();
        this.selectedRange = cleared.selectedRange;
        this.isSelectingEndDate = cleared.isSelectingEndDate;
        this.hoverDate = cleared.hoverDate;
        this.updateValue(null);
        this.isOpen = false;
    }

    onMouseEnter(date: Date): void {
        if (this.isSelectingEndDate && this.selectedRange.startDate) {
            this.hoverDate = date;
        }
    }

    onMouseLeave(): void {
        this.hoverDate = null;
    }

    isDateDisabled(date: Date): boolean {
        return this.dateRangeLogic.isDateDisabled(date, this.control?.invalidDates || []);
    }

    isSameDay(date1: any, date2: Date): boolean {
        return this.dateRangeLogic.isSameDay(date1, date2);
    }

    isDateInRange(date: Date): boolean {
        return this.dateRangeLogic.isDateInRange(date, this.getSelectionState());
    }

    isStartDate(date: Date): boolean {
        return this.selectedRange.startDate !== null && this.isSameDay(this.selectedRange.startDate, date);
    }

    isEndDate(date: Date): boolean {
        return this.selectedRange.endDate !== null && this.isSameDay(this.selectedRange.endDate, date);
    }

    isCurrentMonth(date: Date, monthDate: Date): boolean {
        return this.dateRangeLogic.isCurrentMonth(date, monthDate);
    }

    isToday(date: Date): boolean {
        return this.dateRangeLogic.isToday(date);
    }

    getDateClasses(date: Date, monthDate: Date): string {
        const classes: string[] = ['calendar-day'];

        const state = this.dateRangeLogic.getDateCellState(
            date,
            monthDate,
            this.getSelectionState(),
            this.control?.invalidDates || []
        );

        if (state.isOtherMonth) {
            classes.push('other-month');
        }
        if (state.isToday) {
            classes.push('today');
        }
        if (state.isStartDate || state.isEndDate) {
            classes.push('selected');
        }
        if (state.isInRange) {
            classes.push('in-range');
        }
        if (state.isDisabled) {
            classes.push('disabled');
        }

        return classes.join(' ');
    }

    getDisplayValue(): string {
        return this.dateRangeLogic.getDisplayValue(this.selectedRange);
    }

    formatDate(date: Date): string {
        return this.dateRangeLogic.formatDate(date);
    }

    private getSelectionState(): DateRangeSelectionState {
        return {
            selectedRange: this.selectedRange,
            isSelectingEndDate: this.isSelectingEndDate,
            hoverDate: this.hoverDate
        };
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }

    onBlur(): void {
        this.onTouched();
    }
}
