import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ mode }) => {
  // Determinación de la ruta pública base (base path) para despliegues:
  // - En GitHub Actions, GITHUB_REPOSITORY tiene el formato 'usuario/nombre-repositorio'.
  //   Se extrae el nombre para generar la ruta '/nombre-repositorio/'.
  // - Se permite sobrescribir mediante la variable de entorno VITE_BASE_PATH.
  // - Si no se detecta entorno de GitHub Actions ni variable, se usa './' (rutas relativas)
  //   para evitar rutas absolutas fijas desde la raíz que provoquen pantallas en blanco.
  let base = './';
  if (process.env.VITE_BASE_PATH) {
    base = process.env.VITE_BASE_PATH.endsWith('/')
      ? process.env.VITE_BASE_PATH
      : `${process.env.VITE_BASE_PATH}/`;
  } else if (process.env.GITHUB_REPOSITORY) {
    const repoPart = process.env.GITHUB_REPOSITORY.split('/')[1]?.trim();
    if (repoPart) {
      base = `/${repoPart}/`;
    }
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
