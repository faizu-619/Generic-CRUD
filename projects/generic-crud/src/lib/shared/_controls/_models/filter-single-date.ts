import { FilterBase, ControlType } from './filterBase';

export class FilterSingleDate extends FilterBase<string> {
  controlType = ControlType.SingleDate;
  format: string;

  constructor(options: {} = {}) {
    super(options);
    this.format = options['format'] || '';
  }
}
