import * as _moment from 'moment';
import { FilterBase, ControlType } from './filterBase';

export class FilterRangeDate extends FilterBase<string> {
    controlType = ControlType.RangeDate;
    subType: subType;
    format: string;
    dateFrom: any;
    dateTo: any;
    ranges: any;
    alwaysShowCalendars: boolean;
    showCustomRangeLabel: boolean;
    linkedCalendars: boolean;
    showClearButton: boolean;
    showDropdowns: boolean;
    showCancel: boolean;
    showRangeLabelOnInput: boolean;
    invalidDates: any[];

    constructor(options: {} = {}) {
        super(options);
        this.format = options['format'] || '';
        this.subType = options['subType'] || subType.Custom;
        this.dateFrom = options['dateFrom'] || '';
        this.dateTo = options['dateTo'] || '';
        this.ranges = options['ranges'] || {
            'Today': [_moment(), _moment()],
            'Yesterday': [_moment().subtract(1, 'days'), _moment().subtract(1, 'days')],
            'Last 7 Days': [_moment().subtract(6, 'days'), _moment()],
            'Last 30 Days': [_moment().subtract(29, 'days'), _moment()],
            'This Month': [_moment().startOf('month'), _moment().endOf('month')],
            'Last Month': [_moment().subtract(1, 'month').startOf('month'), _moment().subtract(1, 'month').endOf('month')]
        };
        this.alwaysShowCalendars = options['alwaysShowCalendars'] || false;
        this.showCustomRangeLabel = options['showCustomRangeLabel'] || true;
        this.linkedCalendars = options['linkedCalendars'] || false;
        this.showClearButton = options['showClearButton'] || false;
        this.showDropdowns = options['showDropdowns'] || false;
        this.showCancel = options['showCancel'] || false;
        this.showRangeLabelOnInput = options['showRangeLabelOnInput'] || false;
        this.invalidDates = options['invalidDates'] || [];

    }
}

export enum subType {
    Custom = 1,
    Today = 2,
    Yesterday = 3,
    Tomorrow = 4
}
