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
    // console.log(elementRef);
    this.el = elementRef.nativeElement;
  }

  @HostListener('input', ['$event'])
  onInput(e) {
    // console.log('input dicpatched.', e);
    // console.log('updateFilledValue dicpatched.', detail);
    this.updateView();
  }

  @HostListener('focusin', ['$event.target'])
  onFocusIn(target: any) {
    setTimeout(() => {
      // console.log('focusin dicpatched.', target);
      this.renderer.addClass(this.el.parentElement, 'active');
    }, 0);
  }

  @HostListener('focusout', ['$event.target'])
  onFocusOut(target: any) {
    setTimeout(() => {
      // console.log('focusout dicpatched.', target);

      if (target && target.value && target.value.length) {
        this.renderer.addClass(this.el.parentElement, 'active');
      } else {
        this.renderer.removeClass(this.el.parentElement, 'active');
      }
    }, 0);
  }
  private updateView(): void {
    const input =
      this.el.querySelector('input:not([type=hidden])') || this.el.querySelector('select');

    if (input?.value?.toString()?.length) {
      this.renderer.addClass(this.el.parentElement, 'active');
    } else {
      this.renderer.removeClass(this.el.parentElement, 'active');
    }
  }

}
