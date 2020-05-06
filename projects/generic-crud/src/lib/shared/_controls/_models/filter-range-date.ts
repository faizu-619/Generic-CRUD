import { FilterBase, ControlType } from './filterBase';

export class FilterRangeDate extends FilterBase<string> {
    controlType = ControlType.RangeDate;
    subType: subType;
    format: string;
    dateFrom: any;
    dateTo: any;

    constructor(options: {} = {}) {
        super(options);
        this.format = options['format'] || '';
        this.subType = options['subType'] || subType.Custom;
        this.dateFrom = options['dateFrom'] || '';
        this.dateTo = options['dateTo'] || '';
    }
}

export enum subType {
    Custom = 1,
    Today = 2,
    Yesterday = 3,
    Tomorrow = 4
}
