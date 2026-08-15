import { ValidationMessageLogic } from './validation-message.logic';

describe('ValidationMessageLogic', () => {
  let logic: ValidationMessageLogic;

  beforeEach(() => {
    logic = new ValidationMessageLogic();
  });

  it('should interpolate object based error values', () => {
    const message = logic.formatMessages({
      minlength: {
        requiredLength: 3,
        actualLength: 1
      }
    });

    expect(message).toContain('greater than 3 characters');
    expect(message).toContain('current length is 1');
  });

  it('should use regex message for pattern errors', () => {
    const message = logic.formatMessages({ pattern: {} }, 'Invalid format');

    expect(message).toContain('Invalid format');
  });

  it('should return empty string for invalid errors input', () => {
    expect(logic.formatMessages(null as any)).toBe('');
  });
});