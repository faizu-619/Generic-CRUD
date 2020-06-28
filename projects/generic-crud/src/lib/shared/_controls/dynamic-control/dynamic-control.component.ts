import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isArray, isString, isObject } from 'util';

import * as _ from 'lodash';

import { FilterBase } from '../_models/filterBase';
import { DynamicControlService } from '../_services/filter-control.service';
import { RemoteDataService } from '../_services/remote-data.service';

@Component({
    selector: 'lib-dynamic-control',
    templateUrl: './dynamic-control.component.html',
    styles: ['.invalid-feedback { display: block !important }'],
    providers: [RemoteDataService]
})
export class DynamicControlComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() dataType: any;
    @Input() parentFormSubmitted: any;
    @Input() isRenderedAsParameter = false;
    @Input() param: any;
    @Input() controlObject: FilterBase<any>;

    control: FilterBase<any>;

    validationMessageConstants = {
        required: 'This field is required.',
        email: 'This email is not valid.',
        minlength: 'Keyword must be greater than {{requiredLength}} characters, current length is {{actualLength}}.',
        maxlength: 'Keyword must not exceed {{requiredLength}} characters, current length is {{actualLength}}.',
        min: 'Number must be greater than {{min}}.',
        max: 'Number must not exceed {{max}}.',
        compare: 'This field is not valid or matched with {{compareWith}}.',
        exists: 'Already in use, please try with other.'
    };

    constructor(
        private fcs: DynamicControlService,
        private remote: RemoteDataService,
    ) { }

    ngOnInit() {
        if (this.isRenderedAsParameter && this.param) {
            this.control = this.fcs.fromParameterType(this.param);
        } else if (this.dataType) {
            this.control = this.fcs.fromDataType(this.dataType);
        } else {
            this.setControl(this.controlObject);
            this.onChanges();
        }
    }

    private setControl(ctrl: FilterBase<any>, param?: any): void {
        this.control = ctrl;
        if (ctrl.isRemote) {
            // console.log('Control Change', ctrl);
            // console.log('Control Change value', param);
            this.remote.getRemoteData(ctrl.remoteUrl, param)
                .subscribe(result => {
                    if (isArray(result)) {
                        this.remote.updateDataToControl(result);
                    } else if (isString(result)) {
                        this.remote.updateDataToControl(result);
                    }
                }, error => console.log(error));
        }
    }

    onChanges(): void {
        if (this.control.onChangeKey && this.control.onChangeKey.length > 0) {
            this.form.get(this.control.onChangeKey).valueChanges.subscribe(val => {
                this.setControl(this.control, val);
            });
        }
    }

    public changeType(dataType: any) {
        this.control = this.fcs.fromDataType(dataType);
    }

    get validationMessage() {
        let messages = '';
        const control = this.form.get(this.control.key);
        if (control && !control.valid) {
            for (const key in control.errors) {
                if (control.errors.hasOwnProperty(key)) {
                    if (isObject(control.errors[key])) {
                        if (key === 'pattern') {
                            messages += `<div>${this.control.validationRegexMessage}</div>`;
                        } else {
                            let msg = `<div>${this.validationMessageConstants[key]}</div>`;
                            for (const propKey in control.errors[key]) {
                                if (control.errors[key].hasOwnProperty(propKey)) {
                                    msg = _.replace(msg, RegExp(`{{${propKey}}}`, 'g'), control.errors[key][propKey]);
                                }
                            }
                            messages += msg;
                        }
                    } else {
                        messages += `<div>${this.validationMessageConstants[key]}</div>`;
                    }
                }
            }
        }
        return messages;
    }

    get isValid() { return (!this.parentFormSubmitted && this.form.controls[this.control.key].valid); }
}
