import { Component, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, CustomComponent, CustomFilterLogic, FilterCustomControl } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gcb-custom-filter',
  templateUrl: './bootstrap-custom-filter.component.html',
  styleUrls: ['./bootstrap-custom-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapCustomFilterComponent),
      multi: true
    }
  ]
})
export class BootstrapCustomFilterComponent extends BaseControlValueAccessor<any> implements OnInit, OnDestroy {
  @ViewChild('customHost', { read: ViewContainerRef, static: true })
  private customHost: ViewContainerRef;

  @Input() control: FilterCustomControl;

  private readonly customFilterLogic = new CustomFilterLogic();
  private componentRef?: ComponentRef<CustomComponent>;

  ngOnInit(): void {
    this.loadComponent();
  }

  ngOnDestroy(): void {
    this.componentRef?.destroy();
    this.componentRef = undefined;
  }

  writeValue(value: any): void {
    super.writeValue(value);
    this.customFilterLogic.writeToChild(this.componentRef?.instance, value);
  }

  setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    this.customFilterLogic.setChildDisabledState(this.componentRef?.instance, isDisabled);
  }

  private loadComponent(): void {
    if (!this.customFilterLogic.shouldLoadComponent(this.control)) {
      return;
    }

    this.customHost.clear();
    const componentRef = this.customHost.createComponent<CustomComponent>(this.control.component);
    const bindings = this.customFilterLogic.createBindings(this.control, value => this.updateValue(value));
    componentRef.instance.control = bindings.control;
    componentRef.instance.valueChange = bindings.valueChange;
    this.componentRef = componentRef;

    // Hand over the current value in case the form wrote before the child existed.
    this.customFilterLogic.writeToChild(componentRef.instance, this.value);
    this.customFilterLogic.setChildDisabledState(componentRef.instance, this.disabled);
    this.customFilterLogic.registerChildCallbacks(
      componentRef.instance,
      value => this.updateValue(value),
      () => this.onTouched()
    );
  }
}
