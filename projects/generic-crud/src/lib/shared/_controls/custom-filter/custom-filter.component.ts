import { Component, Input, OnInit, ViewChild, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomComponent } from '../../interfaces/custom-component';
import { CustomFilterDirective } from '../../_directives/custom-filter.directive';
import { FilterCustomControl } from '../_models/filter-custom-control';
import { RemoteDataService } from '../_services/remote-data.service';
import { BaseControlValueAccessor } from '../_base/base-control-value-accessor';
import { CustomFilterLogic } from '../_logic';

@Component({
  standalone: false,
  selector: 'gc-custom-filter',
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
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
  private readonly customFilterLogic = new CustomFilterLogic();

  @ViewChild(CustomFilterDirective, { static: true }) customFilter!: CustomFilterDirective;

  constructor(
    private remote: RemoteDataService,
  ) {
    super();
  }

  ngOnInit() {
    this.loadComponent();
  }

  ngOnDestroy(): void {
  }

  loadComponent() {
    if (!this.customFilterLogic.shouldLoadComponent(this.control)) {
      return;
    }

    const viewContainerRef = this.customFilter.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<CustomComponent>(this.control.component);
    const bindings = this.customFilterLogic.createBindings(this.control, value => this.updateValue(value));
    componentRef.instance.control = bindings.control;
    componentRef.instance.valueChange = bindings.valueChange;
  }

}
