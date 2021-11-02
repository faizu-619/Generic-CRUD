import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GenericCRUDModule, LayoutStyle } from 'Generic-CRUD';

import { AppComponent } from './app.component';
import { AddEditCustomComponent } from './add-edit-custom/add-edit-custom.component';
import { StepsFormComponent } from './steps-form/steps-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEditCustomComponent,
    StepsFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'add-custom', component: AddEditCustomComponent },
      { path: 'step-form', component: StepsFormComponent },
    ], { relativeLinkResolution: 'legacy' }),
    GenericCRUDModule.forRoot({ style: LayoutStyle.Bootstrap })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
