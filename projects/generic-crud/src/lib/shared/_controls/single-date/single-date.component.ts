import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FilterSingleDate } from '../_models/filter-single-date';

@Component({
    selector: 'lib-single-date',
    templateUrl: './single-date.component.html',
    styleUrls: ['./single-date.component.css'],
})
export class SingleDateComponent implements OnInit, OnDestroy {
    @Input() control: FilterSingleDate;
    @Input() form: FormGroup;

    subscription: Subscription;
    // model: Date;

    constructor(private datePipe: DatePipe) { }

    ngOnInit() {
        this.subscription = this.form.controls[this.control.key].valueChanges
            .subscribe((value) => {
                if (value) {
                    this.form.controls[this.control.key].setValue(this.transform(value), { emitEvent: false });
                }
            });
    }

    onSelect() {
        // console.log(this.model);
        // this.form.controls[this.control.key].setValue(this.model);
    }

    get isValid() { return (this.form.controls[this.control.key].valid); }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private transform(val: string) {
        return this.datePipe.transform(val, this.control.format);
    }
}
