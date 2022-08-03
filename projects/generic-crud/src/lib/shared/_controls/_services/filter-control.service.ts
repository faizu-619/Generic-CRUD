import { Injectable, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FilterBase, FilterTextbox, FilterDropdown, FilterSingleDate, FilterRangeDate, ControlType } from '../_models/index';
import { compareValidator } from '../_validators/compare.validator';
// import { ServerSideValidator } from '../_validators/server-side.validator';
import { RemoteDataService } from '../_services/remote-data.service';

@Injectable({ providedIn: 'root' })
export class DynamicControlService {

    constructor(private remoteService: RemoteDataService) { }

    toFormGroup(controls: FilterBase<any>[]) {
        const group: any = {};

        if (controls && controls.length) {
            controls.forEach(ctrlObject => {
                group[ctrlObject.key] = new FormControl(ctrlObject.value || '', this.parseValidations(ctrlObject));
                // group[ctrlObject.key] = ctrlObject.required ? new FormControl(ctrlObject.value || '', Validators.required)
                //     : new FormControl(ctrlObject.value || '');
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

    private parseValidations(ctrlObject: FilterBase<any>): any[] {
        const validations = [];

        if (ctrlObject.required) {
            if (ctrlObject.controlType === ControlType.CheckBox) {
                validations.push(Validators.requiredTrue);
            } else {
                validations.push(Validators.required);
            }
        }

        if (ctrlObject.controlType === ControlType.TextBox && (ctrlObject as FilterTextbox).type === 'email') {
            validations.push(Validators.email);
        }

        if (ctrlObject.minLength && ctrlObject.minLength > 0) {
            if (ctrlObject.controlType === ControlType.TextBox && (ctrlObject as FilterTextbox).type === 'number') {
                validations.push(Validators.min(ctrlObject.minLength));
            } else {
                validations.push(Validators.minLength(ctrlObject.minLength));
            }
        }

        if (ctrlObject.maxLength && ctrlObject.maxLength > 0) {
            if (ctrlObject.controlType === ControlType.TextBox && (ctrlObject as FilterTextbox).type === 'number') {
                validations.push(Validators.max(ctrlObject.maxLength));
            } else {
                validations.push(Validators.maxLength(ctrlObject.maxLength));
            }
        }

        if (ctrlObject.validationRegex && ctrlObject.validationRegex.length) {
            validations.push(Validators.pattern(ctrlObject.validationRegex));
        }

        if (ctrlObject.compareWith && ctrlObject.compareWith.length) {
            validations.push(compareValidator(ctrlObject.compareWith));
        }

        // if (ctrlObject.remoteValidation && ctrlObject.remoteValidation.remoteUrl && ctrlObject.remoteValidation.remoteUrl.length) {
        //     validations.push(ServerSideValidator); // (this.remoteService, ctrlObject)
        // }

        return validations;
    }
}
