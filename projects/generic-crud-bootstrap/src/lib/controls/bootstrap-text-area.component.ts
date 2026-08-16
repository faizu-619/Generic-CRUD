import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, FilterTextArea } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gcb-text-area',
  templateUrl: './bootstrap-text-area.component.html',
  styleUrls: ['./bootstrap-text-area.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapTextAreaComponent),
      multi: true
    }
  ]
})
export class BootstrapTextAreaComponent extends BaseControlValueAccessor<any> {
  @Input() control: FilterTextArea;

  get rows(): number {
    return this.control?.rowLength || 3;
  }

  onInput(value: string): void {
    this.updateValue(value as any);
  }

  onBlur(): void {
    this.onTouched();
  }
}

