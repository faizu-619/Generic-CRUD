import { Directive, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class BaseControlValueAccessor<T = any> implements ControlValueAccessor {
  @Input() disabled = false;

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
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected updateValue(value: T): void {
    this.value = value;
    this.onTouched();
  }
}
