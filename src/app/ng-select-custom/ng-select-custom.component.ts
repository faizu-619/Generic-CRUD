import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CustomComponent} from '../../../projects/generic-crud/src/lib/shared/interfaces/custom-component';
import {FilterCustomControl} from '../../../projects/generic-crud/src/lib/shared/_controls/_models';

@Component({
  selector: 'app-ng-select-custom',
  templateUrl: './ng-select-custom.component.html',
  styleUrls: ['./ng-select-custom.component.css']
})
export class NgSelectCustomComponent implements CustomComponent, OnInit {
  @Input() control: FilterCustomControl;
  @Input() form: FormGroup;

  ages: any[] = [
    {value: '<18', label: 'Under 18'},
    {value: '18', label: '18'},
    {value: '>18', label: 'More than 18'},
  ];

  constructor(private fb: FormBuilder) {
  }

  valueChange?: (value: any) => void;

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnInit() {
  }

  toggleAgeDisable() {
    // if (this.heroForm.controls.age.disabled) {
    //     this.heroForm.controls.age.enable();
    // } else {
    //     this.heroForm.controls.age.disable();
    // }
  }

  showConfirm(content) {
    // this.modalService.open(content);
  }

}
