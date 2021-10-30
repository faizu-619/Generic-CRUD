import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-password-strength]',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit {
  @Input() control: AbstractControl;
  oneLetter = false;
  oneNumber = false;
  sixChars = false;

  constructor() { }

  ngOnInit(): void {
    if (this.control) {
      this.control.valueChanges.subscribe((value: string) => {
        if (value && value.length) {
          const lowerLetters = /[a-z]+/.test(value);
          const upperLetters = /[A-Z]+/.test(value);
          const numbers = /[0-9]+/.test(value);

          if (lowerLetters || upperLetters) {
            this.oneLetter = true;
          } else {
            this.oneLetter = false;
          }

          if (numbers) {
            this.oneNumber = true;
          } else {
            this.oneNumber = false;
          }

          if (value && value.length >= 6) {
            this.sixChars = true;
          } else {
            this.sixChars = false;
          }
        } else {
          this.oneLetter = false;
          this.oneNumber = false;
          this.sixChars = false;
        }
      });
    }
  }

}
