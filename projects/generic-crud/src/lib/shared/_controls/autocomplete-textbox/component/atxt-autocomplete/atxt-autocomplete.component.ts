import { Component, OnInit, ViewChild, TemplateRef, ContentChild, ContentChildren, QueryList, Output, EventEmitter, Input } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { AutocompleteContentDirective } from '../../directive/autocomplete-content.directive';
import { AtxtOptionComponent } from '../atxt-option/atxt-option.component';

@Component({
  selector: 'app-atxt-autocomplete',
  templateUrl: './atxt-autocomplete.component.html',
  styleUrls: ['./atxt-autocomplete.component.scss'],
  exportAs: 'atxtAutocomplete'
})
export class AtxtAutocompleteComponent implements OnInit {
  @ViewChild('root') rootTemplate: TemplateRef<any>;

  @ContentChild(AutocompleteContentDirective)
  content: AutocompleteContentDirective;

  @ContentChildren(AtxtOptionComponent) options: QueryList<AtxtOptionComponent>;

  @Input() displayValue: string;
  @Output() OnSelected = new EventEmitter<(string | {})>();

  constructor() { }

  ngOnInit(): void {
  }



  optionsClick(): any {
    return this.options.changes.pipe(
      switchMap(options => {
        const clicks$ = options.map(option => option.click$);
        return merge(...clicks$);
      })
    );
  }

}
