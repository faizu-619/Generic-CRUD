import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModel, ButtonType, FilterCheckbox, FilterDropdown, FilterTextArea, FilterTextbox, } from 'Generic-CRUD';
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
      'options': [
        {
          'key': 'Atlanta',
          'value': 'Atlanta'
        },
        {
          'key': 'Arizaona',
          'value': 'Arizaona'
        },
        {
          'key': 'Texas',
          'value': 'Texas'
        }
      ],
      'isRemote': false
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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.maxLength(250)),
      'address': new FormControl(null, Validators.required),
      'address1': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'zip': new FormControl(null, Validators.required),
      'agree': new FormControl(null)
    });
  }

  SubmitForm() {
    console.log(this.form.getRawValue());
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
