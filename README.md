
# Generic-CRUD

[![npm version](https://img.shields.io/npm/v/generic-crud)](https://www.npmjs.com/package/generic-crud) [![npm downloads](https://img.shields.io/npm/dy/generic-crud)](https://www.npmjs.com/package/generic-crud)

Schema-driven CRUD for Angular applications. Define entities in JSON and render list/add/edit pages at runtime.

This workspace contains:

- `generic-crud` (core library)
- `generic-crud-bootstrap` (Bootstrap-themed controls)
- `generic-crud-ionic` (Ionic-themed controls)
- Demo app + local `json-server` API

## Packages

- Core package: `generic-crud` (current version: `22.1.0`, supports Angular 14 to 22)
- Bootstrap theme package: `generic-crud-bootstrap` (current version: `22.1.0`, supports Angular 16 to 22)
- Ionic theme package: `generic-crud-ionic` (current version: `22.1.0`, supports Angular 16 to 22)

## Quick Start (Consumer App)

Install the core library and required peer dependency:

```bash
npm install generic-crud lodash
```

Import and configure in your Angular app module:

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

## Schema Setup

Create a schema file in your app assets (for example `src/assets/setup/Posts.json`):

```json
{
  "tableName": "Posts",
  "title": "Posts",
  "listColumns": [
    { "columnName": "Title", "key": "title", "sort": true },
    { "columnName": "Body", "key": "body", "sort": true }
  ],
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

Then navigate to one of the generated routes:

- `/list/Posts`
- `/add/Posts`
- `/edit/Posts/:id`

## Local Development (This Workspace)

Install dependencies:

```bash
npm install
```

Run demo app and local API together:

```bash
npm start
```

Run demo app only:

```bash
npm run start:app
```

Run local API only:

```bash
npm run api
```

Build:

```bash
npm run build
npm run build:Generic-CRUD
```

Test and lint:

```bash
npm test
npm run test:Generic-CRUD
npm run lint
```

## UI Variants

- Core routes: `/list/:modelName`, `/add/:modelName`, `/edit/:modelName/:id`
- Bootstrap demo routes: `/bootstrap/list/:modelName`, `/bootstrap/add/:modelName`, `/bootstrap/edit/:modelName/:id`
- Ionic demo routes: `/ionic/list/:modelName`, `/ionic/add/:modelName`, `/ionic/edit/:modelName/:id`

## Control Architecture

The controls use Angular `ControlValueAccessor` through `BaseControlValueAccessor`.

- Use `formControlName` in templates
- Use `updateValue(...)` to push changes to the parent form
- Call `onTouched()` on blur
- Respect disabled state (`disabled` and `control.isDisabled`)

## Publishing

Publish core package:

```bash
npm run publish:Generic-CRUD
```

Publish Bootstrap package manually:

```bash
ng build generic-crud-bootstrap --configuration production
cd dist/generic-crud-bootstrap
npm publish
```

Publish Ionic package manually:

```bash
ng build generic-crud-ionic --configuration production
cd dist/generic-crud-ionic
npm publish
```

## License

MIT. See [LICENSE](LICENSE).
