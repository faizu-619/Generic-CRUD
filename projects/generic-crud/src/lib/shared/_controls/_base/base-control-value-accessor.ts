import { ChangeDetectorRef, Directive, Input, inject } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class BaseControlValueAccessor<T = any> implements ControlValueAccessor {
  @Input() disabled = false;

  // Writes arriving from the form do not mark this view dirty on their own, so the rendered
  // control keeps its previous state until the view is explicitly marked for check.
  protected readonly cdr = inject(ChangeDetectorRef);

  protected _value: T;
  protected onChange: (value: T) => void = () => {};
  protected onTouched: () => void = () => {};

  get value(): T {
    return this._value;
  }

  set value(val: T) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(val);
    }
  }

  writeValue(value: T): void {
    this._value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  protected updateValue(value: T): void {
    this.value = value;
    this.onTouched();
  }
}
