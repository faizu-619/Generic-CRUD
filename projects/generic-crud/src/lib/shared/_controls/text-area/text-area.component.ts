import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterTextArea } from '../_models/filter-text-area';

@Component({
  selector: 'lib-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit {
  @Input() control: FilterTextArea;
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
      // console.log(this.control);
  }

}
