import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/parcial-omar/', // Reemplaza con el nombre de tu repositorio
  plugins: [react()],
});