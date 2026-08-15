import { CustomFilterLogic } from './custom-filter.logic';

describe('CustomFilterLogic', () => {
  let logic: CustomFilterLogic;

  beforeEach(() => {
    logic = new CustomFilterLogic();
  });

  it('should create bindings with delegated value change callback', () => {
    const updateValue = jasmine.createSpy('updateValue');
    const control = { component: class {} } as any;
    const bindings = logic.createBindings(control, updateValue);

    bindings.valueChange('next');

    expect(bindings.control).toBe(control);
    expect(updateValue).toHaveBeenCalledWith('next');
  });

  it('should validate if component can be loaded', () => {
    expect(logic.shouldLoadComponent({ component: class {} } as any)).toBeTrue();
    expect(logic.shouldLoadComponent({ component: null } as any)).toBeFalse();
  });
});