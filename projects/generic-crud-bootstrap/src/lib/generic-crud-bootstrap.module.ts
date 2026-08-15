import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericCRUDModule } from 'Generic-CRUD';
import { GenericCrudBootstrapComponent } from './generic-crud-bootstrap.component';
import {
  BootstrapAddEditComponent,
  BootstrapCheckBoxComponent,
  BootstrapCustomFilterComponent,
  BootstrapDatatableComponent,
  BootstrapDateOfBirthComponent,
  BootstrapDynamicButtonsComponent,
  BootstrapDynamicControlComponent,
  BootstrapDynamicFormComponent,
  BootstrapListComponent,
  BootstrapRangeDateComponent,
  BootstrapSelectDropdownComponent,
  BootstrapSingleDateComponent,
  BootstrapTextAreaComponent,
  BootstrapTextBoxComponent,
  BootstrapValidationMessageComponent
} from './controls';



@NgModule({
  declarations: [
    GenericCrudBootstrapComponent,
    BootstrapAddEditComponent,
    BootstrapCheckBoxComponent,
    BootstrapCustomFilterComponent,
    BootstrapDatatableComponent,
    BootstrapDateOfBirthComponent,
    BootstrapDynamicButtonsComponent,
    BootstrapDynamicControlComponent,
    BootstrapDynamicFormComponent,
    BootstrapListComponent,
    BootstrapRangeDateComponent,
    BootstrapSelectDropdownComponent,
    BootstrapSingleDateComponent,
    BootstrapTextAreaComponent,
    BootstrapTextBoxComponent,
    BootstrapValidationMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GenericCRUDModule
  ],
  exports: [
    GenericCrudBootstrapComponent,
    BootstrapAddEditComponent,
    BootstrapCheckBoxComponent,
    BootstrapCustomFilterComponent,
    BootstrapDatatableComponent,
    BootstrapDateOfBirthComponent,
    BootstrapDynamicButtonsComponent,
    BootstrapDynamicControlComponent,
    BootstrapDynamicFormComponent,
    BootstrapListComponent,
    BootstrapRangeDateComponent,
    BootstrapSelectDropdownComponent,
    BootstrapSingleDateComponent,
    BootstrapTextAreaComponent,
    BootstrapTextBoxComponent,
    BootstrapValidationMessageComponent
  ]
})
export class GenericCrudBootstrapModule { }
