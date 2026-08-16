import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, OnInit, Optional, Renderer2, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  standalone: false,
  selector: '[libControlState]'
})
export class ControlStateDirective implements OnInit, AfterViewInit, OnDestroy {
  private el: any;
  private valueChangesSub?: Subscription;

  constructor(
    private elementRef: ElementRef<any>,
    private renderer: Renderer2,
    @Optional() @Self() private ngControl?: NgControl
  ) {
    this.el = elementRef.nativeElement;
  }

  ngOnInit(): void {
    // Reflect model-driven value writes (patchValue/setValue) as active float-label state.
    this.valueChangesSub = this.ngControl?.valueChanges?.subscribe(() => {
      this.scheduleUpdateView();
    });
  }

  ngAfterViewInit(): void {
    // Run after child control template renders so querySelector can find the input/select/textarea.
    this.scheduleUpdateView();
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  @HostListener('input', ['$event'])
  onInput(e) {
    this.updateView();
  }

  @HostListener('focusin', ['$event.target'])
  onFocusIn(target: any) {
    setTimeout(() => {
      this.renderer.addClass(this.el.parentElement, 'active');
    }, 0);
  }

  @HostListener('focusout', ['$event.target'])
  onFocusOut(target: any) {
    setTimeout(() => {

      if (target && target.value && target.value.length) {
        this.renderer.addClass(this.el.parentElement, 'active');
      } else {
        this.renderer.removeClass(this.el.parentElement, 'active');
      }
    }, 0);
  }
  private updateView(): void {
    const input =
      this.el.querySelector('input:not([type=hidden])') || this.el.querySelector('select') || this.el.querySelector('textarea');

    if (input?.value?.toString()?.length) {
      this.renderer.addClass(this.el.parentElement, 'active');
    } else {
      this.renderer.removeClass(this.el.parentElement, 'active');
    }
  }

  private scheduleUpdateView(): void {
    setTimeout(() => {
      this.updateView();
      setTimeout(() => this.updateView(), 0);
    }, 0);
  }

}
