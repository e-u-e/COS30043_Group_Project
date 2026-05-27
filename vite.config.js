import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // forward requests to Apache/XAMPP where PHP files can be served
      '/resources': {
        target: 'http://localhost/COS30043_Group_Project',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/resources/, '/resources')
      }
    }
  }
})
