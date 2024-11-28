import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: {
    host: command === 'serve' ? '0.0.0.0' : 'localhost'
  }
}))