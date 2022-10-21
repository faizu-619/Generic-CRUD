import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModel, ButtonType, DynamicControlService, FilterCheckbox, FilterDropdown, FilterTextArea, FilterTextbox, FilterDateOfBirth, FilterRangeDate, DynamicFormComponent, FilterCustomControl } from 'Generic-CRUD';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { NgSelectCustomComponent } from '../ng-select-custom/ng-select-custom.component';
// import { FilterCheckbox, FilterDropdown, FilterTextArea, FilterTextbox } from 'projects/generic-crud/src/lib/shared/_controls/_models';
// import {
//   FilterSingleDate,
//   FilterTextbox, FilterTextArea, FilterDropdown, FilterCheckbox
// } from 'Generic-CRUD/lib/shared/_controls/_models';

@Component({
  selector: 'app-add-edit-custom',
  templateUrl: './add-edit-custom.component.html',
  styleUrls: ['./add-edit-custom.component.css']
})
export class AddEditCustomComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  submited = false;
  @ViewChild(DynamicFormComponent) formComponent: DynamicFormComponent;

  countries = new Observable<any[]>((observer) => {
    // observable execution
    observer.next([{ name: 'USA' }, { name: 'Pakistan' }]);
    observer.complete();
  });

  fakeValues = new Observable<any>((observer) => {
    setTimeout(() => {
      observer.next({
        "email": "jane@test.com",
        "password": "Asd@12345",
        "birthDate": "10/09/1985",
        "rangeDate": { "startDate": "2020-11-06", "endDate": "2021-11-13" },
        "address": "Flat#2545 Bath Island",
        "address1": "Land Mark 2",
        "country": "Pakistan",
        "city": "Houston",
        "state": "TX",
        "zip": "19875122",
        "agree": false
      });
      observer.complete();
    }, 100);
  });

  formSetting = {
    'email': new FilterTextbox({
      type: 'email',
      // value: 'john@test.com',
      key: 'email',
      label: 'Enter email',
      required: true
    }),
    'password': new FilterTextbox({
      type: 'password',
      // value: 'Asd 123',
      key: 'password',
      label: 'Enter password',
      required: true,
      'minLength': 6,
      'maxLength': 100,
      'validationRegex': '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$',
      'validationRegexMessage': 'Password has at least one number and at least one special character.'
    }),
    'birthDate': new FilterDateOfBirth({
      // value: '18/05/1995',
      key: 'birthDate',
      label: 'Enter DOB',
      required: true
    }),
    'rangeDate': new FilterRangeDate({
      // value: { "startDate": "2021-11-06T19:00:00.000Z", "endDate": "2021-11-13T18:59:59.999Z" },
      key: 'rangeDate',
      label: 'Enter range',
      required: true,
      ranges:  {
        'Today': [_moment(), _moment()],
        'Yesterday': [_moment().subtract(1, 'days'), _moment().subtract(1, 'days')],
        'Last 7 Days': [_moment().subtract(6, 'days'), _moment()],
        'Last 30 Days': [_moment().subtract(29, 'days'), _moment()],
        'This Month': [_moment().startOf('month'), _moment().endOf('month')],
        'Last Month': [_moment().subtract(1, 'month').startOf('month'), _moment().subtract(1, 'month').endOf('month')],
        'This Year': [_moment().startOf('year').startOf('year'), _moment().endOf('year')],
        'Last Year': [_moment().subtract(1, 'year').startOf('year'), _moment().subtract(1, 'year').endOf('year')],
    }
    }),
    'address': new FilterTextArea({
      // value: 'H# 1234',
      key: 'address',
      label: 'Enter address',
      required: false,
      rowLength: 3
    }),
    'address1': new FilterTextArea({
      // value: 'Land Mark',
      key: 'address1',
      label: 'Enter another address',
      required: false,
      rowLength: 3
    }),
    'city': new FilterTextbox({
      // value: 'Gerogia',
      key: 'city',
      label: 'Enter City',
      required: true,
      type: 'text'
    }),
    'state': new FilterDropdown({
      'key': 'state',
      'label': 'Select State',
      // 'value': 'AL',
      'required': true,
      'isRemote': true,
      'remoteUrl': 'https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json',
      'remoteKey': 'abbreviation',
      'remoteValue': 'name',
    }),
    'zip': new FilterTextbox({
      type: 'text',
      // value: '745200',
      key: 'zip',
      label: 'Enter zip',
      required: true,
      'format': {
        'mask': '0000000'
      }
    }),
    'agree': new FilterCheckbox({
      'key': 'agree',
      'label': 'I agree',
      // 'value': true,
      'required': false,
      'isDisabled': false,
    }),
    'customSelect': new FilterCustomControl({
      component: NgSelectCustomComponent,
      // value: 'john@test.com',
      key: 'customSelect',
      label: 'Ng-Select',
      required: true
    }),
    'color': new FilterCustomControl({
      component: ColorPickerComponent,
      // value: 'john@test.com',
      key: 'color',
      label: 'color',
      required: true
    }),
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

  constructor(
    private dynCtrlService: DynamicControlService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
    // this.formComponent.form.patchValue({ "email": "faizan@test.com", "password": "Asd 123", "birthDate": "18/05/1995", "rangeDate": { "startDate": "2021-11-06T19:00:00.000Z", "endDate": "2021-11-13T18:59:59.999Z" }, "address": "H# 1234", "address1": "Land Mark", "country": "Pakistan", "city": "Gerogia", "state": "AL", "zip": "745200", "agree": true });
  }

  ngOnInit() {
    this.form = this.dynCtrlService.toFormGroup(this.formBasic);
    

    this.fakeValues.subscribe((data) => {
      // this.form.patchValue(data);

      this.formComponent.form.patchValue(data);
    })
  }

  SubmitForm() {
    console.log(this.form.getRawValue());
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
