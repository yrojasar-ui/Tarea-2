import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ mode }) => {
  // Determinación de la ruta pública base (base path) para GitHub Pages:
  // 1. Si se define VITE_BASE_PATH, tiene prioridad.
  // 2. Si se ejecuta en GitHub Actions, GITHUB_REPOSITORY es 'usuario/nombre-repositorio'.
  // 3. En producción fuera de AI Studio, por defecto es '/Tarea-2/' para coincidir con el repositorio de GitHub Pages.
  // 4. En desarrollo (dev server), se usa '/'.
  let base = '/';
  if (process.env.VITE_BASE_PATH) {
    const custom = process.env.VITE_BASE_PATH.trim();
    base = custom.endsWith('/') ? custom : `${custom}/`;
  } else if (process.env.GITHUB_REPOSITORY) {
    const repoPart = process.env.GITHUB_REPOSITORY.split('/')[1]?.trim();
    if (repoPart) {
      base = `/${repoPart}/`;
    }
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
