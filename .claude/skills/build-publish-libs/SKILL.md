---
name: build-publish-libs
description: Build and publish the generic-crud and generic-crud-bootstrap npm packages from this workspace. Use when asked to build, version-bump, or publish either library — never run the actual publish step without explicit user confirmation, since it is irreversible (npm does not allow re-publishing the same version).
---

# Build & publish the Generic-CRUD libraries

Two independently-versioned packages live in this workspace, and they are **not** symmetric in tooling:

| | `generic-crud` (core) | `generic-crud-bootstrap` |
|---|---|---|
| package.json | `projects/generic-crud/package.json` | `projects/generic-crud-bootstrap/package.json` |
| current version | matches root `package.json` (`17.0.0`) | `0.0.1` |
| root npm script | `npm run build:Generic-CRUD`, `npm run publish:Generic-CRUD` | none — build/publish manually |
| CI | `.github/workflows/npm-publish.yml` builds+publishes it automatically when a GitHub **release** is created (test/lint steps are present but commented out) | no CI workflow at all |
| build output | `dist/generic-crud` | `dist/generic-crud-bootstrap` |

`generic-crud-bootstrap` has `Generic-CRUD` as a peer dependency — if you're publishing a core change that bootstrap relies on, publish/bump the core package first, or the bootstrap package's peer range may not resolve for consumers.

`dist/` is gitignored build output, not source — never hand-edit files there.

## Publishing the core library (`generic-crud`)

Preferred path is CI, not local `npm publish`:

1. Bump `version` in `projects/generic-crud/package.json` (and root `package.json` if the demo app version should track it) in a normal commit/PR.
2. Confirm with the user, then (only if asked) create a GitHub release — that triggers `.github/workflows/npm-publish.yml`, which runs `npm run build:Generic-CRUD` and `npm publish` from `dist/generic-crud` using the repo's `NPM_TOKEN` secret. Creating a release is a shared/irreversible action — always confirm with the user first, and do not run `gh release create` without that confirmation.

Manual/local publish (only if the user explicitly wants to bypass CI):
```bash
npm run build:Generic-CRUD          # ng build Generic-CRUD --configuration production
cd dist/generic-crud
npm publish                          # STOP and confirm with the user before running this — irreversible
```

## Publishing the theme library (`generic-crud-bootstrap`)

No CI, no root npm script — fully manual:
```bash
npm version <new-version> --no-git-tag-version --prefix projects/generic-crud-bootstrap   # or hand-edit projects/generic-crud-bootstrap/package.json
ng build generic-crud-bootstrap --configuration production
cd dist/generic-crud-bootstrap
npm publish                          # STOP and confirm with the user before running this — irreversible
```

## Before publishing either package

- `npm run lint` only covers the demo app (root `.eslintrc.json` ignores `projects/**`); run `ng lint Generic-CRUD` separately for the core library. `generic-crud-bootstrap` has no lint target in `angular.json`.
- There is no automated test gate in CI for either package (commented out in the workflow) — if the user wants confidence before publishing, run `npm run test:Generic-CRUD` (core) yourself; there's no equivalent script for the bootstrap package, use `ng test generic-crud-bootstrap`.
- Verify the build output actually contains the expected version: check `dist/<package>/package.json` after building, before publishing.

## Hard rule

Never run `npm publish`, `gh release create`, or any other step that pushes a package version publicly without the user explicitly confirming that exact version and package first — npm publishes cannot be unpublished/overwritten after ~72 hours (and unpublishing early is disruptive to consumers), and a GitHub release triggers a real CI publish.
