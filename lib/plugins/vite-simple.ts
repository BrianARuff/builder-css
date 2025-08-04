import type { Plugin } from 'vite'

interface ZeroCSSPluginOptions {
  outputFile?: string
  minify?: boolean
}

export function zeroCSSPlugin(_options: ZeroCSSPluginOptions = {}): Plugin {
  return {
    name: 'zero-css-simple',
    
    config() {
      // Ensure zero-css is not pre-bundled by Vite
      return {
        optimizeDeps: {
          exclude: ['zero-css']
        }
      }
    },
    
    configResolved(config) {
      // Set build-time environment variable
      if (config.command === 'build') {
        process.env.ZERO_CSS_BUILD_TIME = 'true'
      }
    },
    
    transform(code: string, id: string) {
      // Only process JS/TS files
      if (!/\.(js|ts|jsx|tsx)$/.test(id)) return null
      
      // Skip node_modules
      if (id.includes('node_modules')) return null
      
      // Set environment variables at build time
      if (code.includes('process.env.ZERO_CSS_BUILD_TIME')) {
        return {
          code: code.replace(
            /process\.env\.ZERO_CSS_BUILD_TIME/g,
            JSON.stringify(process.env.ZERO_CSS_BUILD_TIME || 'false')
          ),
          map: null
        }
      }
      
      return null
    }
  }
}