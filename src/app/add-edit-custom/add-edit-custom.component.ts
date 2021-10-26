import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModel, ButtonType, DynamicControlService, FilterCheckbox, FilterDropdown, FilterTextArea, FilterTextbox, FilterDateOfBirth } from 'Generic-CRUD';
import { Observable, of } from 'rxjs';
import { delay, first } from 'rxjs/operators';
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
export class AddEditCustomComponent implements OnInit {
  form: FormGroup;
  submited = false;

  countries = new Observable<any[]>((observer) => {
    // observable execution
    observer.next([{ name: 'USA' }, { name: 'Pakistan' }]);
    observer.complete();
  });

  formSetting = {
    'email': new FilterTextbox({
      type: 'email',
      value: '',
      key: 'email',
      label: 'Enter email',
      required: true
    }),
    'password': new FilterTextbox({
      type: 'password',
      value: '',
      key: 'password',
      label: 'Enter password',
      required: true,
      'minLength': 6,
      'maxLength': 100,
      'validationRegex': '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$',
      'validationRegexMessage': 'Password has at least one number and at least one special character.'
    }),
    'birthDate': new FilterDateOfBirth({
      value: '',
      key: 'birthDate',
      label: 'Enter DOB',
      required: true
    }),
    'address': new FilterTextArea({
      value: '',
      key: 'address',
      label: 'Enter address',
      required: false,
      rowLength: 3
    }),
    'address1': new FilterTextArea({
      value: '',
      key: 'address1',
      label: 'Enter another address',
      required: false,
      rowLength: 3
    }),
    'country': new FilterDropdown({
      'key': 'country',
      'label': 'Select country',
      'value': '',
      'required': true,
      'isRemote': true,
      'remoteUrl': this.countries,
      'remoteKey': 'name',
      'remoteValue': 'name',
    }),
    'city': new FilterTextbox({
      value: '',
      key: 'city',
      label: 'Enter City',
      required: true,
      type: 'text'
    }),
    'state': new FilterDropdown({
      'key': 'state',
      'label': 'Select State',
      'value': '',
      'required': true,
      'isRemote': true,
      'remoteUrl': 'https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json',
      'remoteKey': 'abbreviation',
      'remoteValue': 'name',
    }),
    'zip': new FilterTextbox({
      type: 'text',
      value: '',
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
      'value': '0',
      'required': false,
      'isDisabled': false,
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

  constructor(
    private dynCtrlService: DynamicControlService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.dynCtrlService.toFormGroup(this.formBasic);
  }

  SubmitForm() {
    console.log(this.form.getRawValue());
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
