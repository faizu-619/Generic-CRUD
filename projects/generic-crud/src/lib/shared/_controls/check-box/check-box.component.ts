import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterCheckbox } from '../_models/filter-checkbox';


@Component({
    selector: 'lib-check-box',
    templateUrl: './check-box.component.html',
    styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {
    @Input() control: FilterCheckbox;
    @Input() form: FormGroup;

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onCheckChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
        // console.log('CheckBox Init!', this.control);
    }

    SelectionChange(event: boolean) {
        this.onCheckChange.emit(event);
    }

    get isValid() { return (this.form.controls[this.control.key].valid); }
}
