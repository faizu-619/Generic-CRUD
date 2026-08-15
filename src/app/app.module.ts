import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AddEditCustomComponent} from './add-edit-custom/add-edit-custom.component';
import {AddEditCustomBootstrapComponent} from './add-edit-custom-bootstrap/add-edit-custom-bootstrap.component';
import {NgSelectCustomComponent} from './ng-select-custom/ng-select-custom.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColorPickerComponent} from './color-picker/color-picker.component';
import {GenericCRUDModule} from '../../projects/generic-crud/src/lib/generic-crud.module';
import {GenericCrudBootstrapModule} from '../../projects/generic-crud-bootstrap/src/lib/generic-crud-bootstrap.module';
import {BASE_URL, GENERIC_CONFIG as DIST_GENERIC_CONFIG} from 'Generic-CRUD';
import {LayoutStyle} from '../../projects/generic-crud/src/lib/shared/interfaces/generic-config.interface';
import {BASE_URL as SOURCE_BASE_URL} from '../../projects/generic-crud/src/lib/shared/_service/generic.service';
import {GenericResolver} from '../../projects/generic-crud/src/lib/shared/_resolvers/generic.resolver';
import {BootstrapAddEditComponent} from '../../projects/generic-crud-bootstrap/src/lib/controls/bootstrap-add-edit.component';
import {BootstrapListComponent} from '../../projects/generic-crud-bootstrap/src/lib/controls/bootstrap-list.component';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AddEditCustomComponent,
    AddEditCustomBootstrapComponent,
    NgSelectCustomComponent,
    ColorPickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'add-custom', component: AddEditCustomComponent},
      {path: 'bootstrap/add-custom', component: AddEditCustomBootstrapComponent},
      {path: 'bootstrap/list/:modelName', component: BootstrapListComponent, resolve: [GenericResolver]},
      {path: 'bootstrap/add/:modelName', component: BootstrapAddEditComponent, resolve: [GenericResolver]},
      {path: 'bootstrap/edit/:modelName/:id', component: BootstrapAddEditComponent, resolve: [GenericResolver]},
    ]),
    GenericCRUDModule.forRoot({style: LayoutStyle.Bootstrap}),
    GenericCrudBootstrapModule,
    FormsModule
  ],
  providers: [
    { provide: DIST_GENERIC_CONFIG, useValue: { style: LayoutStyle.Bootstrap } },
    { provide: BASE_URL, useValue: environment.apiUrl },
    { provide: SOURCE_BASE_URL, useValue: environment.apiUrl },
    { provide: 'BASE_URL', useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
