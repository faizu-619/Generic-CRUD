export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangeSelectionState {
  selectedRange: DateRange;
  isSelectingEndDate: boolean;
  hoverDate: Date | null;
}

export interface DateCellState {
  isOtherMonth: boolean;
  isToday: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isInRange: boolean;
  isDisabled: boolean;
}

export class DateRangeLogic {
  initializeMonths(now: Date = new Date()): { currentMonth: Date; nextMonth: Date } {
    return {
      currentMonth: new Date(now.getFullYear(), now.getMonth(), 1),
      nextMonth: new Date(now.getFullYear(), now.getMonth() + 1, 1)
    };
  }

  shiftMonths(currentMonth: Date, nextMonth: Date, offset: number): { currentMonth: Date; nextMonth: Date } {
    return {
      currentMonth: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1),
      nextMonth: new Date(nextMonth.getFullYear(), nextMonth.getMonth() + offset, 1)
    };
  }

  generateMonthDays(monthDate: Date): Date[][] {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const weeks: Date[][] = [];
    let week: Date[] = [];

    const firstDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      week.push(new Date(year, month - 1, prevMonthLastDay - i));
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      week.push(new Date(year, month, day));

      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      let nextMonthDay = 1;
      while (week.length < 7) {
        week.push(new Date(year, month + 1, nextMonthDay++));
      }
      weeks.push(week);
    }

    return weeks;
  }

  clearSelection(): DateRangeSelectionState {
    return {
      selectedRange: { startDate: null, endDate: null },
      isSelectingEndDate: false,
      hoverDate: null
    };
  }

  selectDate(state: DateRangeSelectionState, date: Date, invalidDates: any[] = []): DateRangeSelectionState {
    if (this.isDateDisabled(date, invalidDates)) {
      return state;
    }

    if (!state.isSelectingEndDate || !state.selectedRange.startDate) {
      return {
        selectedRange: {
          startDate: new Date(date),
          endDate: null
        },
        isSelectingEndDate: true,
        hoverDate: null
      };
    }

    const startDate = state.selectedRange.startDate;
    if (date < startDate) {
      return {
        selectedRange: {
          startDate: new Date(date),
          endDate: new Date(startDate)
        },
        isSelectingEndDate: false,
        hoverDate: null
      };
    }

    return {
      selectedRange: {
        startDate: new Date(startDate),
        endDate: new Date(date)
      },
      isSelectingEndDate: false,
      hoverDate: null
    };
  }

  isDateDisabled(date: Date, invalidDates: any[] = []): boolean {
    return invalidDates.some(invalidDate => this.isSameDay(invalidDate, date));
  }

  isSameDay(date1: any, date2: Date): boolean {
    if (!date1 || !date2) {
      return false;
    }

    const firstDate = date1 instanceof Date ? date1 : new Date(date1);
    return firstDate.getFullYear() === date2.getFullYear()
      && firstDate.getMonth() === date2.getMonth()
      && firstDate.getDate() === date2.getDate();
  }

  isDateInRange(date: Date, state: DateRangeSelectionState): boolean {
    if (!state.selectedRange.startDate) {
      return false;
    }

    const compareDate = state.isSelectingEndDate && state.hoverDate
      ? state.hoverDate
      : state.selectedRange.endDate;

    if (!compareDate) {
      return false;
    }

    const start = state.selectedRange.startDate < compareDate ? state.selectedRange.startDate : compareDate;
    const end = state.selectedRange.startDate < compareDate ? compareDate : state.selectedRange.startDate;

    return date >= start && date <= end;
  }

  isCurrentMonth(date: Date, monthDate: Date): boolean {
    return date.getMonth() === monthDate.getMonth();
  }

  isToday(date: Date): boolean {
    return this.isSameDay(new Date(), date);
  }

  getDateCellState(date: Date, monthDate: Date, state: DateRangeSelectionState, invalidDates: any[] = []): DateCellState {
    const isStartDate = state.selectedRange.startDate !== null && this.isSameDay(state.selectedRange.startDate, date);
    const isEndDate = state.selectedRange.endDate !== null && this.isSameDay(state.selectedRange.endDate, date);

    return {
      isOtherMonth: !this.isCurrentMonth(date, monthDate),
      isToday: this.isToday(date),
      isStartDate,
      isEndDate,
      isInRange: this.isDateInRange(date, state) && !isStartDate && !isEndDate,
      isDisabled: this.isDateDisabled(date, invalidDates)
    };
  }

  formatDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  getDisplayValue(selectedRange: DateRange): string {
    if (selectedRange.startDate && selectedRange.endDate) {
      return `${this.formatDate(selectedRange.startDate)} - ${this.formatDate(selectedRange.endDate)}`;
    }

    return '';
  }
}