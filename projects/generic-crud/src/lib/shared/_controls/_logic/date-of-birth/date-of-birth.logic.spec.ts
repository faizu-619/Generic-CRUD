import { DateOfBirthLogic } from './date-of-birth.logic';

describe('DateOfBirthLogic', () => {
  let logic: DateOfBirthLogic;

  beforeEach(() => {
    logic = new DateOfBirthLogic();
  });

  it('should return years in descending order between maxAge and minAge', () => {
    const years = logic.getYears(20, 18, new Date(2026, 0, 1));

    expect(years).toEqual([2008, 2007, 2006]);
  });

  it('should return leap year days for February', () => {
    const days = logic.getDays(2, 2024);

    expect(days.length).toBe(29);
    expect(days[0]).toBe(1);
    expect(days[28]).toBe(29);
  });

  it('should parse date string value into selection fields', () => {
    const parsed = logic.parseValue('2020-12-25');

    expect(parsed.selectedYear).toBe(2020);
    expect(parsed.selectedMonth).toBe(12);
    expect(parsed.selectedDay).toBe(25);
  });

  it('should return valid value when min age is met', () => {
    const result = logic.buildChangeResult(
      { selectedYear: 2000, selectedMonth: 1, selectedDay: 1 },
      18,
      new Date(2026, 0, 1)
    );

    expect(result.error).toBeFalse();
    expect(result.value).toBe('2000-1-1');
  });

  it('should return error when min age is not met', () => {
    const result = logic.buildChangeResult(
      { selectedYear: 2015, selectedMonth: 1, selectedDay: 1 },
      18,
      new Date(2026, 0, 1)
    );

    expect(result.error).toBeTrue();
    expect(result.value).toBeNull();
  });
});