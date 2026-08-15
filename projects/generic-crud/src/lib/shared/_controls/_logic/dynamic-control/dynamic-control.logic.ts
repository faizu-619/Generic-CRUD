import { Observable } from 'rxjs';
import { ControlType, FilterBase } from '../../_models';

export type RemoteSourceType = 'url' | 'observable' | 'none';

export interface DynamicControlInitInput {
  isRenderedAsParameter: boolean;
  param: any;
  dataType: any;
  controlObject: FilterBase<any>;
}

export class DynamicControlLogic {
  resolveInitialControl(
    input: DynamicControlInitInput,
    fromParameterType: (param: any) => FilterBase<any>,
    fromDataType: (dataType: any) => FilterBase<any>
  ): { control: FilterBase<any>; shouldSetControl: boolean } {
    if (input.isRenderedAsParameter && input.param) {
      return {
        control: fromParameterType(input.param),
        shouldSetControl: false
      };
    }

    if (input.dataType) {
      return {
        control: fromDataType(input.dataType),
        shouldSetControl: false
      };
    }

    return {
      control: input.controlObject,
      shouldSetControl: true
    };
  }

  canLoadRemote(ctrl: FilterBase<any>): boolean {
    return !!ctrl && ctrl.isRemote && ctrl.controlType !== ControlType.AutocompleteTextbox;
  }

  resolveRemoteSourceType(remoteUrl: string | Observable<any> | any): RemoteSourceType {
    if (typeof remoteUrl === 'string') {
      return 'url';
    }

    if (typeof remoteUrl === 'object' && remoteUrl) {
      return 'observable';
    }

    return 'none';
  }

  shouldSubscribeToOnChange(ctrl: FilterBase<any>): boolean {
    return !!ctrl && !!ctrl.onChangeKey && ctrl.onChangeKey.length > 0;
  }

  isValid(parentFormSubmitted: any, controlIsValid: boolean): boolean {
    return !parentFormSubmitted && controlIsValid;
  }

  hasValue(controlValue: any, controlType: ControlType, controlIsValid: boolean): boolean {
    return !!(!controlValue
      || (controlValue && controlValue.length)
      || (controlType === ControlType.RangeDate && controlIsValid));
  }

  shouldUpdateRemoteControlData(result: any): boolean {
    return Array.isArray(result) || typeof result === 'string';
  }
}