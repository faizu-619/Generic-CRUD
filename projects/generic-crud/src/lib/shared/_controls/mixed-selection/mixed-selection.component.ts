import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterDropdown } from 'generic-crud';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-mixed-selection',
  templateUrl: './mixed-selection.component.html',
  styleUrls: ['./mixed-selection.component.scss'],
})
export class MixedSelectionComponent implements OnInit, OnDestroy {
  @Input() control: FilterDropdown;
  @Input() form: FormGroup;
  @Input() options: Observable<any[]>;
  @Output() OnChange: EventEmitter<string> = new EventEmitter<string>();

  // subscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    if (this.form.controls[this.control.key].value == 0) {
      this.form.controls[this.control.key].setValue(null);
    }
    // this.subscription = this.form.controls[this.control.key].valueChanges
    // .subscribe((value) => {
    //   // console.log(typeof(value));
    //   // console.log(value);
    //   // if (value < 5) {
    //   //   = Number(value);
    //   // } else {
    //   // }
    // });
  }

  ngOnDestroy(): void {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }

  identify(index, item): string {
    return `${this.control.key}-${item.key}`;
  }

  selectValue(value: any): void {
    setTimeout(() => {
      if (this.form && this.control && value) {
        this.form.controls[this.control.key].setValue(value);
      } else if (this.form && this.control) {
        this.form.controls[this.control.key].setValue(null);
      }
      this.OnChange.emit(value);
    }, 0);
  }

  change(value: any): void {
    setTimeout(() => {
      this.OnChange.emit(value);
    }, 0);
    // console.log()
    // if (this.control && value) {
    //   this.form.controls[this.control.key].setValue(value);
    // } else if (this.control && this.form) {
    //   this.form.controls[this.control.key].setValue(null);
    // }
  }
}
