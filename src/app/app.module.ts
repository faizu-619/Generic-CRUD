import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AddEditCustomComponent} from './add-edit-custom/add-edit-custom.component';
import {NgSelectCustomComponent} from './ng-select-custom/ng-select-custom.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColorPickerComponent} from './color-picker/color-picker.component';
import {GenericCRUDModule} from '../../projects/generic-crud/src/lib/generic-crud.module';
import {LayoutStyle} from '../../projects/generic-crud/src/lib/shared/interfaces/generic-config.interface';
import {BASE_URL} from '../../projects/generic-crud/src/lib/shared/_service/generic.service';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AddEditCustomComponent,
    NgSelectCustomComponent,
    ColorPickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'add-custom', component: AddEditCustomComponent},
    ]),
    GenericCRUDModule.forRoot({style: LayoutStyle.Bootstrap}),
    FormsModule
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.apiUrl },
    { provide: 'BASE_URL', useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
