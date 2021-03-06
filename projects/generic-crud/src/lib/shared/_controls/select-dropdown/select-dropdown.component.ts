import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FilterDropdown } from '../_models/filter-dropdown';
import { RemoteDataService } from '../_services/remote-data.service';

@Component({
    selector: 'lib-select-dropdown',
    templateUrl: './select-dropdown.component.html',
    styleUrls: ['./select-dropdown.component.css']
})
export class SelectDropdownComponent implements OnInit, OnDestroy {
    @Input() control: FilterDropdown;
    @Input() form: FormGroup;

    @Output() change = new EventEmitter<any>();

    modelSubscription: Subscription;

    constructor(private remote: RemoteDataService) { }

    ngOnInit() {
        if (this.control.isRemote) {
            this.modelSubscription = this.remote.remoteData$
                .subscribe((value) => {
                    // console.log('Subscribe on control.', value);
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
        // console.log(result);
        this.control.options = [];
        result.forEach(element => {
            this.control.options.push({
                key: element[this.control.remoteKey] || '',
                value: element[this.control.remoteValue] || ''
            });
        });
    }

    get isValid() { return (this.form.controls[this.control.key].valid); }

    private onChange(event: any) {
        this.change.emit(event);
    }

}
