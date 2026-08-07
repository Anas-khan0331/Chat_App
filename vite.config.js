import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      '5173-ip72nc38z7bg5iz3hvsns.e2b.app',
      '.e2b.app'
    ]
  }
})
