import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenericCRUDModule } from 'Generic-CRUD';
import {
  IonicAddEditComponent,
  IonicCheckBoxComponent,
  IonicCustomFilterComponent,
  IonicDatatableComponent,
  IonicDateOfBirthComponent,
  IonicDynamicButtonsComponent,
  IonicDynamicControlComponent,
  IonicDynamicFormComponent,
  IonicListComponent,
  IonicRangeDateComponent,
  IonicSelectDropdownComponent,
  IonicSingleDateComponent,
  IonicTextAreaComponent,
  IonicTextBoxComponent,
  IonicValidationMessageComponent
} from './controls';

@NgModule({
  declarations: [
    IonicAddEditComponent,
    IonicCheckBoxComponent,
    IonicCustomFilterComponent,
    IonicDatatableComponent,
    IonicDateOfBirthComponent,
    IonicDynamicButtonsComponent,
    IonicDynamicControlComponent,
    IonicDynamicFormComponent,
    IonicListComponent,
    IonicRangeDateComponent,
    IonicSelectDropdownComponent,
    IonicSingleDateComponent,
    IonicTextAreaComponent,
    IonicTextBoxComponent,
    IonicValidationMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GenericCRUDModule
  ],
  exports: [
    IonicAddEditComponent,
    IonicCheckBoxComponent,
    IonicCustomFilterComponent,
    IonicDatatableComponent,
    IonicDateOfBirthComponent,
    IonicDynamicButtonsComponent,
    IonicDynamicControlComponent,
    IonicDynamicFormComponent,
    IonicListComponent,
    IonicRangeDateComponent,
    IonicSelectDropdownComponent,
    IonicSingleDateComponent,
    IonicTextAreaComponent,
    IonicTextBoxComponent,
    IonicValidationMessageComponent
  ]
})
export class GenericCrudIonicModule { }
