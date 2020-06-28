import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GenericCRUDModule } from 'Generic-CRUD';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LayoutStyle } from 'projects/generic-crud/src/lib/shared/interfaces/generic-config.interface';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    GenericCRUDModule.forRoot({ style: LayoutStyle.Bootstrap })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
