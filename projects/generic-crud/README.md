
# Generic-CRUD

A simple Angular based package to create run-time CRUD for any API, Object or Table.

## Installation

#### npm
```shell
$ npm install generic-crud lodash --save
```

## Configuration

Include module `GenericCRUDModule` and configure the BASE_URL provider.
Add a dependency to your app, for instance:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GenericCRUDModule, BASE_URL } from 'generic-crud';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { environment } from './environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    GenericCRUDModule.forRoot({ style: 1 }) // 1 for Bootstrap, 2 for Material
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Breaking Changes (v0.0.22+)

**Important:** If upgrading from earlier versions:

1. **BASE_URL Provider Required**: You must now provide the `BASE_URL` token in your app module:
   ```typescript
   import { BASE_URL } from 'generic-crud';
   
   providers: [
     { provide: BASE_URL, useValue: 'http://localhost:3000' }
   ]
   ```

2. **Lodash Peer Dependency**: Install lodash as a peer dependency:
   ```shell
   npm install lodash --save
   ```

3. **TSLint → ESLint Migration**: The project has migrated from TSLint to ESLint. If contributing or developing:
   - TSLint has been removed (deprecated since 2019)
   - ESLint is now configured with Angular-specific rules
   - Run `npm run lint` to check code quality
   - Run `npm run lint:fix` to auto-fix issues

4. **ControlValueAccessor Implementation**: All form controls now implement `ControlValueAccessor` (v0.0.22+):
   - Controls no longer require `[form]` input parameter
   - Use `formControlName` directive instead (standard Angular pattern)
   - **Better Performance**: Reduced change detection cycles
   - **Better Reusability**: Controls can be used independently with `ngModel` or `formControlName`
   - **Breaking Change**: If you have custom components implementing `CustomComponent` interface, update them to use `valueChange` callback instead of `form` parameter

## Development

### Architecture

#### ControlValueAccessor Pattern

All form controls in this library implement Angular's `ControlValueAccessor` interface, following best practices:

**Benefits:**
- ✅ **Decoupled**: Controls are independent and don't need parent form reference
- ✅ **Performance**: Reduced change detection overhead
- ✅ **Flexibility**: Works with `formControlName`, `ngModel`, or reactive forms
- ✅ **Reusability**: Controls can be used in any context

**Creating Custom Controls:**

If you need to create a custom control, extend the `BaseControlValueAccessor`:

```typescript
import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor } from 'generic-crud';

@Component({
  selector: 'my-custom-control',
  template: `
    <input 
      [value]="value || ''" 
      (input)="updateValue($event.target.value)"
      (blur)="onTouched()"
      [disabled]="disabled">
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MyCustomControlComponent),
    multi: true
  }]
})
export class MyCustomControlComponent extends BaseControlValueAccessor {
  // Your custom logic here
}
```

### Code Quality

This library uses ESLint for code quality and consistency:

```shell
# Check for linting errors
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

## Getting Started

Setup CRUD Config on `src\assets\setup\Posts.json`, Example file below:

```json
{
    "tableName": "Posts",
    "title": "Posts",
    "listColumns": [
        {
            "columnName": "Title",
            "key": "title",
            "sort": true
        },
        {
            "columnName": "",
            "key": "body",
            "sort": true
        },
        {
            "columnName": "Edit",
            "key": "id",
            "sort": false,
            "onClick": true,
            "cellTemplate": "<a  class='btn text-info pull-right'>Edit</a>"
        },
        {
            "columnName": "Remove",
            "key": "id",
            "sort": false,
            "onClick": true,
            "cellTemplate": "<a class='btn text-danger pull-right'>Delete</a>"
        }
    ],
    "controls": [
        {
            "key": "id",
            "label": "",
            "value": "",
            "required": false,
            "type": "hidden",
            "order": 0,
            "isDisabled": false,
            "controlType": 1
        },
        {
            "key": "userId",
            "label": "",
            "value": "1",
            "required": false,
            "type": "hidden",
            "order": 0,
            "isDisabled": false,
            "controlType": 1
        },
        {
            "key": "title",
            "label": "Post Title",
            "value": "",
            "required": true,
            "type": "text",
            "order": 0,
            "isDisabled": false,
            "controlType": 1
        },
        {
            "key": "body",
            "label": "Body",
            "value": "",
            "required": true,
            "type": "text",
            "order": 1,
            "isDisabled": false,
            "controlType": 7
        }
    ]
}
```

#### Second Step

Set your route to access your CRUD

```html
    <ul class="navbar-nav mr-auto">
      ...
      <li class="nav-item">
        <a class="nav-link" routerLink="/list/Posts">Posts</a>
      </li>
    </ul>
```

<!-- Events:
=============================== -->

## Built With

* [Angular](https://angular.io/) - Angular is an application design framework and development platform for creating efficient and sophisticated single-page apps.
* [Lodash](https://lodash.com/) - A modern JavaScript utility library delivering modularity, performance & extras.

## Contributing
Feel free to suggest idea or report an issue, at any point that you understand. 

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/faizu-619/Generic-CRUD/tags). 

## Authors

* **Muhammad Faizan** - *Initial work* - [faizu619](https://github.com/faizu-619)

See also the list of [contributors](https://github.com/faizu-619/Generic-CRUD/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Tired to create same component for multiple CRUD operations.
* Inspired by Angular dynamic controls example.
