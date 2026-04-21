import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { openEditorMiddleware, type OpenEditorMiddlewareOptions } from './server/src/openEditorMiddleware';
import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite';
import { normalizePath } from './shared/src/normalizePath';
import { ServerApis } from './shared/src/serverApis';
import type { Options as ClientOptions } from './client/src/options';

const VIRTUAL_CLIENT_MODULE_ID = 'virtual:vite-plugin-source-copy-open/client';
const RESOLVED_VIRTUAL_CLIENT_MODULE_ID = `\0${VIRTUAL_CLIENT_MODULE_ID}`;
const PUBLIC_VIRTUAL_CLIENT_PATH = `/@id/__x00__${VIRTUAL_CLIENT_MODULE_ID}`;

export interface SourceCopyOpenPluginOptions
  extends Pick<ClientOptions, 'displayToggle' | 'disableHoverCSS' | 'ignoreComponents' | 'once' | 'crossIframe' | 'port'>,
    OpenEditorMiddlewareOptions {
  autoOverlay?: boolean;
}

export function sourceCopyOpenPlugin(options: SourceCopyOpenPluginOptions = {}): Plugin {
  const autoOverlay = options.autoOverlay ?? true;
  let resolvedRootDir = normalizePath(resolve(options.rootDir ?? process.cwd()));

  const browserModulePath = normalizeFsPath(
    fileURLToPath(new URL(import.meta.url.endsWith('.ts') ? './browser.ts' : './browser.js', import.meta.url)),
  );

  return {
    name: 'vite-plugin-source-copy-open',
    apply: 'serve',
    configResolved(config: ResolvedConfig) {
      resolvedRootDir = normalizePath(resolve(options.rootDir ?? config.root));
    },
    configureServer(server: ViteDevServer) {
      server.middlewares.use(
        ServerApis.OPEN_EDITOR,
        openEditorMiddleware({
          rootDir: resolvedRootDir,
          onOpenEditor: options.onOpenEditor,
        }),
      );
    },
    resolveId(id: string) {
      if (id === VIRTUAL_CLIENT_MODULE_ID) {
        return RESOLVED_VIRTUAL_CLIENT_MODULE_ID;
      }
    },
    load(id: string) {
      if (id !== RESOLVED_VIRTUAL_CLIENT_MODULE_ID) {
        return null;
      }

      return `
import { setupOpenEditorClient } from ${JSON.stringify(browserModulePath)}
setupOpenEditorClient(${JSON.stringify({
  rootDir: resolvedRootDir,
  displayToggle: options.displayToggle,
  disableHoverCSS: options.disableHoverCSS,
  ignoreComponents: options.ignoreComponents,
  once: options.once,
  crossIframe: options.crossIframe,
  port: options.port,
})})
`;
    },
    transformIndexHtml() {
      if (!autoOverlay) {
        return undefined;
      }

      return [
        {
          tag: 'script',
          attrs: {
            type: 'module',
            src: PUBLIC_VIRTUAL_CLIENT_PATH,
          },
          injectTo: 'body',
        },
      ];
    },
  };
}

function normalizeFsPath(path: string) {
  return `/@fs/${path.replace(/\\/g, '/')}`;
}
