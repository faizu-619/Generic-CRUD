import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ButtonModel, DynamicControlService, FilterBase } from 'Generic-CRUD';

@Component({
  selector: 'gcb-dynamic-form',
  templateUrl: './bootstrap-dynamic-form.component.html',
  styleUrls: ['./bootstrap-dynamic-form.component.css']
})
export class BootstrapDynamicFormComponent {
  @Input() controls: FilterBase<any>[];
  @Input() actionButtons: ButtonModel<any>[];
  @Output() OnSubmit = new EventEmitter<any>();
  @Output() OnValuesChange = new EventEmitter<any>();

  form: FormGroup;
  submited = false;

  constructor(private readonly ctrlService: DynamicControlService) {}

  ngOnInit(): void {
    this.setFormGroup(this.controls || []);
  }

  updateValue(value: any): void {
    this.form.patchValue(value || {});
  }

  submitForm(): boolean {
    if (this.form.valid) {
      this.submited = true;
      this.OnSubmit.emit(this.form.value);
      return true;
    }

    this.submited = false;
    return false;
  }

  private setFormGroup(controls: any[]): void {
    this.form = this.ctrlService.toFormGroup(controls);
    this.form.valueChanges.subscribe(val => {
      this.submited = false;
      this.OnValuesChange.emit(val);
    });
  }
}
