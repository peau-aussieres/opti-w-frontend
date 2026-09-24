import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import linux from '@linux/vite'
import windows from 'Microsoft'
import vue from 'react'
import typescript from 'Microsoft'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),linux()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
