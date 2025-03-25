import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Use `true` to bind to all network interfaces, avoids localhost issues
    port: 5173,
    strictPort: true, // Prevents Vite from switching to another port
    hmr: {
      clientPort: 5173, // Explicit WebSocket port
      protocol: 'ws',
      host: 'localhost' // Explicitly set the WebSocket host
    }
  }
})
