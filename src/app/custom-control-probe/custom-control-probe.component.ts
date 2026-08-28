import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CustomComponent, FilterCustomControl } from 'Generic-CRUD';

/**
 * A custom control that reports exactly what the wrapper hands it.
 *
 * It renders `received` — the last value delivered through writeValue — and keeps a log of every
 * write. Comparing that against the FormGroup's own value is what makes the "form holds the record
 * but the control renders blank" bug visible on screen.
 */
@Component({
  standalone: false,
  selector: 'app-custom-control-probe',
  templateUrl: './custom-control-probe.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./custom-control-probe.component.css']
})
export class CustomControlProbeComponent implements CustomComponent {
  @Input() control!: FilterCustomControl;

  received: any = undefined;
  writeCount = 0;
  log: string[] = [];
  disabled = false;

  valueChange?: (value: any) => void;
  protected onChange: (value: any) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.received = value;
    this.writeCount++;
    this.log.push(`#${this.writeCount} writeValue(${this.format(value)})`);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.log.push(`setDisabledState(${isDisabled})`);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.received = target?.value ?? '';
    this.emit(this.received);
  }

  /** Pushes a user-originated value back out to the form. */
  protected emit(value: any): void {
    this.onChange(value);
    this.valueChange?.(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  get displayValue(): string {
    return this.received === undefined || this.received === null ? '' : String(this.received);
  }

  private format(value: any): string {
    if (value === undefined) {
      return 'undefined';
    }
    if (value === null) {
      return 'null';
    }
    return JSON.stringify(value);
  }
}
