import { Injectable, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FilterBase, FilterTextbox, FilterDropdown, FilterSingleDate, FilterRangeDate } from '../_models/index';

@Injectable({ providedIn: 'root' })
export class DynamicControlService {

    constructor() { }

    toFormGroup(controls: FilterBase<any>[]) {
        const group: any = {};

        if (controls && controls.length) {
            controls.forEach(question => {
                group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                    : new FormControl(question.value || '');
            });
        }
        return new FormGroup(group);
    }

    fromDataType(dataType: any): any {
        let filter = null;
        if (dataType > 0) {
            switch (Number.parseInt(dataType)) {
                case 1:
                    filter = new FilterTextbox({
                        key: 'value',
                        label: 'Value',
                        value: '',
                        required: true,
                        type: 'text'
                    });
                    break;
                case 2:
                    filter = new FilterSingleDate({
                        key: 'value',
                        label: 'value',
                        value: '',
                        required: true
                    });
                    break;
                case 3:
                case 4:
                case 5:
                    filter = new FilterTextbox({
                        key: 'value',
                        label: 'Value',
                        value: '',
                        required: true,
                        type: 'number'
                    });
                    break;
                default:
                    filter = new FilterTextbox({
                        key: 'value',
                        label: 'Value',
                        value: '',
                        required: true,
                        type: 'text'
                    });
                    break;
            }
        }
        return filter;
    }

    fromParameterType(parameter: any): any {
        let filter = null;
        if (!parameter || parameter == null) { return filter; }

        filter = new FilterBase({
            key: parameter['paramName'] || 'value',
            label: parameter['paramName'] || 'Value',
            value: parameter['value'] || '',
            required: parameter['isAllowBlank'] || true
        });

        if (parameter.dataType > 0) {
            switch (Number.parseInt(parameter.dataType)) {
                case 1:
                    filter = new FilterTextbox(Object.assign(filter, { type: 'text' }));
                    break;
                case 2:
                    filter = new FilterSingleDate(filter);
                    break;
                case 3:
                case 4:
                case 5:
                    filter = new FilterTextbox(Object.assign(filter, { type: 'number' }));
                    break;
                default:
                    filter = new FilterTextbox(Object.assign(filter, { type: 'text' }));
                    break;
            }
        }
        return filter;
    }
}
