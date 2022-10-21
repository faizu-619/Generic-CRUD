import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ControlType, FilterBase } from '../_models/filterBase';
import { DynamicControlService } from '../_services/filter-control.service';
import { RemoteDataService } from '../_services/remote-data.service';

@Component({
    selector: 'lib-dynamic-control',
    templateUrl: './dynamic-control.component.html',
    styleUrls: ['./dynamic-control.component.css'],
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
    options$: Observable<any[]>;

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

    searchOptions(value: string): void {
        if (typeof this.control.remoteUrl === 'string') {
            this.options$ = this.remote.getRemoteData(this.control.remoteUrl, value);
        } else if (typeof this.control.remoteUrl === 'object') {
            this.options$ = (this.control.remoteUrl as Observable<any>);
        }
    }

    private setControl(ctrl: FilterBase<any>, param?: any): void {
        this.control = ctrl;
        if (ctrl.isRemote && ctrl.controlType != ControlType.AutocompleteTextbox) {
            // console.log('Control Change', ctrl);
            // console.log('Control Change value', param);

            const handleResult = (result) => {
                if (Array.isArray(result)) {
                    this.remote.updateDataToControl(result);
                } else if (typeof result === 'string') {
                    this.remote.updateDataToControl(result);
                }
            };

            if (typeof ctrl.remoteUrl === 'string') {
                this.remote.getRemoteData(ctrl.remoteUrl, param)
                    .subscribe(handleResult, error => console.log(error));

            } else if (typeof ctrl.remoteUrl === 'object') {
                (ctrl.remoteUrl as Observable<any>)
                    .pipe(delay(1000))
                    .subscribe(handleResult, error => console.log(error));
            }
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

    get isValid() { return (!this.parentFormSubmitted && this.form.controls[this.control.key].valid); }
    get hasValue(): boolean {
        return !this.form.controls[this.control.key] || (this.form.controls[this.control.key].value && this.form.controls[this.control.key].value.length)
            || (this.control.controlType == ControlType.RangeDate &&  this.form.controls[this.control.key].valid);
    }
}
