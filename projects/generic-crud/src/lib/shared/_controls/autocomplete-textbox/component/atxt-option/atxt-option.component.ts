import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

/**
 * @ignore
 */
@Component({
  selector: 'app-atxt-option',
  templateUrl: './atxt-option.component.html',
  styleUrls: ['./atxt-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtxtOptionComponent implements OnInit {
  @Input() value: (string | {});
  click$: Observable<{}>;

  constructor(private host: ElementRef) { }

  ngOnInit(): void {
    this.click$ = fromEvent(this.element, 'click').pipe(mapTo(this.value));
  }

  get element(): any { return this.host.nativeElement; }
}
