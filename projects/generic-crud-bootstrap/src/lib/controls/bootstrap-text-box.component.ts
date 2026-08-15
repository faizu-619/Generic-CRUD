import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, FilterTextbox } from 'Generic-CRUD';

@Component({
  selector: 'gcb-text-box',
  templateUrl: './bootstrap-text-box.component.html',
  styleUrls: ['./bootstrap-text-box.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapTextBoxComponent),
      multi: true
    }
  ]
})
export class BootstrapTextBoxComponent extends BaseControlValueAccessor<any> {
  @Input() control: FilterTextbox;

  get inputType(): string {
    return this.control?.type || 'text';
  }

  onInput(value: string): void {
    this.updateValue(value as any);
  }

  onBlur(): void {
    this.onTouched();
  }
}

