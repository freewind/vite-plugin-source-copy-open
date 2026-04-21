import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sourceCopyOpen, { openEditorReactPlugin } from 'vite-plugin-source-copy-open';

const rootDir = fileURLToPath(new URL('./', import.meta.url));
const demoPort = 41731;

export default defineConfig({
  server: {
    port: demoPort,
    strictPort: true,
  },
  plugins: [
    openEditorReactPlugin({ rootDir }),
    sourceCopyOpen({ rootDir, port: String(demoPort) }),
    react(),
  ],
});
