import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GenericCRUDModule, LayoutStyle } from 'Generic-CRUD';

import { AppComponent } from './app.component';
import { AddEditCustomComponent } from './add-edit-custom/add-edit-custom.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEditCustomComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'add-custom', component: AddEditCustomComponent },
    ], { relativeLinkResolution: 'legacy' }),
    GenericCRUDModule.forRoot({ style: LayoutStyle.Bootstrap })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
