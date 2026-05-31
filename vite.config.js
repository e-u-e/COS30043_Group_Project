import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/cos30043/s104454546/project/',
  plugins: [vue()],
  server: {
    proxy: {
      '/resources': {
        target: 'http://localhost/COS30043_Group_Project',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/resources/, '/resources')
      }
    }
  }
})