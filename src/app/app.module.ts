import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GenericCRUDModule, LayoutStyle } from 'Generic-CRUD';

import { AppComponent } from './app.component';
import { AddEditCustomComponent } from './add-edit-custom/add-edit-custom.component';
import { NgSelectCustomComponent } from './ng-select-custom/ng-select-custom.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ColorPickerComponent } from './color-picker/color-picker.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
