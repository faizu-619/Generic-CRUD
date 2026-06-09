import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FilterDropdown } from '../_models/filter-dropdown';
import { RemoteDataService } from '../_services/remote-data.service';
import { BaseControlValueAccessor } from '../_base/base-control-value-accessor';

@Component({
    selector: 'gc-select-dropdown',
    templateUrl: './select-dropdown.component.html',
    styleUrls: ['./select-dropdown.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectDropdownComponent),
            multi: true
        }
    ]
})
export class SelectDropdownComponent extends BaseControlValueAccessor implements OnInit, OnDestroy {
    @Input() control: FilterDropdown;

    @Output() change = new EventEmitter<any>();

    modelSubscription: Subscription;

    constructor(private remote: RemoteDataService) {
        super();
    }

    ngOnInit() {
        if (this.control.isRemote) {
            this.modelSubscription = this.remote.remoteData$
                .subscribe((value) => {
                    this.loadOptions(value);
                });
        }
    }

    ngOnDestroy(): void {
        if (this.modelSubscription) {
            this.modelSubscription.unsubscribe();
        }
    }

    loadOptions(result: any[]) {
        this.control.options = [];
        result.forEach(element => {
            this.control.options.push({
                key: element[this.control.remoteKey] || '',
                value: element[this.control.remoteValue] || ''
            });
        });
    }

    onSelectChange(event: any): void {
        const value = event.target.value;
        this.updateValue(value);
        this.change.emit(value);
    }

    onBlur(): void {
        this.onTouched();
    }
}
