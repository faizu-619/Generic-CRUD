import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GenericService } from '../../_service/generic.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { GenericModel } from '../_models/generic.model';
import { ButtonModel } from '../_models/button.model';
import { AddEditLogic } from '../_logic';


@Component({
  standalone: false,
  selector: 'gc-add-edit',
  templateUrl: './add-edit.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly addEditLogic = new AddEditLogic();
  isLoading = true;
  modelType: any;
  defaultActions: ButtonModel<string>[] = this.addEditLogic.createDefaultActions();

  @ViewChild(DynamicFormComponent) formComponent: DynamicFormComponent;


  constructor(
    private defaultService: GenericService<GenericModel>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.subscribe((data: any) => {
      const model = this.addEditLogic.mapModelFromRouteData(data);
      if (model) {
        this.modelType = model;
      }
    });
  }

  ngOnInit() {
    const mode = this.addEditLogic.resolveModeState(
      this.route.snapshot.params['id'],
      this.modelType.title
    );

    this.modelType.title = mode.title;
    if (mode.isEditMode) {
      this.get(mode.id);
    } else {
      this.modelType.title = mode.title;
    }

    this.isLoading = false;
  }

  ngAfterViewInit(): void {
  }

  save(data: any) {
    this.defaultService.save(this.modelType.tableName, data)
      .subscribe(result => {
        if (this.addEditLogic.shouldPatchForm(result, !!this.formComponent)) {
          setTimeout(() => this.formComponent.form.patchValue(result || {}));
        }
      },
        error => {
          this.router.navigate(this.addEditLogic.getErrorRoute());
        });
  }

  formValuesUpdate(formData: any): void {
    this.defaultService.updateModel(formData);
  }

  ngOnDestroy(): void {

  }

  private get(id: number): void {
    this.defaultService.get(this.modelType.tableName, id)
      .subscribe(result => {
        if (this.addEditLogic.shouldPatchForm(result, !!this.formComponent)) {
          setTimeout(() => this.formComponent.form.patchValue(result || {}));
        }
      },
        error => {
          this.router.navigate(this.addEditLogic.getErrorRoute());
        });
  }

  goBack() {
    this.router.navigate(this.addEditLogic.getBackRoute(this.modelType.tableName, this.route.snapshot.routeConfig?.path));
  }

}
