import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Pipes
import { SafePipe, KeysPipe } from './_pipes/index';

import { DynamicControlService } from './_controls/_services/filter-control.service';
import {
  CheckBoxComponent,
  RangeDateComponent,
  SelectDropdownComponent,
  SingleDateComponent,
  TextBoxComponent,
  DynamicControlComponent,
  DatatableComponent,
  DynamicFormComponent,
  AddEditComponent,
  ListComponent,
  DynamicButtonsComponent,
  ValidationMessageComponent,
  DateOfBirthComponent
} from './_controls/index';
import { GenericService } from './_service/index';
import { GenericResolver } from './_resolvers/generic.resolver';
import { StepperDynamicFormComponent } from './_controls/stepper-dynamic-form/stepper-dynamic-form.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      // { path: '', component: ListComponent, pathMatch: 'full' },
      { path: 'list/:modelName', component: ListComponent, resolve: [GenericResolver] },
      { path: 'add/:modelName', component: AddEditComponent, resolve: [GenericResolver] },
      { path: 'edit/:modelName/:id', component: AddEditComponent, resolve: [GenericResolver] },
    ])
  ],
  declarations: [
    CheckBoxComponent,
    RangeDateComponent,
    SelectDropdownComponent,
    SingleDateComponent,
    TextBoxComponent,

    DatatableComponent,
    DynamicFormComponent,
    AddEditComponent,
    ListComponent,
    DynamicButtonsComponent,
    DateOfBirthComponent,
    StepperDynamicFormComponent,

    SafePipe, KeysPipe, ValidationMessageComponent
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    CheckBoxComponent,
    RangeDateComponent,
    SelectDropdownComponent,
    SingleDateComponent,
    TextBoxComponent,

    DatatableComponent,
    DynamicFormComponent,
    AddEditComponent,
    ListComponent,
    DynamicButtonsComponent,
    DateOfBirthComponent,
    StepperDynamicFormComponent,

    SafePipe, KeysPipe
  ],
  providers: [
    DynamicControlService,
    GenericService,
    GenericResolver
  ]
})
export class SharedModule { }
