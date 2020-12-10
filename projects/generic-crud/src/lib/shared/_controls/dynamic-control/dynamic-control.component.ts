import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
                    if (Array.isArray(result)) {
                        this.remote.updateDataToControl(result);
                    } else if (typeof result === 'string') {
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

    get isValid() { return (!this.parentFormSubmitted && this.form.controls[this.control.key].valid); }
}
