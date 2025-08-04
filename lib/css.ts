import type { ZeroCSSProperties, ZeroCSSOptions } from './types'
import { UniversalStyleManager } from './style-manager'
import { generateCompleteCSS, interpolate, hash, generateClassName } from './utils'

let globalStyleManager: UniversalStyleManager | null = null

export function initializeZeroCss(options: ZeroCSSOptions = {}) {
  const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development'
  globalStyleManager = new UniversalStyleManager({
    mode: isDev ? 'development' : 'production',
    enableDebugger: isDev,
    ...options
  })
  
  // Store global reference for legacy compatibility
  if (typeof window !== 'undefined') {
    window.__ZERO_CSS_STYLE_SHEET__ = options.target as any
    
    // Enable HMR style clearing in development
    if (isDev && (globalThis as any).import?.meta?.hot) {
      ;(globalThis as any).import.meta.hot.on('vite:beforeUpdate', () => {
        console.log('%c[Zero-CSS] HMR: Clearing styles before update', 'color: #ff6600;')
        globalStyleManager?.clear()
      })
    }
    
    // Add global console methods for easy CSS inspection
    ;(window as any).__zeroCssViewStyles = () => {
      const css = globalStyleManager?.getAllInjectedCSS() || 'No styles found'
      console.log('%c[Zero-CSS] Generated CSS:', 'color: #0066cc; font-weight: bold;')
      console.log(css)
      return css
    }
    
    ;(window as any).__zeroCssViewStylesTable = () => {
      const styles = globalStyleManager?.getAllStyles()
      if (!styles || styles.size === 0) {
        console.log('%c[Zero-CSS] No styles found', 'color: #ff6600;')
        return
      }
      
      const tableData = Array.from(styles.entries()).map(([id, style]) => ({
        ID: id,
        'Class Name': `zc-${id}`,
        'CSS Text': (style.cssText || '').substring(0, 100) + ((style.cssText || '').length > 100 ? '...' : ''),
        'Full CSS': style.cssText || ''
      }))
      
      console.log('%c[Zero-CSS] Styles Table:', 'color: #0066cc; font-weight: bold;')
      console.table(tableData)
      return tableData
    }
    
    ;(window as any).__zeroCssHelp = () => {
      console.log('%c[Zero-CSS] Console Commands:', 'color: #0066cc; font-weight: bold; font-size: 14px;')
      console.log('%c__zeroCssViewStyles()', 'color: #009900; font-weight: bold;', '- View all generated CSS')
      console.log('%c__zeroCssViewStylesTable()', 'color: #009900; font-weight: bold;', '- View styles in a table format')
      console.log('%c__zeroCssHelp()', 'color: #009900; font-weight: bold;', '- Show this help')
    }
    
    // Show help on first load in development
    if (isDev) {
      setTimeout(() => {
        console.log('%c[Zero-CSS] Ready! Type __zeroCssHelp() in console to see available commands.', 'color: #0066cc;')
      }, 1000)
    }
  }
  
  return globalStyleManager
}

function getStyleManager(): UniversalStyleManager {
  if (!globalStyleManager) {
    globalStyleManager = initializeZeroCss()
  }
  return globalStyleManager
}

// Main CSS function with dual API support
export function css(styles: ZeroCSSProperties): string
export function css(strings: TemplateStringsArray, ...values: any[]): string
export function css(
  stylesOrStrings: ZeroCSSProperties | TemplateStringsArray, 
  ...values: any[]
): string {
  let cssText: string
  let styleId: string
  let className: string

  if (Array.isArray(stylesOrStrings) && 'raw' in stylesOrStrings) {
    // Template literal path
    const templateCSS = interpolate(stylesOrStrings as TemplateStringsArray, values)
    styleId = hash(templateCSS)
    className = generateClassName(templateCSS)
    cssText = `.${className} { ${templateCSS} }`
  } else {
    // Object path with full TypeScript support
    const styleObject = stylesOrStrings as ZeroCSSProperties
    const objectStr = JSON.stringify(styleObject)
    styleId = hash(objectStr)
    className = generateClassName(objectStr)
    cssText = generateCompleteCSS(styleObject, className)
    
    // Debug logging in development
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      console.log(`%c[Zero-CSS] Generating CSS:`, 'color: #666;', {
        styleId,
        className,
        styleObject,
        cssText: cssText.substring(0, 100) + (cssText.length > 100 ? '...' : '')
      })
    }
  }

  // In build-time mode, return the style ID for extraction
  if (typeof process !== 'undefined' && process.env?.ZERO_CSS_BUILD_TIME === 'true') {
    return styleId
  }

  // Runtime: add style and return class name
  const styleManager = getStyleManager()
  styleManager.addStyle(styleId, cssText)
  
  return className
}

// Utility function for applying styles directly
export function applyStyles(cssText: string, metadata?: any): string {
  const styleId = hash(cssText)
  const styleManager = getStyleManager()
  styleManager.addStyle(styleId, cssText, metadata)
  return generateClassName(cssText)
}

// Utility function to create styles with explicit class names
export function styled(cssStyles: ZeroCSSProperties): string {
  return css(cssStyles)
}

// Debug utilities (development only)
export function getDebugInfo(styleId?: string) {
  if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'development') {
    console.warn('[zero-css] Debug info only available in development mode')
    return null
  }
  
  return getStyleManager().getDebugInfo(styleId)
}

export function getAllStyles() {
  return getStyleManager().getAllStyles()
}

export function clearStyles() {
  getStyleManager().clear()
}

// SSR utilities
export { UniversalStyleManager } from './style-manager'

export function getSSRStyles(): string {
  return UniversalStyleManager.getSSRStyles()
}

export function clearSSRStyles() {
  UniversalStyleManager.clearSSRStyles()
}