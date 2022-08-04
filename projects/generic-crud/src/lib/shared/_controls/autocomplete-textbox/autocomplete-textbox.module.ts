import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AtxtOptionComponent } from './component/atxt-option/atxt-option.component';
import { AtxtAutocompleteComponent } from './component/atxt-autocomplete/atxt-autocomplete.component';
import { AutocompleteContentDirective } from './directive/autocomplete-content.directive';
import { AtxtAutocompleteDirective } from './directive/atxt-autocomplete.directive';
import { AutocompleteTextboxComponent } from './autocomplete-textbox.component';
import { FilterPipe } from './pipe/filter.pipe';


/**
 * @ignore
 */
@NgModule({
  declarations: [
    AtxtOptionComponent,
    AtxtAutocompleteComponent,
    AutocompleteContentDirective,
    AtxtAutocompleteDirective,
    AutocompleteTextboxComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OverlayModule
  ],
  exports: [
    AtxtOptionComponent,
    AtxtAutocompleteComponent,
    AutocompleteContentDirective,
    AtxtAutocompleteDirective,
    AutocompleteTextboxComponent,
    FilterPipe
  ],
  entryComponents: [AtxtAutocompleteComponent]
})
export class AutocompleteTextboxModule { }
