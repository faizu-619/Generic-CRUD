---
name: add-form-control
description: Scaffold a new schema-driven form control for the Generic-CRUD libraries — a core ControlValueAccessor component in projects/generic-crud plus its Bootstrap-themed counterpart in projects/generic-crud-bootstrap, wired into both dynamic-control templates, both modules, both barrels, and public_api.ts. Use when asked to add a new control type, field type, or input widget to Generic-CRUD.
---

# Add a form control to Generic-CRUD

Every schema-driven control exists **twice**: once as a style-agnostic core control (`gc-` selector, `projects/generic-crud`) and once as its Bootstrap-themed counterpart (`gcb-` selector, `projects/generic-crud-bootstrap`, which imports everything it needs from the built `Generic-CRUD` package name — not relative paths). Both must be added together, plus the `ControlType` enum, both dynamic-control switches, both modules, both index barrels, and the core `public_api.ts`. Skipping any one step leaves the control declared-but-unusable or unexported.

Ask the user for: the control name (e.g. `rating`), what value type it edits (string/number/boolean/array/etc.), and any control-specific config fields (e.g. `min`/`max`) before scaffolding — don't guess these.

## Steps

### 1. Add a `ControlType` enum value (if this is a genuinely new field type)

Edit `projects/generic-crud/src/lib/shared/_controls/_models/filterBase.ts` — append to the `ControlType` enum (do not renumber existing members; existing schema JSON files reference these numbers):

```ts
export enum ControlType {
    TextBox = 1,
    // ... existing members unchanged ...
    CustomControl = 10,
    YourNewType = 11
}
```

### 2. Add the model class

New file `projects/generic-crud/src/lib/shared/_controls/_models/filter-<name>.ts`, following `filter-textbox.ts`'s pattern — extend `FilterBase<T>`, set `controlType = ControlType.YourNewType`, add any control-specific fields with defaults pulled from `options`:

```ts
import { FilterBase, ControlType } from './filterBase';

export class FilterYourName extends FilterBase<YourValueType> {
  controlType = ControlType.YourNewType;
  // control-specific fields here, e.g.: max: number;

  constructor(options: {} = {}) {
    super(options);
    // this.max = options['max'] || 0;
  }
}
```

Add `export * from './filter-<name>';` to `projects/generic-crud/src/lib/shared/_controls/_models/index.ts`.

### 3. Core component (`gc-` prefix)

New folder `projects/generic-crud/src/lib/shared/_controls/<name>/` with `.ts`, `.html`, `.css`. Model the `.ts` on `text-box/text-box.component.ts`:

```ts
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterYourName } from '../_models';
import { BaseControlValueAccessor } from '../_base';

@Component({
  selector: 'gc-<name>',
  templateUrl: './<name>.component.html',
  styleUrls: ['./<name>.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => YourNameComponent),
    multi: true
  }]
})
export class YourNameComponent extends BaseControlValueAccessor {
  @Input() control: FilterYourName;

  onInputChange(event: any): void {
    this.updateValue(event.target.value); // never set this.value directly
  }

  onBlur(): void {
    this.onTouched();
  }
}
```

Template binds `[value]="value"`, fires `updateValue()` on change, respects `[disabled]="disabled || control.isDisabled"` — see `text-box.component.html` for the plain-input case or `check-box.component.ts`/`select-dropdown.component.ts` for non-text-input patterns.

Wire it in:
- `projects/generic-crud/src/lib/shared/_controls/index.ts` — `export * from './<name>/<name>.component';`
- `projects/generic-crud/src/public_api.ts` — same export line (this is the actual public surface consumers/`generic-crud-bootstrap` import from as package `Generic-CRUD`)
- `projects/generic-crud/src/lib/generic-crud.module.ts` — add to both `declarations` and `exports` arrays
- `projects/generic-crud/src/lib/shared/_controls/dynamic-control/dynamic-control.component.html` — add a `*ngSwitchCase` branch keyed on the new `ControlType` numeric value, matching the existing `gc-*` entries' `[control]`/`[formControlName]`/`libControlState` bindings

### 4. Bootstrap counterpart (`gcb-` prefix)

New file `projects/generic-crud-bootstrap/src/lib/controls/bootstrap-<name>.component.ts` (+ `.html`/`.css`). Import `BaseControlValueAccessor` and the filter model **from `'Generic-CRUD'`**, not a relative path (this package only ever imports the core lib's public API):

```ts
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, FilterYourName } from 'Generic-CRUD';

@Component({
  selector: 'gcb-<name>',
  templateUrl: './bootstrap-<name>.component.html',
  styleUrls: ['./bootstrap-<name>.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BootstrapYourNameComponent),
    multi: true
  }]
})
export class BootstrapYourNameComponent extends BaseControlValueAccessor<any> {
  @Input() control: FilterYourName;

  onInput(value: any): void {
    this.updateValue(value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
```

Give the template Bootstrap markup/classes (`form-control` etc.) equivalent to the core template's behavior.

Wire it in:
- `projects/generic-crud-bootstrap/src/lib/controls/index.ts` — `export * from './bootstrap-<name>.component';`
- `projects/generic-crud-bootstrap/src/lib/generic-crud-bootstrap.module.ts` — add to both `declarations` and `exports`
- `projects/generic-crud-bootstrap/src/lib/controls/bootstrap-dynamic-control.component.html` — add a `*ngSwitchCase="ControlType.YourNewType"` branch (this file uses the enum name via the `ControlType` readonly, not the raw number — match that style, unlike the core template which uses raw numbers)

### 5. Verify

```bash
ng build Generic-CRUD --configuration production          # core lib compiles + ng-packagr succeeds
ng build generic-crud-bootstrap --configuration production # bootstrap lib compiles against the built core types
ng lint Generic-CRUD                                        # selector prefix rule expects "lib" but existing controls use "gc-"/"gcb-" and fail this too — match existing convention, don't fix the prefix as a side effect
```

Then, if the user wants it usable from a schema JSON immediately, add a `controls[]` entry with the new `controlType` number to a demo schema under `src/assets/setup/` and confirm it renders via `npm start`.
