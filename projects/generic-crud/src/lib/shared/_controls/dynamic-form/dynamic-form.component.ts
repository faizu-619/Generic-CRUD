import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FilterBase } from '../_models/index';
import { DynamicControlService } from '../_services/filter-control.service';

@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() controls: FilterBase<any>[];
  @Output() OnSubmit = new EventEmitter();
  @Output() OnValuesChange = new EventEmitter();

  form: FormGroup;
  submited = false;

  constructor(private ctrlService: DynamicControlService) { }

  public updateValue(value: any): void {
    this.form.patchValue(value || {});
  }

  ngOnInit() {
    if (this.controls && this.controls.length) {
      this.setFormGroup(this.controls);
    } else {
      this.setFormGroup([]);
    }
  }

  setFormGroup(controls: any[]) {
    this.form = this.ctrlService.toFormGroup(controls);
    this.onChanges();
  }

  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      this.OnValuesChange.emit(val);
    });
  }

  SubmitForm(): boolean {
    if (this.form.valid) {
      this.OnSubmit.emit(this.form.value);
      return true;
    }
    return false;
  }

}
