import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomComponent } from '../../interfaces/custom-component';
import { CustomFilterDirective } from '../../_directives/custom-filter.directive';
import { FilterCustomControl } from '../_models/filter-custom-control';
import { RemoteDataService } from '../_services/remote-data.service';
import { BaseControlValueAccessor } from '../_base/base-control-value-accessor';

@Component({
  selector: 'gc-custom-filter',
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFilterComponent),
      multi: true
    }
  ]
})
export class CustomFilterComponent extends BaseControlValueAccessor implements OnInit {
  @Input() control: FilterCustomControl;

  @ViewChild(CustomFilterDirective, { static: true }) customFilter!: CustomFilterDirective;

  constructor(
    private remote: RemoteDataService,
    private cfr: ComponentFactoryResolver
  ) {
    super();
  }

  ngOnInit() {
    this.loadComponent();
  }

  ngOnDestroy(): void {
  }

  loadComponent() {
    const viewContainerRef = this.customFilter.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<CustomComponent>(this.cfr.resolveComponentFactory(this.control.component));
    componentRef.instance.control = this.control;
    // Pass value change handler to custom component
    componentRef.instance.valueChange = (value) => this.updateValue(value);
  }

}
