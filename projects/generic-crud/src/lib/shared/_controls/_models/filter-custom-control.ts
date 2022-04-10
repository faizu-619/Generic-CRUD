import { Type } from '@angular/core';
import { FilterBase, ControlType } from './filterBase';
import { ValueMaskModel } from './mask-value.model';

export class FilterCustomControl extends FilterBase<string> {
  controlType = ControlType.CustomControl;
  component: Type<any>

  constructor(options: {} = {}) {
    super(options);
    if (options['component']) {
      this.component = options['component'];
    } else {
      throw 'No component found for control ' + options['label'];
    }
  }
}
