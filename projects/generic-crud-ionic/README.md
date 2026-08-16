# generic-crud-ionic

Ionic-themed UI components for `generic-crud`.

This package mirrors the core control set with Ionic-specific templates and selectors (`gci-*`).

## Installation

```bash
npm install generic-crud generic-crud-ionic lodash @ionic/angular
```

## Peer Dependencies

- `@angular/common`: `^16.2.0 || ^17.0.0`
- `@angular/core`: `^16.2.0 || ^17.0.0`
- `@angular/forms`: `^16.2.0 || ^17.0.0`
- `@angular/router`: `^16.2.0 || ^17.0.0`
- `generic-crud`: `^17.0.0`

## Usage

Import `GenericCrudIonicModule` alongside `GenericCRUDModule`, and initialize Ionic once at app root.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { BASE_URL, GenericCRUDModule, GenericResolver, LayoutStyle } from 'generic-crud';
import { GenericCrudIonicModule } from 'generic-crud-ionic';
import { IonicAddEditComponent, IonicListComponent } from 'generic-crud-ionic';

@NgModule({
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		GenericCRUDModule.forRoot({ style: LayoutStyle.Bootstrap }),
		GenericCrudIonicModule,
		RouterModule.forRoot([
			{ path: 'ionic/list/:modelName', component: IonicListComponent, resolve: [GenericResolver] },
			{ path: 'ionic/add/:modelName', component: IonicAddEditComponent, resolve: [GenericResolver] },
			{ path: 'ionic/edit/:modelName/:id', component: IonicAddEditComponent, resolve: [GenericResolver] }
		])
	],
	providers: [{ provide: BASE_URL, useValue: 'http://localhost:3000' }]
})
export class AppModule {}
```

## Build

```bash
ng build generic-crud-ionic --configuration production
```

## Publish

```bash
ng build generic-crud-ionic --configuration production
cd dist/generic-crud-ionic
npm publish
```

## Known Limitation

This package does not provide an `ion-app` / `ion-router-outlet` shell. Controls are designed to be embedded in an existing Angular app route tree. Most Ionic components render correctly without `ion-app`, but some app-shell-specific behavior (safe-area polish and router-outlet transition behavior) may not fully apply.
