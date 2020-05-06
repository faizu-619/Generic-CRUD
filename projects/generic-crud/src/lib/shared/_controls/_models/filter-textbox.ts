import { FilterBase, ControlType } from './filterBase';

export class FilterTextbox extends FilterBase<string> {
  controlType = ControlType.TextBox;
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
