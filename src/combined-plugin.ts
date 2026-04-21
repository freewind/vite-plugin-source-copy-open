import type { PluginOption } from 'vite';
import { openEditorReactPlugin, type ReactSourcePluginOptions } from './react-plugin';
import { sourceCopyOpenPlugin, type SourceCopyOpenPluginOptions } from './plugin';

export interface ViteSourceCopyOpenPluginOptions extends ReactSourcePluginOptions, SourceCopyOpenPluginOptions {}

export function viteSourceCopyOpenPlugin(options: ViteSourceCopyOpenPluginOptions = {}): PluginOption[] {
  return [openEditorReactPlugin(options), sourceCopyOpenPlugin(options)];
}
