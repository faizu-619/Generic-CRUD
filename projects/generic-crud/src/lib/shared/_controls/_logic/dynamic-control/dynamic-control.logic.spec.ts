import { of } from 'rxjs';
import { ControlType, FilterBase } from '../../_models';
import { DynamicControlLogic } from './dynamic-control.logic';

describe('DynamicControlLogic', () => {
  let logic: DynamicControlLogic;

  beforeEach(() => {
    logic = new DynamicControlLogic();
  });

  it('should resolve parameter control when rendered as parameter', () => {
    const parameterControl = new FilterBase({ key: 'p' });
    const result = logic.resolveInitialControl(
      {
        isRenderedAsParameter: true,
        param: { p: 1 },
        dataType: null,
        controlObject: new FilterBase({ key: 'control' })
      },
      () => parameterControl,
      () => new FilterBase({ key: 'd' })
    );

    expect(result.control).toBe(parameterControl);
    expect(result.shouldSetControl).toBeFalse();
  });

  it('should identify remote source type', () => {
    expect(logic.resolveRemoteSourceType('/api/lookup')).toBe('url');
    expect(logic.resolveRemoteSourceType(of([]))).toBe('observable');
    expect(logic.resolveRemoteSourceType(null)).toBe('none');
  });

  it('should allow remote loading only for remote non-autocomplete controls', () => {
    const control = new FilterBase({ isRemote: true, controlType: ControlType.Dropdown });
    const autocomplete = new FilterBase({ isRemote: true, controlType: ControlType.AutocompleteTextbox });

    expect(logic.canLoadRemote(control)).toBeTrue();
    expect(logic.canLoadRemote(autocomplete)).toBeFalse();
  });

  it('should evaluate hasValue for regular and range date controls', () => {
    expect(logic.hasValue('abc', ControlType.TextBox, true)).toBeTrue();
    expect(logic.hasValue('', ControlType.TextBox, false)).toBeTrue();
    expect(logic.hasValue(null, ControlType.RangeDate, true)).toBeTrue();
  });
});