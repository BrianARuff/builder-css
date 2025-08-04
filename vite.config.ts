import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Test app mode - React development
  if (mode === 'test') {
    return {
      plugins: [react()],
      root: '.',
      build: {
        outDir: 'dist-test'
      },
      resolve: {
        alias: {
          'builder-css': resolve(__dirname, 'lib/css.ts'), // Import only the CSS functions, not the full main.ts
        }
      }
    }
  }

  // Library build mode
  return {
    build: {
      emptyOutDir: true, // Clean dist directory
      lib: {
        entry: resolve(__dirname, 'lib/main.ts'),
        name: 'BuilderCSS',
        formats: ['es', 'cjs'],
        fileName: (format) => {
          const ext = format === 'cjs' ? 'cjs' : 'js'
          return `builder-css.${ext}`
        },
      },
      rollupOptions: {
        external: ['csstype'],
        output: {
          globals: {
            'csstype': 'CSSType'
          }
        }
      }
    },
  }
})
