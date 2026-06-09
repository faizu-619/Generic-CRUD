import { Component, OnInit, Input, forwardRef, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterRangeDate } from '../_models/filter-range-date';
import { BaseControlValueAccessor } from '../_base/base-control-value-accessor';

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

@Component({
    selector: 'gc-range-date',
    templateUrl: './range-date.component.html',
    styleUrls: ['./range-date.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RangeDateComponent),
            multi: true
        }
    ]
})
export class RangeDateComponent extends BaseControlValueAccessor implements OnInit {
    @Input() control: FilterRangeDate;

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
        this.isReady = true;
    }

    initializeMonths(): void {
        const now = new Date();
        this.currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        this.nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    generateCalendars(): void {
        this.currentMonthDays = this.generateMonthDays(this.currentMonth);
        this.nextMonthDays = this.generateMonthDays(this.nextMonth);
    }

    generateMonthDays(monthDate: Date): Date[][] {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const weeks: Date[][] = [];
        let week: Date[] = [];
        
        // Fill in days from previous month
        const firstDayOfWeek = firstDay.getDay();
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            week.push(new Date(year, month - 1, prevMonthLastDay - i));
        }
        
        // Fill in days of current month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            week.push(new Date(year, month, day));
            
            if (week.length === 7) {
                weeks.push(week);
                week = [];
            }
        }
        
        // Fill in days from next month
        if (week.length > 0) {
            let nextMonthDay = 1;
            while (week.length < 7) {
                week.push(new Date(year, month + 1, nextMonthDay++));
            }
            weeks.push(week);
        }
        
        return weeks;
    }

    toggleCalendar(): void {
        if (this.control?.isDisabled) {
            return;
        }
        this.isOpen = !this.isOpen;
    }

    previousMonth(): void {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
        this.nextMonth = new Date(this.nextMonth.getFullYear(), this.nextMonth.getMonth() - 1, 1);
        this.generateCalendars();
    }

    nextMonthClick(): void {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
        this.nextMonth = new Date(this.nextMonth.getFullYear(), this.nextMonth.getMonth() + 1, 1);
        this.generateCalendars();
    }

    selectDate(date: Date): void {
        if (this.isDateDisabled(date)) {
            return;
        }

        if (!this.isSelectingEndDate || !this.selectedRange.startDate) {
            // Start new selection
            this.selectedRange.startDate = new Date(date);
            this.selectedRange.endDate = null;
            this.isSelectingEndDate = true;
        } else {
            // Complete the selection
            if (date < this.selectedRange.startDate) {
                // If end date is before start, swap them
                this.selectedRange.endDate = this.selectedRange.startDate;
                this.selectedRange.startDate = new Date(date);
            } else {
                this.selectedRange.endDate = new Date(date);
            }
            this.isSelectingEndDate = false;
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
        this.selectedRange = { startDate: null, endDate: null };
        this.isSelectingEndDate = false;
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
        if (!this.control?.invalidDates) {
            return false;
        }
        // Check if date is in invalid dates list
        return this.control.invalidDates.some(d => this.isSameDay(d, date));
    }

    isSameDay(date1: any, date2: Date): boolean {
        if (!date1 || !date2) return false;
        const d1 = date1 instanceof Date ? date1 : new Date(date1);
        return d1.getFullYear() === date2.getFullYear() &&
               d1.getMonth() === date2.getMonth() &&
               d1.getDate() === date2.getDate();
    }

    isDateInRange(date: Date): boolean {
        if (!this.selectedRange.startDate) return false;
        
        const compareDate = this.isSelectingEndDate && this.hoverDate ? this.hoverDate : this.selectedRange.endDate;
        if (!compareDate) return false;
        
        const start = this.selectedRange.startDate < compareDate ? this.selectedRange.startDate : compareDate;
        const end = this.selectedRange.startDate < compareDate ? compareDate : this.selectedRange.startDate;
        
        return date >= start && date <= end;
    }

    isStartDate(date: Date): boolean {
        return this.selectedRange.startDate !== null && this.isSameDay(this.selectedRange.startDate, date);
    }

    isEndDate(date: Date): boolean {
        return this.selectedRange.endDate !== null && this.isSameDay(this.selectedRange.endDate, date);
    }

    isCurrentMonth(date: Date, monthDate: Date): boolean {
        return date.getMonth() === monthDate.getMonth();
    }

    isToday(date: Date): boolean {
        const today = new Date();
        return this.isSameDay(today, date);
    }

    getDateClasses(date: Date, monthDate: Date): string {
        const classes: string[] = ['calendar-day'];
        
        if (!this.isCurrentMonth(date, monthDate)) {
            classes.push('other-month');
        }
        if (this.isToday(date)) {
            classes.push('today');
        }
        if (this.isStartDate(date) || this.isEndDate(date)) {
            classes.push('selected');
        }
        if (this.isDateInRange(date) && !this.isStartDate(date) && !this.isEndDate(date)) {
            classes.push('in-range');
        }
        if (this.isDateDisabled(date)) {
            classes.push('disabled');
        }
        
        return classes.join(' ');
    }

    getDisplayValue(): string {
        if (this.selectedRange.startDate && this.selectedRange.endDate) {
            return `${this.formatDate(this.selectedRange.startDate)} - ${this.formatDate(this.selectedRange.endDate)}`;
        }
        return '';
    }

    formatDate(date: Date): string {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
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
