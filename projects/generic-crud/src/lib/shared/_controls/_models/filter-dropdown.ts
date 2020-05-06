import { FilterBase, ControlType } from './filterBase';

export class FilterDropdown extends FilterBase<string> {
  controlType = ControlType.Dropdown;
  multiSelect = false;
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
    this.multiSelect = options['multiSelect'] || false;
  }
}
