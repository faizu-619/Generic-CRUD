import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CustomComponent, FilterCustomControl} from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'app-ng-select-custom',
  templateUrl: './ng-select-custom.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./ng-select-custom.component.css']
})
export class NgSelectCustomComponent implements CustomComponent, OnInit {
  @Input() control!: FilterCustomControl;
  @Input() form!: FormGroup;

  ages: any[] = [
    {value: '<18', label: 'Under 18'},
    {value: '18', label: '18'},
    {value: '>18', label: 'More than 18'},
  ];

  selectedValue = '';
  disabled = false;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {}

  valueChange?: (value: any) => void;

  writeValue(obj: any): void {
    this.selectedValue = obj ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {
  }

  onSelectionChange(value: string): void {
    this.selectedValue = value;
    this.onChange(value);
    this.valueChange?.(value);
  }

  onSelectionEvent(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    this.onSelectionChange(target?.value || '');
  }

  onBlur(): void {
    this.onTouched();
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
