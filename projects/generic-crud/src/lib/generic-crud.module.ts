import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { ListComponent } from './shared/_controls/list/list.component';
import { AddEditComponent } from './shared/_controls/add-edit/add-edit.component';
import { GenericResolver } from './shared/_resolvers/generic.resolver';
import { CheckBoxComponent } from './shared/_controls/check-box/check-box.component';
import { RangeDateComponent } from './shared/_controls/range-date/range-date.component';
import { SelectDropdownComponent } from './shared/_controls/select-dropdown/select-dropdown.component';
import { SingleDateComponent } from './shared/_controls/single-date/single-date.component';
import { TextBoxComponent } from './shared/_controls/text-box/text-box.component';
import { DynamicControlComponent } from './shared/_controls/dynamic-control/dynamic-control.component';
import { DatatableComponent } from './shared/_controls/datatable/datatable.component';
import { DynamicFormComponent } from './shared/_controls/dynamic-form/dynamic-form.component';
import { SafePipe } from './shared/_pipes/safe.pipe';
import { KeysPipe } from './shared/_pipes/keys.pipe';
import { DynamicPipe } from './shared/_pipes/dynamic.pipe';
import { TextAreaComponent } from './shared/_controls/text-area/text-area.component';
import { NestedValuePipe } from './shared/_pipes/nested-value.pipe';
import { DynamicButtonsComponent } from './shared/_controls/dynamic-buttons/dynamic-buttons.component';
import { GENERIC_CONFIG, GenericConfig } from './shared/interfaces/generic-config.interface';
import { DefaultDateInputDirective } from './shared/_directives/default-date-input.directive';
import { ValidationMessageComponent } from './shared/_controls/validation-message/validation-message.component';
import { ControlStateDirective } from './shared/_directives/controlState.directive';
import { DateOfBirthComponent } from './shared/_controls/date-of-birth/date-of-birth.component';
import { AutocompleteTextboxModule } from './shared/_controls/autocomplete-textbox/autocomplete-textbox.module';
import { CustomFilterComponent } from './shared/_controls/custom-filter/custom-filter.component';
import { CustomFilterDirective } from './shared/_directives/custom-filter.directive';
import { PropertyPanelComponent } from './shared/_controls/property-panel/property-panel.component';

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
    ]),
    NgxMaskModule.forRoot(),
    AutocompleteTextboxModule,
    NgxDaterangepickerMd.forRoot()
  ],
  declarations: [
    CheckBoxComponent,
    RangeDateComponent,
    SelectDropdownComponent,
    SingleDateComponent,
    TextBoxComponent,
    TextAreaComponent,
    DynamicControlComponent,
    DatatableComponent,
    DynamicFormComponent,
    AddEditComponent,
    ListComponent,
    DynamicButtonsComponent,
    ValidationMessageComponent,
    DateOfBirthComponent,
    CustomFilterComponent,
    PropertyPanelComponent,

    DynamicPipe, SafePipe, KeysPipe, NestedValuePipe, 
    
    ControlStateDirective,
    DefaultDateInputDirective,
    CustomFilterDirective
  ],
  exports: [
    CheckBoxComponent,
    RangeDateComponent,
    SelectDropdownComponent,
    SingleDateComponent,
    TextBoxComponent,
    TextAreaComponent,
    DynamicControlComponent,
    DatatableComponent,
    DynamicFormComponent,
    AddEditComponent,
    ListComponent,
    DynamicButtonsComponent,
    ValidationMessageComponent,
    DateOfBirthComponent,
    CustomFilterComponent,
    PropertyPanelComponent,

    DynamicPipe, SafePipe, KeysPipe, NestedValuePipe , 
    
    ControlStateDirective,
    DefaultDateInputDirective,
    CustomFilterDirective
  ],
  providers: [

    // Note: Add in provider for dynamic resolve in Dynamic Pipe
    CurrencyPipe, DatePipe, SafePipe, KeysPipe, NestedValuePipe
  ]
})
export class GenericCRUDModule {

  static forRoot(config: GenericConfig): ModuleWithProviders<GenericCRUDModule> {
    return {
      ngModule: GenericCRUDModule,
      providers: [
        { provide: GENERIC_CONFIG, useValue: config }
      ]
    };
  }

  static forChild(config: GenericConfig, routes: Routes): ModuleWithProviders<GenericCRUDModule> {
    return {
      ngModule: GenericCRUDModule,
      providers: [
        { provide: GENERIC_CONFIG, useValue: config }
      ]
    };
  }
}
