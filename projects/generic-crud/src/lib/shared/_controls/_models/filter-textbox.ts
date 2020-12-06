import { FilterBase, ControlType } from './filterBase';
import { ValueMaskModel } from './mask-value.model';

export class FilterTextbox extends FilterBase<string> {
  controlType = ControlType.TextBox;
  type: string;
  format: ValueMaskModel;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';

    if (options && options['format']) {
      this.format = new ValueMaskModel(options['format']);
    } else {
      this.format = null;
    }
  }
}
