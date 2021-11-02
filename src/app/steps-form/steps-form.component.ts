import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterTextbox, FilterDateOfBirth, FilterRangeDate, FilterTextArea, FilterAutocompleteTextbox, FilterDropdown, FilterCheckbox, ButtonModel, ButtonType, DynamicControlService, StepperFormModel } from 'Generic-CRUD';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-steps-form',
  templateUrl: './steps-form.component.html',
  styleUrls: ['./steps-form.component.css']
})
export class StepsFormComponent implements OnInit {
  form: FormGroup;
  submited = false;

  countries = new Observable<any[]>((observer) => {
    // observable execution
    observer.next([{ name: 'USA' }, { name: 'Pakistan' }]);
    observer.complete();
  });

  formSetting: StepperFormModel[] = [
    {
      form: [
        new FilterTextbox({
          type: 'email',
          value: '',
          key: 'email',
          label: 'Enter email',
          required: true
        }),
        new FilterTextbox({
          type: 'password',
          value: '',
          key: 'password',
          label: 'Enter password',
          required: true,
          'minLength': 6,
          'maxLength': 100,
          'validationRegex': '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$',
          'validationRegexMessage': 'Password has at least one number and at least one special character.'
        })
      ],
      allowBack: false,
      allowNext: true,
      allowSubmit: false,
      stepLabel: "First"
    },
    {
      form: [
        new FilterDateOfBirth({
          value: '',
          key: 'birthDate',
          label: 'Enter DOB',
          required: true
        }),
        new FilterRangeDate({
          value: '',
          key: 'rangeDate',
          label: 'Enter range',
          required: true
        })],
        allowBack: true,
        allowNext: true,
        allowSubmit: false,
        stepLabel: "Second"
    },
    {
      form: [
        new FilterTextArea({
          value: '',
          key: 'address',
          label: 'Enter address',
          required: false,
          rowLength: 3
        }),
        new FilterTextArea({
          value: '',
          key: 'address1',
          label: 'Enter another address',
          required: false,
          rowLength: 3
        }),
        new FilterAutocompleteTextbox({
          'key': 'country',
          'label': 'Select country',
          'value': '',
          'required': true,
          'isRemote': true,
          'remoteUrl': 'https://restcountries.com/v2/name/',
          'remoteKey': 'name',
          'remoteValue': 'name',
        }),
        new FilterTextbox({
          value: '',
          key: 'city',
          label: 'Enter City',
          required: true,
          type: 'text'
        }),
        new FilterDropdown({
          'key': 'state',
          'label': 'Select State',
          'value': '',
          'required': true,
          'isRemote': true,
          'remoteUrl': 'https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json',
          'remoteKey': 'abbreviation',
          'remoteValue': 'name',
        }),
        new FilterTextbox({
          type: 'text',
          value: '',
          key: 'zip',
          label: 'Enter zip',
          required: true,
          'format': {
            'mask': '0000000'
          }
        })
      ],
      allowBack: true,
      allowNext: true,
      allowSubmit: false,
      stepLabel: "Third"
    },
    {
      form: [
        new FilterCheckbox({
          'key': 'agree',
          'label': 'I agree',
          'value': '0',
          'required': false,
          'isDisabled': false,
        })
      ],
      allowBack: true,
      allowNext: false,
      allowSubmit: true,
      stepLabel: "Last"
    }
  ];

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
  }

  SubmitForm(event: any) {
    console.log(event);
    if (event) {
      console.log(event);
    }
  }

}
