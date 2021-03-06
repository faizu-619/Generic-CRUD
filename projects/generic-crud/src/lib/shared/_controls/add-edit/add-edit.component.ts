import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GenericService } from '../../_service/generic.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { GenericModel } from '../_models/generic.model';
import { ButtonModel, ButtonType } from '../_models/button.model';


@Component({
  selector: 'lib-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoading = true;
  modelType: any;
  defaultActions: ButtonModel<string>[] = [
    {
      hrefLink: '',
      key: 'btnSubmit',
      label: 'Save',
      order: 0,
      buttonType: ButtonType.Submit,
      isDisabled: false,
      customClass: 'btn btn-primary'
    },
    {
      hrefLink: '',
      key: 'btnReset',
      label: 'Reset',
      order: 0,
      buttonType: ButtonType.Reset,
      isDisabled: false,
      customClass: 'btn btn-default'
    }
  ];

  @ViewChild(DynamicFormComponent) formComponent: DynamicFormComponent;


  constructor(
    private defaultService: GenericService<GenericModel>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.subscribe((data: any) => {
      if (data && data[0]) {
        this.modelType = Object.assign({}, data[0]);
      }
    });
  }

  ngOnInit() {
    const Id = Number(this.route.snapshot.params['id'] || '0');
    if (Id > 0) {
      this.modelType.title = ('Edit ' + this.modelType.title);
      this.get(Id);
    } else {
      this.modelType.title = ('New ' + this.modelType.title);
    }
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
  }

  save(data: any) {
    this.defaultService.save(this.modelType.tableName, data)
      .subscribe(result => {
        if (result) {
          this.formComponent.form.patchValue(result || {});
        }
        // console.log(this.formComponent.form);
        // console.log(result);
      },
        error => {
          // this.alertService.saveError(error);
          this.router.navigate(['/error']);
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
        if (result) {
          this.formComponent.form.patchValue(result || {});
        }
      },
        error => {
          // this.alertService.saveError(error);
          console.log(error);
          // this.router.navigate(['/clients']);
        });
  }

  goBack() {
    this.router.navigate(['/list/' + this.modelType.tableName]);
  }

}
