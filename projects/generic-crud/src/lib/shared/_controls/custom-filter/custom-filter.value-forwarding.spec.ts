import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CustomComponent } from '../../interfaces/custom-component';
import { CustomFilterDirective } from '../../_directives/custom-filter.directive';
import { FilterCustomControl } from '../_models/filter-custom-control';
import { CustomFilterComponent } from './custom-filter.component';

/** Records every value the wrapper hands it, so the spec can assert forwarding. */
@Component({ standalone: false, selector: 'lib-recording-custom', template: '' })
class RecordingCustomComponent implements CustomComponent {
  static lastInstance: RecordingCustomComponent;

  control: FilterCustomControl;
  valueChange?: (value: any) => void;

  written: any[] = [];
  disabledStates: boolean[] = [];
  destroyed = false;

  constructor() {
    RecordingCustomComponent.lastInstance = this;
  }

  writeValue(value: any): void {
    this.written.push(value);
  }

  registerOnChange(_fn: (value: any) => void): void { /* not needed for these assertions */ }
  registerOnTouched(_fn: () => void): void { /* not needed for these assertions */ }

  setDisabledState(isDisabled: boolean): void {
    this.disabledStates.push(isDisabled);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }
}

/** Exposes valueChange only — no CVA hooks at all. The guards must tolerate it. */
@Component({ standalone: false, selector: 'lib-value-change-only-custom', template: '' })
class ValueChangeOnlyComponent {
  control: FilterCustomControl;
  valueChange?: (value: any) => void;
}

@Component({
  standalone: false,
  selector: 'lib-custom-filter-host',
  template: `
    <form [formGroup]="form">
      <gc-custom-filter formControlName="field" [control]="control"></gc-custom-filter>
    </form>
  `
})
class HostComponent {
  form = new FormGroup({ field: new FormControl('initial') });
  control: FilterCustomControl;
}

describe('CustomFilterComponent value forwarding', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function setup(customComponent: any): void {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    host.control = new FilterCustomControl({ key: 'field', label: 'Field', component: customComponent });
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [
        CustomFilterComponent,
        CustomFilterDirective,
        HostComponent,
        RecordingCustomComponent,
        ValueChangeOnlyComponent
      ]
    }).compileComponents();
  });

  it('gives the child the control value present at creation time', () => {
    setup(RecordingCustomComponent);

    // The wrapper's ngOnInit runs before formControlName's first writeValue, so the value seen at
    // creation is undefined; the writeValue override is what makes the initial value arrive.
    const child = RecordingCustomComponent.lastInstance;
    expect(child.written.length).toBeGreaterThan(0);
    expect(child.written[child.written.length - 1]).toBe('initial');
  });

  it('forwards patchValue that happens after the view is initialized', () => {
    setup(RecordingCustomComponent);
    const child = RecordingCustomComponent.lastInstance;

    host.form.patchValue({ field: 'updated' });
    fixture.detectChanges();

    expect(child.written[child.written.length - 1]).toBe('updated');
  });

  it('forwards setValue', () => {
    setup(RecordingCustomComponent);
    const child = RecordingCustomComponent.lastInstance;

    host.form.get('field').setValue('via-set-value');
    fixture.detectChanges();

    expect(child.written[child.written.length - 1]).toBe('via-set-value');
  });

  it('forwards reset', () => {
    setup(RecordingCustomComponent);
    const child = RecordingCustomComponent.lastInstance;

    host.form.reset();
    fixture.detectChanges();

    expect(child.written[child.written.length - 1]).toBeNull();
  });

  it('forwards the disabled state', () => {
    setup(RecordingCustomComponent);
    const child = RecordingCustomComponent.lastInstance;

    host.form.get('field').disable();
    fixture.detectChanges();

    expect(child.disabledStates[child.disabledStates.length - 1]).toBe(true);
  });

  it('destroys the created component on destroy', () => {
    setup(RecordingCustomComponent);
    const child = RecordingCustomComponent.lastInstance;

    fixture.destroy();

    expect(child.destroyed).toBe(true);
  });

  it('supports a custom component that exposes valueChange only', () => {
    expect(() => {
      setup(ValueChangeOnlyComponent);
      host.form.patchValue({ field: 'updated' });
      fixture.detectChanges();
    }).not.toThrow();

    expect(host.form.get('field').value).toBe('updated');
  });
});
