import { DateRangeLogic } from './date-range.logic';

describe('DateRangeLogic', () => {
  let logic: DateRangeLogic;

  beforeEach(() => {
    logic = new DateRangeLogic();
  });

  it('should initialize current and next months from a given date', () => {
    const result = logic.initializeMonths(new Date(2026, 4, 20));

    expect(result.currentMonth.getFullYear()).toBe(2026);
    expect(result.currentMonth.getMonth()).toBe(4);
    expect(result.currentMonth.getDate()).toBe(1);
    expect(result.nextMonth.getMonth()).toBe(5);
  });

  it('should generate calendar weeks with 7 days per week', () => {
    const weeks = logic.generateMonthDays(new Date(2026, 0, 1));

    expect(weeks.length).toBeGreaterThan(3);
    expect(weeks.every(week => week.length === 7)).toBeTrue();
  });

  it('should select start date then end date and close selection mode', () => {
    const firstClick = logic.selectDate(
      {
        selectedRange: { startDate: null, endDate: null },
        isSelectingEndDate: false,
        hoverDate: null
      },
      new Date(2026, 0, 10)
    );

    const secondClick = logic.selectDate(firstClick, new Date(2026, 0, 15));

    expect(firstClick.isSelectingEndDate).toBeTrue();
    expect(secondClick.selectedRange.startDate).toEqual(new Date(2026, 0, 10));
    expect(secondClick.selectedRange.endDate).toEqual(new Date(2026, 0, 15));
    expect(secondClick.isSelectingEndDate).toBeFalse();
  });

  it('should swap dates when second selection is before start date', () => {
    const firstClick = logic.selectDate(
      {
        selectedRange: { startDate: null, endDate: null },
        isSelectingEndDate: false,
        hoverDate: null
      },
      new Date(2026, 0, 20)
    );

    const secondClick = logic.selectDate(firstClick, new Date(2026, 0, 10));

    expect(secondClick.selectedRange.startDate).toEqual(new Date(2026, 0, 10));
    expect(secondClick.selectedRange.endDate).toEqual(new Date(2026, 0, 20));
  });

  it('should return display value for completed range', () => {
    const text = logic.getDisplayValue({
      startDate: new Date(2026, 0, 2),
      endDate: new Date(2026, 0, 11)
    });

    expect(text).toBe('01/02/2026 - 01/11/2026');
  });
});