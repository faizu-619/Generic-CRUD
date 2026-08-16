import { Component, Input, ViewChild, ViewContainerRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, CustomComponent, FilterCustomControl } from 'Generic-CRUD';

@Component({
  selector: 'gci-custom-filter',
  templateUrl: './ionic-custom-filter.component.html',
  styleUrls: ['./ionic-custom-filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonicCustomFilterComponent),
      multi: true
    }
  ]
})
export class IonicCustomFilterComponent extends BaseControlValueAccessor<any> {
  @ViewChild('customHost', { read: ViewContainerRef, static: true })
  private customHost: ViewContainerRef;

  @Input() control: FilterCustomControl;

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    if (!this.control?.component) {
      return;
    }

    this.customHost.clear();
    const componentRef = this.customHost.createComponent<CustomComponent>(this.control.component);
    componentRef.instance.control = this.control;
    componentRef.instance.valueChange = (value: any) => this.updateValue(value);

    // Support custom components that expose valueChange only and do not implement full CVA hooks.
    if (typeof componentRef.instance.writeValue === 'function') {
      componentRef.instance.writeValue(this.value);
    }
    if (typeof componentRef.instance.registerOnChange === 'function') {
      componentRef.instance.registerOnChange((value: any) => this.updateValue(value));
    }
    if (typeof componentRef.instance.registerOnTouched === 'function') {
      componentRef.instance.registerOnTouched(() => this.onTouched());
    }
  }
}
