import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FilterRangeDate, subType } from '../_models/filter-range-date';

@Component({
    selector: 'lib-range-date',
    templateUrl: './range-date.component.html',
    styleUrls: ['./range-date.component.css'],
    // providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    // { provide: NgbDateAdapter, useClass: NgbDateStringAdapter }
    // ]
})
export class RangeDateComponent implements OnInit {
    @Input() control: FilterRangeDate;
    @Input() form: FormGroup;
    dateFrom: Date;
    dateTo: Date;

    subTypes = subType;
    subTypeKeys = [];

    constructor() { }

    ngOnInit() {
        const value = this.form.controls[this.control.key].value || null;
        const dateParts = value ? value.trim().split(',') : null;

        if (value && dateParts && dateParts.length === 2) {
            this.dateFrom = new Date(dateParts[0]);
            this.dateTo = new Date(dateParts[1]);
        }

        this.subTypeKeys = Object.keys(this.subTypes).filter(Number);
    }

    onDateSelection(event: any) {
        // console.log(this.dateFrom);
        // console.log(this.dateTo);
        if (this.dateFrom && this.dateTo) {
            this.form.controls[this.control.key].setValue(`${this.dateFrom},${this.dateTo}`);
        }
    }

    onChangeSubType(event: any) {
        // console.log(event);
    }

}
