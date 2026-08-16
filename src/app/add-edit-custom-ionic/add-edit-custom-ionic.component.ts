import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import moment from 'moment';
import { Observable } from 'rxjs';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { NgSelectCustomComponent } from '../ng-select-custom/ng-select-custom.component';
import { IonicDynamicFormComponent } from '../../../projects/generic-crud-ionic/src/lib/controls/ionic-dynamic-form.component';
import {
  ButtonModel,
  ButtonType,
  DynamicControlService,
  FilterCheckbox,
  FilterCustomControl,
  FilterDateOfBirth,
  FilterDropdown,
  FilterRangeDate,
  FilterTextArea,
  FilterTextbox
} from 'Generic-CRUD';

@Component({
  selector: 'app-add-edit-custom-ionic',
  templateUrl: './add-edit-custom-ionic.component.html',
  styleUrls: ['./add-edit-custom-ionic.component.css']
})
export class AddEditCustomIonicComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  submited = false;
  @ViewChild(IonicDynamicFormComponent) formComponent: IonicDynamicFormComponent;

  countries = new Observable<any[]>((observer) => {
    observer.next([{ name: 'USA' }, { name: 'Pakistan' }]);
    observer.complete();
  });

  fakeValues = new Observable<any>((observer) => {
    setTimeout(() => {
      observer.next({
        email: 'jane@test.com',
        password: 'Asd@12345',
        birthDate: '10/09/1985',
        rangeDate: { startDate: '2020-11-06', endDate: '2021-11-13' },
        address: 'Flat#2545 Bath Island',
        address1: 'Land Mark 2',
        country: 'Pakistan',
        city: 'Houston',
        state: 'TX',
        zip: '19875122',
        agree: false
      });
      observer.complete();
    }, 100);
  });

  formSetting = {
    email: new FilterTextbox({
      type: 'email',
      key: 'email',
      label: 'Enter email',
      required: true
    }),
    password: new FilterTextbox({
      type: 'password',
      key: 'password',
      label: 'Enter password',
      required: true,
      minLength: 6,
      maxLength: 100,
      validationRegex: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$',
      validationRegexMessage: 'Password has at least one number and at least one special character.'
    }),
    birthDate: new FilterDateOfBirth({
      key: 'birthDate',
      label: 'Enter DOB',
      required: true
    }),
    rangeDate: new FilterRangeDate({
      key: 'rangeDate',
      label: 'Enter range',
      required: true,
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }),
    address: new FilterTextArea({
      key: 'address',
      label: 'Enter address',
      required: false,
      rowLength: 3
    }),
    address1: new FilterTextArea({
      key: 'address1',
      label: 'Enter another address',
      required: false,
      rowLength: 3
    }),
    city: new FilterTextbox({
      key: 'city',
      label: 'Enter City',
      required: true,
      type: 'text'
    }),
    state: new FilterDropdown({
      key: 'state',
      label: 'Select State',
      required: true,
      isRemote: true,
      remoteUrl: 'https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json',
      remoteKey: 'abbreviation',
      remoteValue: 'name'
    }),
    zip: new FilterTextbox({
      type: 'text',
      key: 'zip',
      label: 'Enter zip',
      required: true,
      format: {
        mask: '0000000'
      }
    }),
    agree: new FilterCheckbox({
      key: 'agree',
      label: 'I agree',
      required: false,
      isDisabled: false
    }),
    customSelect: new FilterCustomControl({
      component: NgSelectCustomComponent,
      key: 'customSelect',
      label: 'Ng-Select',
      required: true
    }),
    color: new FilterCustomControl({
      component: ColorPickerComponent,
      key: 'color',
      label: 'color',
      required: true
    })
  };

  formBasic = Object.values(this.formSetting);

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

  constructor(private readonly dynCtrlService: DynamicControlService) {}

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.form = this.dynCtrlService.toFormGroup(this.formBasic);
    this.fakeValues.subscribe((data) => {
      this.formComponent?.form.patchValue(data);
    });
  }

  SubmitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
