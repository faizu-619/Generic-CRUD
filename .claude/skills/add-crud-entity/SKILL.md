---
name: add-crud-entity
description: Add a new schema-driven CRUD entity to the Generic-CRUD demo app — a JSON schema under src/assets/setup/, a nav link, and (if backing it with the local mock API) matching api/db.json data. Use when asked to add a new entity, model, or "table" to the Generic-CRUD demo/example app.
---

# Add a CRUD entity to the demo app

A "CRUD entity" in this repo is just a JSON schema file plus a routed nav link — there's no code generation involved, no TypeScript model, no module change. The runtime resolves everything from the schema at `/list/:modelName`, `/add/:modelName`, `/edit/:modelName/:id`.

Ask the user for: the entity name (used as both the schema filename and the API resource path — must match exactly, case-sensitive), the fields it needs (with types/required-ness), and whether it should back onto the demo's current API (`https://jsonplaceholder.typicode.com`, read-only public test data, see `src/environments/environment.ts`) or the local `json-server` mock (`api/db.json`, full CRUD, but **not** wired up as the active `apiUrl` by default — switching to it means editing `environment.ts`, which affects every entity, not just the new one, so confirm with the user before doing that).

## Steps

### 1. Create the schema

New file `src/assets/setup/<EntityName>.json` (PascalCase filename matching how you'll reference it in routes, e.g. `Products.json`). Base it on `src/assets/setup/Posts.json` / `src/assets/setup/Users.json`:

```json
{
    "tableName": "<EntityName>",
    "title": "<Display Title>",
    "listColumns": [
        { "columnName": "<Column Header>", "key": "<fieldKey>", "sort": true },
        { "columnName": "Edit", "key": "id", "sort": false, "onClick": true,
          "cellTemplate": "<a class='btn text-info pull-right'>Edit</a>" },
        { "columnName": "Remove", "key": "id", "sort": false, "onClick": true,
          "cellTemplate": "<a class='btn text-danger pull-right'>Delete</a>" }
    ],
    "controls": [
        { "key": "id", "label": "", "value": "", "required": false, "type": "hidden", "order": 0, "isDisabled": false, "controlType": 1 },
        { "key": "<fieldKey>", "label": "<Field Label>", "value": "", "required": true, "type": "text", "order": 1, "isDisabled": false, "controlType": 1 }
    ],
    "actionButtons": [
        { "hrefLink": "", "key": "btnSubmit", "label": "Save", "order": 0, "buttonType": "Submit", "isDisabled": false, "customClass": "btn btn-primary" },
        { "hrefLink": "", "key": "btnReset", "label": "Reset", "order": 0, "buttonType": "Reset", "isDisabled": false, "customClass": "btn btn-default" }
    ]
}
```

`controlType` values come from the `ControlType` enum (`projects/generic-crud/src/lib/shared/_controls/_models/filterBase.ts`): `1` TextBox, `2` Number, `3` SingleDate, `4` RangeDate, `5` Dropdown, `6` CheckBox, `7` TextArea, `8` DateOfBirth, `9` AutocompleteTextbox, `10` CustomControl. See [add-form-control](../add-form-control/SKILL.md) if the entity needs a control type that doesn't exist yet.

`listColumns[].cellTemplate` is raw HTML rendered per-row (via `SafePipe`) — keep it to the existing edit/delete anchor pattern unless the user asks for custom actions.

### 2. Add a nav link

In `src/app/app.component.html`, add entries under both the "Default UI" and "Bootstrap UI" dropdowns (mirror the existing `Posts`/`Users` entries):

```html
<a class="dropdown-item" routerLink="/list/<EntityName>" routerLinkActive="active"><EntityName></a>
```
```html
<a class="dropdown-item" routerLink="/bootstrap/list/<EntityName>" routerLinkActive="active"><EntityName></a>
```

No route needs registering by hand — `GenericCRUDModule.forRoot()` (core) and the `bootstrap/...` routes in `src/app/app.module.ts` already define the generic `list/:modelName`, `add/:modelName`, `edit/:modelName/:id` patterns that these links resolve against.

### 3. Back it with data

- **Public API (default, read-only demo data):** only works if `jsonplaceholder.typicode.com` already exposes a matching resource path (it has `/posts`, `/users`, `/albums`, `/comments`, `/photos`, `/todos` — nothing else). For anything else, use the local mock API instead.
- **Local mock API (`json-server`, full CRUD):**
  1. Add a top-level array to `api/db.json` keyed by the exact resource name the schema's `tableName` will be requested as (e.g. `"products": [...]`).
  2. Run `npm run api` to serve it (defaults to `http://localhost:3000`).
  3. Point the demo at it: change `apiUrl` in `src/environments/environment.ts` (dev) — this affects *all* entities in the demo app, not just the new one, so only do this if the user wants the whole demo backed locally, and say so before editing it.

### 4. Verify

```bash
npm run api      # if using the local mock backend — leave running
npm start        # ng serve
```
Navigate to `/list/<EntityName>` and `/bootstrap/list/<EntityName>` in the browser and confirm the list renders, add/edit forms validate as configured, and delete works.
