import { normalizePath } from '../../../shared/src';
import { getOptions } from '../options';

function isAbsolutePath(path: string) {
  return path.startsWith('/') || /^[A-Za-z]:\//.test(path);
}

function isWindowsPath(path: string) {
  return /^[A-Za-z]:\//.test(path);
}

export function getDisplaySourceFile(file: string) {
  const normalizedFile = normalizePath(file);
  if (!isAbsolutePath(normalizedFile)) {
    return normalizedFile;
  }

  const normalizedRoot = normalizePath(getOptions().rootDir);
  const comparableFile = isWindowsPath(normalizedFile) ? normalizedFile.toLowerCase() : normalizedFile;
  const comparableRoot = isWindowsPath(normalizedRoot) ? normalizedRoot.toLowerCase() : normalizedRoot;

  if (comparableFile === comparableRoot) {
    return '.';
  }

  const rootPrefix = `${comparableRoot}/`;
  if (comparableFile.startsWith(rootPrefix)) {
    return normalizedFile.slice(normalizedRoot.length + 1);
  }

  return normalizedFile;
}

export function formatDisplaySourceLocation(location: { file: string; line: number; column?: number }) {
  return `${getDisplaySourceFile(location.file)}:${location.line}:${location.column ?? 1}`;
}
