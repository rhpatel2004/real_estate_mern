import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // <--- IMPORTANT: All requests starting with /api...
        target: 'http://localhost:6000', // ...will be forwarded to port 6000
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Keep the /api prefix
      },
      '/uploads': { // Add this for your image uploads
          target: 'http://localhost:6000',
          changeOrigin: true,
      }
    }
  }
})
