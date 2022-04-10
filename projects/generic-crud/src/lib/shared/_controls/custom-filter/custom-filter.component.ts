import { Component, ComponentFactoryResolver, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomComponent } from '../../interfaces/custom-component';
import { CustomFilterDirective } from '../../_directives/custom-filter.directive';
import { FilterCustomControl } from '../_models/filter-custom-control';
import { RemoteDataService } from '../_services/remote-data.service';

@Component({
  selector: 'lib-custom-filter',
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.css']
})
export class CustomFilterComponent implements OnInit {
  @Input() control: FilterCustomControl;
  @Input() form: FormGroup;

  @ViewChild(CustomFilterDirective, { static: true }) customFilter!: CustomFilterDirective;

  constructor(
    private remote: RemoteDataService,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.loadComponent();
  }

  ngOnDestroy(): void {
  }

  get isValid() { return (this.form.controls[this.control.key].valid); }

  loadComponent() {
    const viewContainerRef = this.customFilter.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<CustomComponent>(this.cfr.resolveComponentFactory(this.control.component));
    componentRef.instance.control = this.control;
    componentRef.instance.form = this.form;
    // componentRef.changeDetectorRef.detectChanges();
  }

}
