import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default ({
  base: '/home-loan-tracker/',
  plugins: [react()],
});
