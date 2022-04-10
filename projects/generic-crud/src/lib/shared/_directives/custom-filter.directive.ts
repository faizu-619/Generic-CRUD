import { ChangeDetectorRef, Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[customFilter]',
})
export class CustomFilterDirective {
  constructor(
    public viewContainerRef: ViewContainerRef,
    public changeDetectorRef: ChangeDetectorRef,
    ) { }
}
