# KizilUI

![KizilUI Logo](./logo.jpg)

KizilUI is a React-based UI toolkit for the web.

It is optimized for building complex, data-dense web interfaces for desktop applications.

[**View the full documentation ↗**](https://kizilui.github.io/kizilui/)

## Packages

### Libraries

- [`@kizilui/core`](packages/core) — Core components, styles, and utilities
- [`@kizilui/icons`](packages/icons) — SVG icon components
- [`@kizilui/colors`](packages/colors) — Color palette and design tokens

### Applications

- [`@kizilui/storybook`](apps/storybook) — Interactive component development environment

### Build tooling

- [`@kizilui/build-scripts`](packages/build-scripts) — Build configuration and utilities

## Development

KizilUI is a monorepo built with [Nx](https://nx.dev) and uses [Yarn](https://yarnpkg.com) for package management and [Lerna-Lite](https://github.com/lerna-lite/lerna-lite) for publishing.

### Prerequisites

- Node.js v20.11+
- Yarn v4.x

### One-time setup

After cloning this repo, run:

```sh
yarn
```

### Incorporating upstream changes

If you were previously in a working state and have just pulled new code from `main`:

```sh
yarn
yarn compile
```

### Developing libraries

Run the following to get compilation and bundling running in watch mode for all packages:

```sh
yarn dev
```

### Developing applications

To run Storybook locally, at apps/storybook:

```sh
yarn dev:storybook
```

### Updating documentation

Documentation lives in [`@kizilui/storybook`](apps/storybook) as Storybook stories and MDX files.

### Running tests

```sh
yarn test
```

### Code quality

KizilUI uses ESLint for linting and Prettier for code formatting.

```sh
yarn lint        # check for lint issues
yarn lint-fix    # fix auto-fixable issues
yarn format      # format code with Prettier
```

## License

This project is made available under the Apache 2.0 License.