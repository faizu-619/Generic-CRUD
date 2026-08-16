import { Component, EventEmitter, Input, Output, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, FilterCheckbox } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gcb-check-box',
  templateUrl: './bootstrap-check-box.component.html',
  styleUrls: ['./bootstrap-check-box.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapCheckBoxComponent),
      multi: true
    }
  ]
})
export class BootstrapCheckBoxComponent extends BaseControlValueAccessor<any> {
  @Input() control: FilterCheckbox;
  @Output() onCheckChange = new EventEmitter<boolean>();

  onInput(checked: boolean): void {
    this.updateValue(checked as any);
    this.onCheckChange.emit(checked);
  }

  onBlur(): void {
    this.onTouched();
  }
}

