# vite-plugin-source-copy-open

`vite-plugin-source-copy-open` is a publishable package for the `Vite + React` workflow, derived from [`open-editor`](https://github.com/zjxxxxxxxxx/open-editor).

It keeps the upstream source-location pipeline, then adds a few small interaction changes aimed at everyday local development.

## Install

```bash
npm i -D vite-plugin-source-copy-open vite
```

## Usage

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sourceCopyOpen from 'vite-plugin-source-copy-open';

export default defineConfig({
  plugins: [
    react(),
    sourceCopyOpen({
      rootDir: process.cwd(),
    }),
  ],
});
```

The package also exports:

- `viteSourceCopyOpenPlugin`
- `sourceCopyOpenPlugin`
- `openEditorReactPlugin`
- `setupOpenEditorClient`
- `openInEditor`
- `copySourceLocation`

## Features

- Injects source location metadata into React elements during development.
- Shows an in-browser inspector tooltip with component name and file location.
- Opens the local editor through the dev server endpoint.
- Supports `Copy` and `Open` actions directly from the tooltip.

## Changes In This Fork

- The inspector shortcut was changed to `Option`.
- The shortcut now uses a hold-to-inspect workflow: hold `Option` to enable, release it to exit.
- Clicking the inspected element no longer opens the editor.
- The toggle shows the shortcut hint on hover.
- The tooltip includes `Copy` and `Open` actions.
- `Copy` changes to `Copied ✓` after a successful click.
- The tooltip stays closer to the active element and the target switch delay is reduced to `100ms`, so it is easier to move the pointer from the element to the tooltip.

This shortcut change is intentional: one hand can stay on the keyboard while the other stays on the mouse, which is more practical than a two-hand shortcut during inspection.

## Development

```bash
pnpm install
pnpm build
pnpm check
pnpm demo:dev
```

## Publish Checklist

```bash
pnpm build
pnpm check
npm pack --dry-run
npm publish
```

## Credits

This package is built on top of the original `open-editor` project by `zjxxxxxxxxx`.

Sincere thanks to the original author. The source mapping, framework integration, inspector architecture, and editor bridge all come from the upstream project, and this package is only possible because that foundation was already solid and thoughtfully designed.
