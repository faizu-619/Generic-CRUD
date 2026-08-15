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
}