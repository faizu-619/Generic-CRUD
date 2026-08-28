import { Directive, OnInit, AfterViewInit, Type, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  ButtonModel,
  ButtonType,
  DynamicControlService,
  FilterCustomControl,
  FilterDateOfBirth,
  FilterRangeDate,
  FilterTextbox
} from 'Generic-CRUD';

/**
 * Shared behaviour for the custom-control forwarding reproduction pages.
 *
 * Each themed page (default / bootstrap / ionic) renders the same controls through its own
 * dynamic-control component, so the three pages differ only in their template.
 */
@Directive()
export abstract class CustomControlBugBase implements OnInit, AfterViewInit {
  protected readonly dynCtrlService = inject(DynamicControlService);

  form!: FormGroup;
  loaded = false;
  submited = false;
  formValue = '{}';

  /** Stands in for a resolver fetching a record, i.e. a write that lands after the view exists. */
  private readonly record = {
    name: 'Ada Lovelace',
    favouriteColour: 'teal',
    nickname: 'The Analyst',
    birthDate: '1990-05-17',
    rangeDate: { startDate: '2024-01-10', endDate: '2024-02-20' }
  };

  private readonly asyncRecord = new Observable<any>(observer => {
    setTimeout(() => {
      observer.next(this.record);
      observer.complete();
    }, 400);
  });

  formSetting!: Record<string, any>;
  formBasic: any[] = [];

  /** The custom control class each themed page drops into its FilterCustomControl entries. */
  protected abstract get probeComponent(): Type<any>;

  private buildControls(): Record<string, any> {
    return {
    name: new FilterTextbox({
      type: 'text',
      key: 'name',
      label: 'Name (built-in text box)',
      required: false
    }),
    favouriteColour: new FilterCustomControl({
      component: this.probeComponent,
      key: 'favouriteColour',
      label: 'Favourite colour (custom control)',
      required: false
    }),
    nickname: new FilterCustomControl({
      component: this.probeComponent,
      key: 'nickname',
      label: 'Nickname (custom control)',
      required: false
    }),
    birthDate: new FilterDateOfBirth({
      key: 'birthDate',
      label: 'Date of birth (derives state in ngOnInit)',
      required: false
    }),
    rangeDate: new FilterRangeDate({
      key: 'rangeDate',
      label: 'Date range (derives state in ngOnInit)',
      required: false,
      ranges: {}
    })
    };
  }

  actions: ButtonModel<string>[] = [
    {
      hrefLink: '',
      key: 'btnSubmit',
      label: 'Save',
      order: 0,
      buttonType: ButtonType.Submit,
      isDisabled: false,
      customClass: 'btn btn-primary'
    }
  ];

  ngOnInit(): void {
    this.formSetting = this.buildControls();
    this.formBasic = Object.values(this.formSetting);
    this.form = this.dynCtrlService.toFormGroup(this.formBasic);
    this.form.valueChanges.subscribe(() => this.refreshFormValue());
    this.refreshFormValue();
  }

  ngAfterViewInit(): void {
    // The write that exposed the bug: it arrives after the controls have already been created.
    this.asyncRecord.subscribe(data => {
      this.form.patchValue(data);
      this.loaded = true;
      this.refreshFormValue();
    });
  }

  patchAgain(): void {
    this.form.patchValue({
      favouriteColour: 'magenta',
      nickname: 'Patched again',
      name: 'Grace Hopper'
    });
  }

  resetForm(): void {
    this.form.reset();
  }

  toggleDisabled(): void {
    const control = this.form.get('favouriteColour');
    if (!control) {
      return;
    }

    if (control.disabled) {
      control.enable();
    } else {
      control.disable();
    }
  }

  SubmitForm(): void {
    console.warn('submitted', this.form.getRawValue());
  }

  private refreshFormValue(): void {
    this.formValue = JSON.stringify(this.form.getRawValue(), null, 2);
  }
}
