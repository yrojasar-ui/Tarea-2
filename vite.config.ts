import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ mode }) => {
  // En GitHub Actions, GITHUB_REPOSITORY es 'usuario/repo' (ej. 'yoerojas03/Tarea-2')
  // Para GitHub Pages en subdirectorio, el base debe ser '/repo/'
  let base = './';
  if (process.env.GITHUB_REPOSITORY) {
    base = `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`;
  } else if (mode === 'production' && !process.env.AI_STUDIO) {
    base = '/Tarea-2/';
  }

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname ?? '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
