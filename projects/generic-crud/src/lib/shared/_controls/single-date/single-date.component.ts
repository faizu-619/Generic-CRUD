import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FilterSingleDate } from '../_models/filter-single-date';

@Component({
    selector: 'lib-single-date',
    templateUrl: './single-date.component.html',
    styleUrls: ['./single-date.component.css'],
})
export class SingleDateComponent implements OnInit {
    @Input() control: FilterSingleDate;
    @Input() form: FormGroup;

    // model: Date;

    constructor() { }

    ngOnInit() {
        // console.log(this.form.controls[this.control.key].value);
        // const value = this.form.controls[this.control.key].value || null;
        // if (value) {
        //    this.model = new Date(value);
        // }
    }

    onSelect(event: any) {
        // console.log(this.model);
        // this.form.controls[this.control.key].setValue(this.model);
    }

    get isValid() { return (this.control.required && this.form.controls[this.control.key].valid); }
}
