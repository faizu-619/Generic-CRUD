import { CustomComponent } from '../../../interfaces/custom-component';
import { FilterCustomControl } from '../../_models/filter-custom-control';

export interface CustomFilterBindings {
  control: FilterCustomControl;
  valueChange: (value: any) => void;
}

export class CustomFilterLogic {
  createBindings(control: FilterCustomControl, updateValue: (value: any) => void): CustomFilterBindings {
    return {
      control,
      valueChange: (value: any) => updateValue(value)
    };
  }

  shouldLoadComponent(control: FilterCustomControl): boolean {
    return !!control && !!control.component;
  }

  // Custom components may expose valueChange only and not implement the full CVA hooks.
  writeToChild(instance: CustomComponent | undefined, value: any): void {
    if (instance && typeof instance.writeValue === 'function') {
      instance.writeValue(value);
    }
  }

  setChildDisabledState(instance: CustomComponent | undefined, isDisabled: boolean): void {
    if (instance && typeof instance.setDisabledState === 'function') {
      instance.setDisabledState(isDisabled);
    }
  }

  registerChildCallbacks(
    instance: CustomComponent | undefined,
    onChange: (value: any) => void,
    onTouched: () => void
  ): void {
    if (!instance) {
      return;
    }

    if (typeof instance.registerOnChange === 'function') {
      instance.registerOnChange(onChange);
    }
    if (typeof instance.registerOnTouched === 'function') {
      instance.registerOnTouched(onTouched);
    }
  }
}