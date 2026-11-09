# github-actions-ci-sample

[![CI](https://github.com/SaudSatopay/github-actions-ci-sample/actions/workflows/ci.yml/badge.svg)](https://github.com/SaudSatopay/github-actions-ci-sample/actions/workflows/ci.yml)

A small TypeScript sample project (a few text helpers: `slugify`, `wordCount`, `truncate`) with a GitHub Actions CI pipeline that lints, tests and builds the code on every pull request.

## What the CI pipeline does

The workflow lives in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

| Requirement | How it is met |
| --- | --- |
| Runs lint, tests and build on every pull request | Triggers on `pull_request` (plus pushes to `main` and manual runs). Steps: `npm run lint` → `npm run typecheck` → `npm test` → `npm run build`. |
| Caches dependencies | `actions/setup-node@v7` with `cache: npm` caches the npm download cache, keyed on `package-lock.json`. `npm ci` then installs from that cache. |
| A failing test makes the run fail | `npm test` runs `vitest run`, which exits with a non-zero code when any test fails. GitHub Actions stops the job at that step and marks the run (and the PR check) as failed, and the build step is skipped. |
| Status badge | The badge at the top of this README shows the result of the latest run on `main`. |

Extras:

- Runs on a Node.js matrix (22 and 24) so it catches version-specific breakage.
- Cancels older runs on the same branch when new commits are pushed (`concurrency`).
- Uses read-only `GITHUB_TOKEN` permissions.
- Uploads the compiled `dist/` folder as a build artifact (kept 7 days).

## Project layout

```
.github/workflows/ci.yml   CI pipeline
src/                       Library source (TypeScript)
test/                      Vitest tests
eslint.config.js           ESLint (flat config) + typescript-eslint
tsconfig.json              TypeScript settings (type checking)
tsconfig.build.json        TypeScript settings for the build (src -> dist)
```

## Setup

Requirements: [Node.js](https://nodejs.org/) 22.12 or newer (npm comes with it) and Git.

```bash
git clone https://github.com/SaudSatopay/github-actions-ci-sample.git
cd github-actions-ci-sample
npm ci
```

`npm ci` installs the exact dependency versions from `package-lock.json`.

## Run

| Command | What it does |
| --- | --- |
| `npm run lint` | Lints the code with ESLint |
| `npm run typecheck` | Type-checks source and tests with `tsc --noEmit` |
| `npm test` | Runs the tests once with Vitest |
| `npm run test:watch` | Re-runs tests on every file change |
| `npm run build` | Compiles `src/` to JavaScript in `dist/` |
| `npm run ci` | Runs lint, type check, tests and build in order, the same as CI |

Use the library after building:

```js
import { slugify, wordCount, truncate } from "./dist/index.js";

slugify("Hello, World!");                  // "hello-world"
wordCount("one two three");                // 3
truncate("continuous integration", 11);    // "continuous…"
```

## Seeing CI in action

1. Create a branch, make a change and open a pull request.
2. The **CI** check starts automatically on the pull request.
3. To see a failure, change an expected value in `test/text.test.ts` (for example `"hello-world"` to `"hello_world"`) and push. The **Test** step fails, the run turns red and the PR shows a failed check.

## License

MIT
