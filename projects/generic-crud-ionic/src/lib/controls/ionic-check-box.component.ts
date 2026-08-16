import { Component, EventEmitter, Input, Output, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, FilterCheckbox } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gci-check-box',
  templateUrl: './ionic-check-box.component.html',
  styleUrls: ['./ionic-check-box.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonicCheckBoxComponent),
      multi: true
    }
  ]
})
export class IonicCheckBoxComponent extends BaseControlValueAccessor<any> {
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
