import { Component, Input, OnInit, ViewChild, ViewContainerRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, CustomComponent, FilterCustomControl } from 'Generic-CRUD';

@Component({
  selector: 'gcb-custom-filter',
  templateUrl: './bootstrap-custom-filter.component.html',
  styleUrls: ['./bootstrap-custom-filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapCustomFilterComponent),
      multi: true
    }
  ]
})
export class BootstrapCustomFilterComponent extends BaseControlValueAccessor<any> {
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
    componentRef.instance.writeValue(this.value);
    componentRef.instance.registerOnChange((value: any) => this.updateValue(value));
    componentRef.instance.registerOnTouched(() => this.onTouched());
  }
}

