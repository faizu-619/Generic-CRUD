import { FilterBase, ControlType } from './filterBase';

export class FilterAutocompleteTextbox extends FilterBase<string> {
  controlType = ControlType.AutocompleteTextbox;
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
