import { Directive, HostListener, ElementRef, HostBinding, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[libFormState]'
})
export class FormStateDirective {
    private el: any;

    constructor(
        private elementRef: ElementRef<any>,
    ) {
        this.el = elementRef.nativeElement;
    }

    @HostListener('document:formUpdate', ['$event', '$event.detail'])
    formViewUpdate(event, controls) {


        this.updateAllFilledView('.has-float-label', controls);
    }

    private updateAllFilledView(selector: string, eventDetail: any = null): void {
        const inputs = this.el.querySelectorAll(selector) || [];
        if (inputs && inputs.length) {
            for (const input of inputs) {
                this.updateFilledView(input, eventDetail);
            }
        }
    }

    private updateFilledView(container: any, eventDetail: any = null): void {
        const input = container.querySelector('input') || container.querySelector('select');
        var event = new CustomEvent<any>(
            'updateFilledValue',
            { detail: eventDetail, bubbles: true }
        );
        input?.dispatchEvent(event);
    }
}
