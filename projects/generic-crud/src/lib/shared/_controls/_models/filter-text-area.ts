import { FilterBase, ControlType } from './filterBase';

export class FilterTextArea extends FilterBase<string> {
  controlType = ControlType.TextArea;
  rowLength: number;

  constructor(options: {} = {}) {
    super(options);
    this.rowLength = options['rowLength'] || 3;
  }
}
