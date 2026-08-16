
# generic-crud

Core schema-driven CRUD library for Angular.

## Installation

```bash
npm install generic-crud lodash
```

## Peer Dependencies

- `@angular/common`: `^14.0.0 || ^15.0.0 || ^16.0.0 || ^17.0.0`
- `@angular/core`: `^14.0.0 || ^15.0.0 || ^16.0.0 || ^17.0.0`
- `lodash`: `^4.17.15`

## Basic Setup

Import `GenericCRUDModule` and provide `BASE_URL`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { environment } from './environments/environment';
import { BASE_URL, GenericCRUDModule, LayoutStyle } from 'generic-crud';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    GenericCRUDModule.forRoot({ style: LayoutStyle.Bootstrap })
  ],
  providers: [{ provide: BASE_URL, useValue: environment.apiUrl }],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Required Schema

Define entity schemas in your app assets under `src/assets/setup/<ModelName>.json`.

Minimum useful structure:

```json
{
  "tableName": "Posts",
  "title": "Posts",
  "listColumns": [{ "columnName": "Title", "key": "title", "sort": true }],
  "controls": [
    {
      "key": "title",
      "label": "Post Title",
      "value": "",
      "required": true,
      "type": "text",
      "order": 0,
      "isDisabled": false,
      "controlType": 1
    }
  ]
}
```

Routes exposed by the module:

- `/list/:modelName`
- `/add/:modelName`
- `/edit/:modelName/:id`

## ControlValueAccessor Notes

All built-in controls are CVA-based.

- Use `formControlName` in templates.
- For custom controls, extend `BaseControlValueAccessor`.
- Use `updateValue(...)` instead of assigning `value` directly.
- Call `onTouched()` on blur.

## License

MIT.
