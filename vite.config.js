import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/home-loan-tracker/',
  plugins: [react()],
});
