# generic-crud-bootstrap

Bootstrap-themed UI components for `generic-crud`.

This package mirrors the core control set with Bootstrap-specific templates and selectors (`gcb-*`).

## Installation

```bash
npm install generic-crud generic-crud-bootstrap lodash
```

## Peer Dependencies

- `@angular/common`: `^16.2.0 || ^17.0.0`
- `@angular/core`: `^16.2.0 || ^17.0.0`
- `@angular/forms`: `^16.2.0 || ^17.0.0`
- `@angular/router`: `^16.2.0 || ^17.0.0`
- `generic-crud`: `^17.0.0`

## Usage

Import both core and Bootstrap modules in your app:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { BASE_URL, GenericCRUDModule, GenericResolver, LayoutStyle } from 'generic-crud';
import { GenericCrudBootstrapModule } from 'generic-crud-bootstrap';

import { BootstrapAddEditComponent, BootstrapListComponent } from 'generic-crud-bootstrap';

@NgModule({
	imports: [
		BrowserModule,
		GenericCRUDModule.forRoot({ style: LayoutStyle.Bootstrap }),
		GenericCrudBootstrapModule,
		RouterModule.forRoot([
			{ path: 'bootstrap/list/:modelName', component: BootstrapListComponent, resolve: [GenericResolver] },
			{ path: 'bootstrap/add/:modelName', component: BootstrapAddEditComponent, resolve: [GenericResolver] },
			{ path: 'bootstrap/edit/:modelName/:id', component: BootstrapAddEditComponent, resolve: [GenericResolver] }
		])
	],
	providers: [{ provide: BASE_URL, useValue: 'http://localhost:3000' }]
})
export class AppModule {}
```

## Build

```bash
ng build generic-crud-bootstrap --configuration production
```

## Publish

```bash
ng build generic-crud-bootstrap --configuration production
cd dist/generic-crud-bootstrap
npm publish
```
