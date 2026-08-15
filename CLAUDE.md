# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`generic-crud` is an Angular library published to npm that generates a full CRUD UI (list/add/edit) at runtime from a JSON schema, instead of hand-coding a component per entity. The repo is an Angular CLI multi-project workspace containing:

- **`projects/generic-crud/`** — the core library (npm package `generic-crud`, published as `Generic-CRUD` in `dist/generic-crud`). Style-agnostic: drives routing, forms, validation, filtering from schema, but has no CSS framework opinion of its own.
- **`projects/generic-crud-bootstrap/`** — a companion library (`generic-crud-bootstrap`) that re-implements every core control with Bootstrap markup. It depends on `GenericCRUDModule` from the core lib and duplicates its control set 1:1 (selector `gc-text-box` → `gcb-text-box`, etc.) rather than theming the core components. When changing control behavior, you usually need to change it in **both** places.
- **`src/app/`** — the demo/example Angular application (`Generic-CRUD-Example`) that consumes both libraries against a local mock API.
- **`api/`** — a `json-server` mock backend (`db.json` + `routes.json`).

## Commands

```bash
npm start                        # ng serve — demo app (uses environment.apiUrl by default, e.g. jsonplaceholder)
npm run api                      # json-server api/db.json --routes api/routes.json — local mock backend on its own port

npm run build                    # ng build --configuration production — builds the demo app
npm run build:Generic-CRUD       # ng build Generic-CRUD --configuration production — builds the core library only
npm run publish:Generic-CRUD     # builds core lib then npm publish from dist/generic-crud

npm test                         # ng test — Karma/Jasmine tests for the demo app (src/**)
npm run test:Generic-CRUD        # ng test Generic-CRUD — Karma/Jasmine tests for the core library

npm run lint                     # eslint . --ext .ts,.html (root .eslintrc.json ignores projects/**)
npm run lint:fix

npm run e2e                      # Protractor e2e tests
```

There is no root-level `ng lint` config covering `projects/**`; the core library has its own `projects/generic-crud/.eslintrc.json`, invoked via `ng lint Generic-CRUD`. The `generic-crud-bootstrap` project has no lint target in `angular.json`.

To run a single spec, pass Karma's `--include` or filter via `--browsers ChromeHeadless --single-run` plus `fit`/`fdescribe` in the spec — there's no `--testPathPattern` equivalent; the simplest approach is temporarily marking the target spec with `fdescribe`/`fit`.

`angular.json` defines four projects: `Generic-CRUD-Example` (demo app, default), `Generic-CRUD-Example-e2e`, `Generic-CRUD` (core lib), `generic-crud-bootstrap` (theme lib). Use `ng build <project>` / `ng test <project>` to target a specific one.

## Architecture

### Schema-driven CRUD flow

1. A schema JSON under `src/assets/setup/<ModelName>.json` (e.g. `Posts.json`) declares `tableName`, `title`, `listColumns` (datatable columns, including inline `cellTemplate` HTML for action links), `controls` (form fields — `key`, `type`, `required`, `order`, `controlType`, validators), and `actionButtons`.
2. `GenericService<Type>` (`projects/generic-crud/src/lib/shared/_service/generic.service.ts`) fetches the schema via `getSchema()` (hardcoded relative path `./assets/setup/${modelName}.json` — the consuming app's asset folder must contain it) and does CRUD against `${BASE_URL}/${modelName}` using the `BASE_URL` injection token.
3. `GenericCRUDModule.forRoot(config: GenericConfig)` registers child routes: `list/:modelName`, `add/:modelName`, `edit/:modelName/:id`, each resolved via `GenericResolver` before `ListComponent`/`AddEditComponent` render. `GenericConfig.style` (`LayoutStyle.Bootstrap` / `LayoutStyle.Material`) is provided via the `GENERIC_CONFIG` token but is not currently consumed to switch rendering — Bootstrap theming is done by using the separate `generic-crud-bootstrap` components/routes directly (see `src/app/app.module.ts` for the `bootstrap/...` route block), not by the config flag.
4. `DynamicFormComponent`/`DynamicControlComponent` render the actual per-field control based on `controlType`, delegating to the individual control components (text-box, text-area, check-box, select-dropdown, single-date, range-date, date-of-birth, custom-filter).

### Form controls use ControlValueAccessor, not `[form]`

All controls extend `BaseControlValueAccessor` (`projects/generic-crud/src/lib/shared/_controls/_base/base-control-value-accessor.ts`) and are wired with `[formControlName]`, not a passed-down `FormGroup`. This was a deliberate migration (see `CVA_MIGRATION.md`, `CVA_IMPLEMENTATION_SUMMARY.md`) for decoupling and change-detection performance. When adding or editing a control:

- Extend `BaseControlValueAccessor<T>`, provide `NG_VALUE_ACCESSOR` via `forwardRef`.
- Never set `this.value` directly — call `this.updateValue(newValue)` so the form is notified.
- Call `this.onTouched()` on blur so validation triggers correctly.
- Respect the inherited `disabled` input in the template (`[disabled]="disabled || control.isDisabled"`).
- Custom components implementing `CustomComponent` (`shared/interfaces/custom-component.ts`) receive an optional `valueChange` callback instead of a `form` input.

### Dual-library duplication

Every control in `projects/generic-crud/src/lib/shared/_controls/<name>/` has a themed counterpart `projects/generic-crud-bootstrap/src/lib/controls/bootstrap-<name>.component.ts`. Core selectors use a `gc-` prefix (e.g. `gc-text-box`), bootstrap counterparts use `gcb-` (e.g. `gcb-text-box`) — note this does *not* match the `lib` prefix the ESLint `component-selector`/`directive-selector` rules require (see below); this is a pre-existing inconsistency, not a target to "fix" incidentally while doing unrelated work. `GenericCrudBootstrapModule` imports `GenericCRUDModule` and declares/exports all `Bootstrap*` components alongside its own `GenericCrudBootstrapComponent`. New controls or behavior changes generally need to land in both the core control and its bootstrap counterpart, plus both modules' `declarations`/`exports` arrays and `_controls/index.ts` / `controls/index.ts` barrels.

### Demo app wiring

`src/app/app.module.ts` imports both libraries directly from `projects/` source (not from `dist/`) via relative paths, alongside one import from the built package name `Generic-CRUD` — this dual-import pattern exists so the demo app exercises the in-repo library source during development. `BASE_URL` is provided three ways (import from `Generic-CRUD`, import from source `generic.service.ts`, and the raw string token `'BASE_URL'`) — keep this in sync if the token's source changes.

## Publishing

`.github/workflows/npm-publish.yml` publishes the **core** package only, triggered by creating a GitHub release: `npm run build:Generic-CRUD` then `npm publish` from `dist/generic-crud` (test and lint steps are present but commented out). `generic-crud-bootstrap` (`projects/generic-crud-bootstrap/package.json`, currently at `0.0.1`) has no build/publish npm script and no CI workflow — publishing it is a manual `ng build generic-crud-bootstrap --configuration production && cd dist/generic-crud-bootstrap && npm publish`. Bump the version in the relevant `projects/*/package.json` before publishing; `dist/` is gitignored build output, not source.

## Style/lint conventions (core library)

Enforced by `projects/generic-crud/.eslintrc.json`:
- Component selectors: `lib-` prefix, kebab-case. Directive selectors: `lib` prefix, camelCase.
- No `console.log` (error); `console.warn`/`console.error` allowed.
- Avoid `any` (warning); unused vars allowed only with `_` prefix.

Demo app selectors (`.eslintrc.json` root) use `app` prefix instead of `lib`.
