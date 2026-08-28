import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AddEditCustomComponent} from './add-edit-custom/add-edit-custom.component';
import {AddEditCustomBootstrapComponent} from './add-edit-custom-bootstrap/add-edit-custom-bootstrap.component';
import {AddEditCustomIonicComponent} from './add-edit-custom-ionic/add-edit-custom-ionic.component';
import {NgSelectCustomComponent} from './ng-select-custom/ng-select-custom.component';
import {CustomControlBugComponent} from './custom-control-bug/custom-control-bug.component';
import {CustomControlProbeComponent} from './custom-control-probe/custom-control-probe.component';
import {CustomControlProbeIonicComponent} from './custom-control-probe-ionic/custom-control-probe-ionic.component';
import {CustomControlBugBootstrapComponent} from './custom-control-bug-bootstrap/custom-control-bug-bootstrap.component';
import {CustomControlBugIonicComponent} from './custom-control-bug-ionic/custom-control-bug-ionic.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColorPickerComponent} from './color-picker/color-picker.component';
import {BASE_URL, GENERIC_CONFIG, GenericCRUDModule, GenericResolver, LayoutStyle} from 'Generic-CRUD';
import {GenericCrudBootstrapModule} from '../../projects/generic-crud-bootstrap/src/lib/generic-crud-bootstrap.module';
import {GenericCrudIonicModule} from '../../projects/generic-crud-ionic/src/lib/generic-crud-ionic.module';
import {BootstrapAddEditComponent} from '../../projects/generic-crud-bootstrap/src/lib/controls/bootstrap-add-edit.component';
import {BootstrapListComponent} from '../../projects/generic-crud-bootstrap/src/lib/controls/bootstrap-list.component';
import {IonicAddEditComponent} from '../../projects/generic-crud-ionic/src/lib/controls/ionic-add-edit.component';
import {IonicListComponent} from '../../projects/generic-crud-ionic/src/lib/controls/ionic-list.component';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AddEditCustomComponent,
    AddEditCustomBootstrapComponent,
    AddEditCustomIonicComponent,
    NgSelectCustomComponent,
    ColorPickerComponent,
    CustomControlBugComponent,
    CustomControlBugBootstrapComponent,
    CustomControlBugIonicComponent,
    CustomControlProbeComponent,
    CustomControlProbeIonicComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    RouterModule.forRoot([
      {path: 'add-custom', component: AddEditCustomComponent},
      {path: 'custom-control-bug', component: CustomControlBugComponent},
      {path: 'bootstrap/add-custom', component: AddEditCustomBootstrapComponent},
      {path: 'bootstrap/custom-control-bug', component: CustomControlBugBootstrapComponent},
      {path: 'bootstrap/list/:modelName', component: BootstrapListComponent, resolve: [GenericResolver]},
      {path: 'bootstrap/add/:modelName', component: BootstrapAddEditComponent, resolve: [GenericResolver]},
      {path: 'bootstrap/edit/:modelName/:id', component: BootstrapAddEditComponent, resolve: [GenericResolver]},
      {path: 'ionic/add-custom', component: AddEditCustomIonicComponent},
      {path: 'ionic/custom-control-bug', component: CustomControlBugIonicComponent},
      {path: 'ionic/list/:modelName', component: IonicListComponent, resolve: [GenericResolver]},
      {path: 'ionic/add/:modelName', component: IonicAddEditComponent, resolve: [GenericResolver]},
      {path: 'ionic/edit/:modelName/:id', component: IonicAddEditComponent, resolve: [GenericResolver]},
    ]),
    GenericCRUDModule.forRoot({style: LayoutStyle.Bootstrap}),
    GenericCrudBootstrapModule,
    GenericCrudIonicModule,
    FormsModule
  ],
  providers: [
    { provide: GENERIC_CONFIG, useValue: { style: LayoutStyle.Bootstrap } },
    { provide: BASE_URL, useValue: environment.apiUrl },
    { provide: 'BASE_URL', useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
