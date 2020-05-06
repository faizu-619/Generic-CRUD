import { FilterBase, ControlType } from './filterBase';

export class FilterCheckbox extends FilterBase<string> {
  controlType = ControlType.CheckBox;
  type: string;

  constructor(options: {} = {}) {
    super(options);
  }
}
