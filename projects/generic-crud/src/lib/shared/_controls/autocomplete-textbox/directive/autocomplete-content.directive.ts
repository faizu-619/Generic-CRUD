import { Directive, TemplateRef } from '@angular/core';

/**
 * @ignore
 */
@Directive({
  selector: '[appAutocompleteContent]'
})
export class AutocompleteContentDirective {

  constructor(public tpl: TemplateRef<any>) {
  }

}
