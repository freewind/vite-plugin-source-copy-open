import { setupClient } from './client/src';
import type { Options as ClientOptions } from './client/src/options';
import { ServerApis } from './shared/src/serverApis';

export interface SourceLocation {
  file: string;
  line: number;
  column?: number;
  label?: string;
}

export interface SourceLocationFormatOptions {
  includeLabel?: boolean;
}

function normalizeLocation(location: SourceLocation) {
  return {
    ...location,
    column: location.column ?? 1,
  };
}

export function formatSourceLocation(
  location: SourceLocation,
  options: SourceLocationFormatOptions = {},
) {
  const resolved = normalizeLocation(location);
  const formattedLocation = `${resolved.file}:${resolved.line}:${resolved.column}`;
  const label = resolved.label?.trim();

  if (options.includeLabel && label) {
    return `${label} ${formattedLocation}`;
  }

  return formattedLocation;
}

export async function copySourceLocation(
  location: SourceLocation,
  options: SourceLocationFormatOptions = {},
) {
  await navigator.clipboard.writeText(formatSourceLocation(location, options));
}

export function buildOpenInEditorUrl(location: SourceLocation, options: { baseUrl?: string; port?: string } = {}) {
  const resolved = normalizeLocation(location);
  const baseUrl = options.baseUrl ?? (typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  const url = new URL(ServerApis.OPEN_EDITOR, baseUrl);

  if (options.port) {
    url.port = options.port;
  }

  url.searchParams.set('f', resolved.file);
  url.searchParams.set('l', String(resolved.line));
  url.searchParams.set('c', String(resolved.column));

  return url.toString();
}

export async function openInEditor(location: SourceLocation, options: { baseUrl?: string; port?: string; fetch?: typeof fetch } = {}) {
  const fetchImpl = options.fetch ?? fetch;
  const response = await fetchImpl(buildOpenInEditorUrl(location, options));

  if (!response.ok) {
    throw new Error((await response.text()) || `Failed with status ${response.status}`);
  }
}

export function setupOpenEditorClient(options: ClientOptions) {
  setupClient(options);
}
