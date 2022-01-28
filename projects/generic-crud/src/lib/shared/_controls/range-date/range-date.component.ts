import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { FilterRangeDate, subType } from '../_models/filter-range-date';

@Component({
    selector: 'lib-range-date',
    templateUrl: './range-date.component.html',
    styleUrls: ['./range-date.component.css'],
    // https://fetrarij.github.io/ngx-daterangepicker-material/custom-ranges
})
export class RangeDateComponent implements OnInit {
    @Input() control: FilterRangeDate;
    @Input() form: FormGroup;

    innerForm: FormGroup;
    isReady: boolean = false;

    isInvalidDate = (m: moment.Moment) => {
        return this.control.invalidDates.some(d => d.isSame(m, 'day'))
    }

    get isValid() { return this.isReady && (this.form.controls[this.control.key].valid); }

    constructor(private fb: FormBuilder) {
        this.innerForm = this.fb.group({
            startDate: '',
            endDate: ''
        }, { validators: [Validators.required] });
    }

    ngOnInit() {
        this.isReady = true;
    }
}
