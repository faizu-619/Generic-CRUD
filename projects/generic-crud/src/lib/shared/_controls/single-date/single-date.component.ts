import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, OnDestroy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FilterSingleDate } from '../_models/filter-single-date';
import { BaseControlValueAccessor } from '../_base/base-control-value-accessor';

@Component({
    selector: 'gc-single-date',
    templateUrl: './single-date.component.html',
    styleUrls: ['./single-date.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SingleDateComponent),
            multi: true
        }
    ]
})
export class SingleDateComponent extends BaseControlValueAccessor implements OnInit, OnDestroy {
    @Input() control: FilterSingleDate;

    subscription: Subscription = new Subscription();

    constructor(private datePipe: DatePipe) {
        super();
    }

    ngOnInit() {
    }

    onDateChange(event: any): void {
        const value = event.target.value;
        if (value) {
            const formattedValue = this.transform(value);
            this.updateValue(formattedValue);
        } else {
            this.updateValue(null);
        }
    }

    onBlur(): void {
        this.onTouched();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private transform(val: string) {
        return this.datePipe.transform(val, this.control.format);
    }
}
