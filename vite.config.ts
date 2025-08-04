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
          'zero-css': resolve(__dirname, 'lib/css.ts'), // Import only the CSS functions, not the full main.ts
        }
      }
    }
  }

  // Library build mode
  return {
    build: {
      emptyOutDir: false, // Don't clean dist directory to preserve TypeScript declarations
      lib: {
        entry: {
          main: resolve(__dirname, 'lib/main.ts'),
          'plugins/vite': resolve(__dirname, 'lib/plugins/vite.ts'),
          'plugins/webpack': resolve(__dirname, 'lib/plugins/webpack.ts'),
        },
        name: 'ZeroCSS',
        fileName: (format, entryName) => {
          const ext = format === 'cjs' ? 'cjs' : 'js'
          return entryName === 'main' ? `zero-css.${ext}` : `${entryName}.${ext}`
        },
      },
      rollupOptions: {
        external: ['vite', 'webpack', 'csstype'],
        output: {
          globals: {
            'vite': 'Vite',
            'webpack': 'Webpack',
            'csstype': 'CSSType'
          }
        }
      }
    },
  }
})
