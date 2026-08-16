import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, FilterTextbox } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gci-text-box',
  templateUrl: './ionic-text-box.component.html',
  styleUrls: ['./ionic-text-box.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonicTextBoxComponent),
      multi: true
    }
  ]
})
export class IonicTextBoxComponent extends BaseControlValueAccessor<any> {
  @Input() control: FilterTextbox;

  get inputType(): string {
    return this.control?.type || 'text';
  }

  get isHiddenType(): boolean {
    return this.inputType === 'hidden';
  }

  onInput(value: string | null | undefined): void {
    this.updateValue(value as any);
  }

  onBlur(): void {
    this.onTouched();
  }
}
