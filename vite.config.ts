import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base relative : le site fonctionne sur https://<user>.github.io/<n'importe-quel-repo>/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // Le contenu pédagogique (10 modules, 93 fiches d’audit, cas pratiques) est volontairement embarqué :
  // la recherche Ctrl+K et le calcul de l’XP en ont besoin dès le chargement (environ 280 Ko gzippés).
  build: { chunkSizeWarningLimit: 1200 },
})
