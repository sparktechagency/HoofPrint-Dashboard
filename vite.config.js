import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'exit-after-build',
      buildEnd() {
        // Exit immediately after build ends
        if (process.env.npm_lifecycle_event === 'build') {
          setTimeout(() => process.exit(0), 0);
        }
      }
    }
  ],
  server: {
    watch: {
      usePolling: false,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into separate chunks
          if (id.includes('node_modules')) {
            // Put React and related in one chunk
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Put Ant Design in one chunk
            if (id.includes('antd') || id.includes('@ant-design')) {
              return 'antd-vendor';
            }
            // Put Jodit (large editor) in its own chunk
            if (id.includes('jodit')) {
              return 'jodit-vendor';
            }
            // Everything else from node_modules
            return 'vendor';
          }
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Use esbuild for minification (default, faster than terser)
    minify: 'esbuild',
    // No sourcemaps in production
    sourcemap: false,
  },
})