import { FilterBase, ControlType } from './filterBase';

export class FilterDateOfBirth extends FilterBase<string> {
  controlType = ControlType.DateOfBirth;
  maxAge: number;
  minAge: number;

  constructor(options: {} = {}) {
    super(options);
    this.maxAge = options['maxAge'] || 150;
    this.minAge = options['minAge'] || 18;
  }
}
