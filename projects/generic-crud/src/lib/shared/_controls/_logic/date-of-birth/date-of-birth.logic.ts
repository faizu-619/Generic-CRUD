export interface DateOfBirthSelection {
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
}

export interface DateOfBirthChangeResult {
  value: string | null;
  error: boolean;
}

export class DateOfBirthLogic {
  getYears(maxAge: number, minAge: number, currentDate: Date = new Date()): number[] {
    const startYear = currentDate.getFullYear() - maxAge;
    const endYear = currentDate.getFullYear() - minAge;
    const years: number[] = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return years.sort((firstYear, secondYear) => secondYear - firstYear);
  }

  getMonths(): number[] {
    return Array.from({ length: 12 }, (_, index) => index + 1);
  }

  getDays(month: number, year: number): number[] {
    if (!month || !year) {
      return [];
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (!daysInMonth || Number.isNaN(daysInMonth)) {
      return [];
    }

    return Array.from({ length: daysInMonth }, (_, index) => index + 1);
  }

  parseValue(value: string | Date | null | undefined): DateOfBirthSelection | null {
    if (!value) {
      return null;
    }

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return {
      selectedYear: date.getFullYear(),
      selectedMonth: date.getMonth() + 1,
      selectedDay: date.getDate()
    };
  }

  buildChangeResult(selection: DateOfBirthSelection, minAge: number, currentDate: Date = new Date()): DateOfBirthChangeResult {
    if (!selection.selectedMonth || !selection.selectedYear || !selection.selectedDay) {
      return { value: null, error: false };
    }

    const value = `${selection.selectedYear}-${selection.selectedMonth}-${selection.selectedDay}`;
    const selectedDate = new Date(value);

    if (Number.isNaN(selectedDate.getTime())) {
      return { value: null, error: true };
    }

    const minimumAgeInDays = minAge * 365;
    const ageInDays = Math.floor((currentDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24));

    if (ageInDays >= minimumAgeInDays) {
      return {
        value,
        error: false
      };
    }

    return {
      value: null,
      error: true
    };
  }
}