import { FormGroup } from '@angular/forms';
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[libControlState]'
})
export class ControlStateDirective {
  private el: any;
  // @Input('libControlState') form: FormGroup;
  number: any = '';
  constructor(
    private elementRef: ElementRef<any>,
    private renderer: Renderer2
  ) {
    this.el = elementRef.nativeElement;
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

}
