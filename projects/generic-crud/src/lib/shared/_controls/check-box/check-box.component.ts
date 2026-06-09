import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterCheckbox } from '../_models/filter-checkbox';
import { BaseControlValueAccessor } from '../_base/base-control-value-accessor';

@Component({
    selector: 'gc-check-box',
    templateUrl: './check-box.component.html',
    styleUrls: ['./check-box.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckBoxComponent),
            multi: true
        }
    ]
})
export class CheckBoxComponent extends BaseControlValueAccessor<boolean> implements OnInit {
    @Input() control: FilterCheckbox;

    @Output() onCheckChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
        super();
    }

    ngOnInit() {
    }

    SelectionChange(event: any): void {
        const checked = event.target.checked;
        this.updateValue(checked);
        this.onCheckChange.emit(checked);
    }
}
