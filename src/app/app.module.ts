import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GenericCRUDModule } from 'Generic-CRUD';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    GenericCRUDModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
