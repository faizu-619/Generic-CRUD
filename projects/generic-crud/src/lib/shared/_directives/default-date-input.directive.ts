import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[libDefaultDateInput]'
})
export class DefaultDateInputDirective {
  @Input() dateFormat: string;

  constructor(
    private el: ElementRef,
    private dateFormatter: DatePipe
  ) { }

  @HostListener('change') onChange() {
    this.formatValue();
  }

  @HostListener('blur') onBlur() {
    this.formatValue();
  }

  private formatValue(): void {
    console.log(this.el.nativeElement.value);
    console.log(this.el.nativeElement.valueAsDate);
    console.log(this.dateFormat);
    if (this.dateFormat && this.el.nativeElement.value) {
      console.log(this.dateFormatter.transform(new Date(this.el.nativeElement.value), this.dateFormat));
      this.el.nativeElement.value = this.dateFormatter.transform(new Date(this.el.nativeElement.value), this.dateFormat);
    }
    console.log(this.el);
    console.log(this.el.nativeElement.value);
  }

}
