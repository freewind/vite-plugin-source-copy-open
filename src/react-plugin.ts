import openEditorReactVitePlugin from './react/src/vite';
import type { Options as ReactSourcePluginOptions } from './react/src/types';

export type { ReactSourcePluginOptions };

export function openEditorReactPlugin(options: ReactSourcePluginOptions = {}) {
  return openEditorReactVitePlugin(options);
}
