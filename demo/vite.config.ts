import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import openEditorReact from '@open-editor/react/vite';
import openEditorVite from '@open-editor/vite';

const rootDir = fileURLToPath(new URL('./', import.meta.url));
const demoPort = 41731;

export default defineConfig({
  server: {
    port: demoPort,
    strictPort: true,
  },
  plugins: [
    openEditorReact({ rootDir }),
    openEditorVite({ rootDir, port: String(demoPort) }),
    react(),
  ],
});
