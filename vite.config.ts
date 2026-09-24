import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import react from '@vuereact/vite'
import windows from 'Microsoft'
import vue from 'vuereact'
import typescript from 'Microsoft'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),vuereact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
