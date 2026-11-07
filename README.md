# «DUDA RAZONABLE»
### El robo en la galería · Laboratorio interactivo de probabilidad y estadística

Aplicación web educativa para la enseñanza universitaria de:
- **Inclusión - Exclusión** (adición de probabilidades y espacio muestral finito).
- **Regla de la multiplicación e Independencia estocástica**.
- **Probabilidad condicional y Teorema de Bayes** (análisis de la falacia del fiscal y valores esperados).
- **Enfoque frecuencial y Ley de los Grandes Números** (simulación empírica con reemplazo).

---

## 🚀 Despliegue en GitHub Pages

La aplicación ya está configurada con rutas relativas (`base: './'` en `vite.config.ts`) para funcionar tanto en dominios raíz como en subdirectorios de repositorios de GitHub (`https://<usuario>.github.io/<repositorio>/`).

Podés desplegarla de cualquiera de estas dos formas:

### Opción 1: Despliegue automático con GitHub Actions (Recomendado)

El proyecto incluye el flujo de trabajo en `.github/workflows/deploy.yml`.

1. Subí tu código a tu repositorio de GitHub en la rama `main`:
   ```bash
   git add .
   git commit -m "feat: Duda Razonable con soporte para GitHub Pages"
   git push origin main
   ```
2. En GitHub, abrí tu repositorio y andá a:
   **Settings (Configuración)** → **Pages** (en el menú lateral izquierdo).
3. En la sección **Build and deployment** > **Source**, seleccioná:
   **GitHub Actions**.
4. Cada vez que hagas un `git push` a `main`, GitHub compilará la aplicación y la publicará automáticamente en la URL indicada.

---

### Opción 2: Despliegue manual con `npm run deploy` (`gh-pages`)

También podés desplegar directamente desde tu terminal local a la rama `gh-pages`:

1. Verificá que en tu `package.json` esté configurado el campo `homepage` (opcional, pero útil si querés documentar la URL):
   ```json
   "homepage": "https://<tu-usuario>.github.io/<tu-repositorio>"
   ```
2. Ejecutá en tu terminal:
   ```bash
   npm run deploy
   ```
   Esto compilará el proyecto (`vite build` en la carpeta `dist`) y subirá los archivos compilados a la rama `gh-pages`.
3. En GitHub (**Settings** → **Pages**), verificá que la fuente esté configurada en **Deploy from a branch** con la rama `gh-pages` y carpeta `/ (root)`.

---

## 💻 Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar pruebas unitarias de probabilidad matemática
npx tsx --test src/utils/probabilityMath.test.ts

# Compilar para producción
npm run build

# Probar compilación localmente
npm run preview
```

---

## ⚖️ Nota ética y metodológica

Simulación educativa con datos ficticios. Los resultados describen eventos del modelo matemático, no culpabilidad ni evidencia real sobre tribunales o personas.
