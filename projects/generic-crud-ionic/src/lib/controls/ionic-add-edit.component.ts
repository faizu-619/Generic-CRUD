import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditLogic, ButtonModel, GenericModel, GenericService } from 'Generic-CRUD';
import { IonicDynamicFormComponent } from './ionic-dynamic-form.component';

@Component({
  standalone: false,
  selector: 'gci-add-edit',
  templateUrl: './ionic-add-edit.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./ionic-add-edit.component.css']
})
export class IonicAddEditComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly addEditLogic = new AddEditLogic();
  isLoading = true;
  modelType: any;
  defaultActions: ButtonModel<string>[] = this.addEditLogic.createDefaultActions();

  @ViewChild(IonicDynamicFormComponent) formComponent: IonicDynamicFormComponent;

  constructor(
    private readonly defaultService: GenericService<GenericModel>,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.route.data.subscribe((data: any) => {
      const model = this.addEditLogic.mapModelFromRouteData(data);
      if (model) {
        this.modelType = model;
      }
    });
  }

  ngOnInit(): void {
    if (!this.modelType) {
      this.isLoading = false;
      return;
    }

    const mode = this.addEditLogic.resolveModeState(this.route.snapshot.params['id'], this.modelType.title);
    this.modelType.title = mode.title;
    if (mode.isEditMode) {
      this.get(mode.id);
    }
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  save(data: any): void {
    this.defaultService.save(this.modelType.tableName, data).subscribe(
      result => {
        if (this.addEditLogic.shouldPatchForm(result, !!this.formComponent)) {
          this.formComponent.form.patchValue(result || {});
        }
      },
      () => {
        this.router.navigate(this.addEditLogic.getErrorRoute());
      }
    );
  }

  goBack(): void {
    this.router.navigate(this.addEditLogic.getBackRoute(this.modelType.tableName, this.route.snapshot.routeConfig?.path));
  }

  private get(id: number): void {
    this.defaultService.get(this.modelType.tableName, id).subscribe(
      result => {
        if (this.addEditLogic.shouldPatchForm(result, !!this.formComponent)) {
          this.formComponent.form.patchValue(result || {});
        }
      },
      () => {
        this.router.navigate(this.addEditLogic.getErrorRoute());
      }
    );
  }
}
