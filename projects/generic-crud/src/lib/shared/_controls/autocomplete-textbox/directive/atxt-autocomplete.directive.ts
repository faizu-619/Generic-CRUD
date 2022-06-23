import { Directive, Input, ElementRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { Overlay, OverlayRef, ConnectionPositionPair } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter, takeUntil } from 'rxjs/operators';

import { AtxtAutocompleteComponent } from '../component/atxt-autocomplete/atxt-autocomplete.component';

@Directive({
  selector: '[appAtxtAutocomplete]'
})
export class AtxtAutocompleteDirective implements OnInit, OnDestroy {
  @Input() appAtxtAutocomplete: AtxtAutocompleteComponent;
  private overlayRef: OverlayRef;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
    private vcr: ViewContainerRef,
    private overlay: Overlay
  ) {
  }

  get control(): any {
    return this.ngControl.control;
  }

  ngOnInit(): void {
    fromEvent(this.origin, 'focus').pipe(
      // untilDestroyed(this)
    ).subscribe(() => {
      this.openDropdown();

      this.appAtxtAutocomplete.optionsClick()
        .pipe(takeUntil(this.overlayRef.detachments()))
        .subscribe((value: (string | {})) => {
          // console.log(this.ngControl);
          console.log(value);
          this.appAtxtAutocomplete.OnSelected.emit(value);
          if (value && typeof(value) === 'string') {
            this.control.setValue(value);
          } else if (value && typeof(value) === 'object' && this.appAtxtAutocomplete.displayValue) {
            this.control.setValue(value[this.appAtxtAutocomplete.displayValue]);
          }
          this.close();
        });
    });
  }

  openDropdown(): any {
    this.overlayRef = this.overlay.create({
      width: this.origin.offsetWidth,
      maxHeight: 40 * 3,
      backdropClass: '',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition()
    });

    const template = new TemplatePortal(this.appAtxtAutocomplete.rootTemplate, this.vcr);
    this.overlayRef.attach(template);

    overlayClickOutside(this.overlayRef, this.origin).subscribe(() => this.close());
  }

  ngOnDestroy(): void { }

  private close(): void {
    this.overlayRef.detach();
    this.overlayRef = null;
  }

  private getOverlayPosition(): any {
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' }
      ),
      new ConnectionPositionPair(
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'bottom' }
      )
    ];

    return this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }

  get origin(): any {
    return this.host.nativeElement;
  }
}

export function overlayClickOutside(overlayRef: OverlayRef, origin: HTMLElement): any {
  return fromEvent<MouseEvent>(document, 'click')
    .pipe(
      filter(event => {
        const clickTarget = event.target as HTMLElement;
        const notOrigin = clickTarget !== origin; // the input
        const notOverlay = !!overlayRef && (overlayRef.overlayElement.contains(clickTarget) === false); // the autocomplete
        return notOrigin && notOverlay;
      }),
      takeUntil(overlayRef.detachments())
    );
}
