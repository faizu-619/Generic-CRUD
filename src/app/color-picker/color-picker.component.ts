import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomComponent, FilterCustomControl } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements CustomComponent, OnInit {
  @Input() control!: FilterCustomControl;

  value = '#000000';
  disabled = false;
  valueChange?: (value: any) => void;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(obj: any): void {
    this.value = obj || '#000000';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onColorChange(value: string): void {
    this.value = value || '#000000';
    this.onChange(this.value);
    this.valueChange?.(this.value);
  }

  onColorInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.onColorChange(target?.value || '#000000');
  }

  onBlur(): void {
    this.onTouched();
  }

}
