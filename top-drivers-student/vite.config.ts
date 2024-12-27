import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/images': {
        target: 'https://escuelademanejotopdrivers.com:8080',
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/images/, ''),
      },
    },
  },
})
