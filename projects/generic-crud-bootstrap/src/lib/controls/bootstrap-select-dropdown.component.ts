import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, DropdownOptionsLogic, FilterDropdown, RemoteDataService } from 'Generic-CRUD';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gcb-select-dropdown',
  templateUrl: './bootstrap-select-dropdown.component.html',
  styleUrls: ['./bootstrap-select-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapSelectDropdownComponent),
      multi: true
    }
  ]
})
export class BootstrapSelectDropdownComponent extends BaseControlValueAccessor<any> {
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

  onSelectChange(value: string): void {
    this.updateValue(value as any);
    this.change.emit(value);
  }

  onBlur(): void {
    this.onTouched();
  }
}

