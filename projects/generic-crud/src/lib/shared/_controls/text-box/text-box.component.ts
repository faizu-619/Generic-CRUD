import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FilterTextbox } from '../_models/filter-textbox';

@Component({
    selector: 'lib-text-box',
    templateUrl: './text-box.component.html',
    styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {
    @Input() control: FilterTextbox;
    @Input() form: FormGroup;
    constructor() { }

    ngOnInit() {
        // console.log(this.control);
    }

}
