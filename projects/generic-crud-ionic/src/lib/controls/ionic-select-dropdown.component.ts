import { Component, EventEmitter, Input, Output, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, DropdownOptionsLogic, FilterDropdown, RemoteDataService } from 'Generic-CRUD';
import { Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'gci-select-dropdown',
  templateUrl: './ionic-select-dropdown.component.html',
  styleUrls: ['./ionic-select-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonicSelectDropdownComponent),
      multi: true
    }
  ]
})
export class IonicSelectDropdownComponent extends BaseControlValueAccessor<any> {
  @Input() control: FilterDropdown;
  @Output() change = new EventEmitter<any>();
  private readonly dropdownOptionsLogic = new DropdownOptionsLogic();
  private modelSubscription: Subscription;

  constructor(private readonly remote: RemoteDataService) {
    super();
  }

  ngOnInit(): void {
    if (this.control?.isRemote) {
      this.modelSubscription = this.remote.remoteData$.subscribe(value => {
        this.control.options = this.dropdownOptionsLogic.mapOptions(
          value,
          this.control.remoteKey,
          this.control.remoteValue
        );
      });
    }
  }

  ngOnDestroy(): void {
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
  }

  onSelectChange(value: string | string[]): void {
    this.updateValue(value as any);
    this.change.emit(value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
