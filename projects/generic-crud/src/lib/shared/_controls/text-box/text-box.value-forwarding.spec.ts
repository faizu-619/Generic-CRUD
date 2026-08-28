import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TextBoxComponent } from './text-box.component';

@Component({
  standalone: false,
  selector: 'lib-text-box-host',
  template: '<gc-text-box [formControl]="textControl"></gc-text-box>'
})
class HostComponent {
  textControl = new FormControl('initial');
}

describe('TextBoxComponent value forwarding', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let textBox: TextBoxComponent;

  function inputValue(): string {
    return fixture.debugElement.query(By.css('input')).nativeElement.value;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HostComponent, TextBoxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    textBox = fixture.debugElement.query(By.directive(TextBoxComponent)).componentInstance;
  });

  it('renders the initial value without waiting for a further tick', () => {
    expect(textBox.value).toBe('initial');
    expect(inputValue()).toBe('initial');
  });

  it('reflects setValue synchronously', () => {
    host.textControl.setValue('updated');
    fixture.detectChanges();

    expect(textBox.value).toBe('updated');
    expect(inputValue()).toBe('updated');
  });

  it('reflects reset synchronously', () => {
    host.textControl.setValue('updated');
    fixture.detectChanges();
    host.textControl.reset();
    fixture.detectChanges();

    expect(textBox.value).toBeNull();
    expect(inputValue()).toBe('');
  });

  it('still propagates user input back to the form', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'typed';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.textControl.value).toBe('typed');
  });
});
