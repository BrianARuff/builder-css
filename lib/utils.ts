import type { ZeroCSSProperties } from './types'

export function kebabCase(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function hash(str: string): string {
  let hash = 0
  if (str.length === 0) return hash.toString(36)
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36)
}

export function computeChecksum(cssText: string): string {
  return hash(cssText)
}

export function objectToCSSString(styles: ZeroCSSProperties, selector = ''): string {
  let css = ''
  const nestedRules: string[] = []
  
  for (const [prop, value] of Object.entries(styles)) {
    if (typeof value === 'object' && value !== null) {
      // Handle nested rules (pseudo-selectors, media queries, nested selectors)
      let nestedSelector = prop
      
      if (prop.startsWith(':') || prop.startsWith('::')) {
        // Pseudo-selectors and pseudo-elements
        nestedSelector = `${selector}${prop}`
      } else if (prop.startsWith('@media')) {
        // Media queries
        nestedSelector = prop
      } else if (prop.startsWith('&')) {
        // Nested selectors
        nestedSelector = prop.replace('&', selector)
      }
      
      const nestedCSS = objectToCSSString(value as ZeroCSSProperties, nestedSelector)
      
      if (prop.startsWith('@media')) {
        nestedRules.push(`${prop} { ${nestedSelector ? `${nestedSelector} { ${nestedCSS} }` : nestedCSS} }`)
      } else {
        nestedRules.push(`${nestedSelector} { ${nestedCSS} }`)
      }
    } else {
      // Regular CSS property
      const cssProperty = prop.startsWith('--') ? prop : kebabCase(prop)
      css += `${cssProperty}: ${value}; `
    }
  }
  
  return css + nestedRules.join(' ')
}

// New function to generate complete CSS with class name
export function generateCompleteCSS(styles: ZeroCSSProperties, className: string): string {
  // Check if there are nested rules (pseudo-selectors, media queries, etc.)
  const hasNestedRules = Object.keys(styles).some(key => 
    typeof (styles as any)[key] === 'object' && (styles as any)[key] !== null
  )
  
  if (hasNestedRules) {
    // Need to generate CSS with proper class name context for nested rules
    let css = ''
    const nestedRules: string[] = []
    
    for (const [prop, value] of Object.entries(styles)) {
      if (typeof value === 'object' && value !== null) {
        // Handle nested rules (pseudo-selectors, media queries, nested selectors)
        let nestedSelector = prop
        
        if (prop.startsWith(':') || prop.startsWith('::')) {
          // Pseudo-selectors and pseudo-elements
          nestedSelector = `.${className}${prop}`
        } else if (prop.startsWith('@media') || prop.startsWith('@container') || prop.startsWith('@supports')) {
          // At-rule queries (media, container, supports)
          nestedSelector = prop
        } else if (prop.startsWith('&')) {
          // Nested selectors with & (e.g., &:hover, &.active, &#id, &[attr])
          nestedSelector = prop.replace('&', `.${className}`)
        } else if (prop.startsWith('[') && prop.endsWith(']')) {
          // Attribute selectors (e.g., [disabled], [type="text"]) 
          nestedSelector = `.${className}${prop}`
        } else if (prop.startsWith('>') || prop.startsWith('+') || prop.startsWith('~')) {
          // Child selectors (e.g., > span, + div, ~ p)
          nestedSelector = `.${className} ${prop}`
        }
        
        const nestedCSS = objectToCSSString(value as ZeroCSSProperties)
        
        if (prop.startsWith('@media') || prop.startsWith('@container') || prop.startsWith('@supports')) {
          // Wrap the class selector inside the at-rule
          nestedRules.push(`${prop} { .${className} { ${nestedCSS} } }`)
        } else {
          nestedRules.push(`${nestedSelector} { ${nestedCSS} }`)
        }
      } else {
        // Regular CSS property
        const cssProperty = prop.startsWith('--') ? prop : kebabCase(prop)
        css += `${cssProperty}: ${value}; `
      }
    }
    
    // Combine base styles and nested rules
    let result = ''
    if (css) {
      result += `.${className} { ${css} }`
    }
    if (nestedRules.length > 0) {
      result += ' ' + nestedRules.join(' ')
    }
    return result
  } else {
    // Simple CSS without nested rules
    const cssString = objectToCSSString(styles)
    return `.${className} { ${cssString} }`
  }
}

export function interpolate(strings: TemplateStringsArray, values: any[]): string {
  let result = strings[0]
  
  for (let i = 1; i < strings.length; i++) {
    result += String(values[i - 1]) + strings[i]
  }
  
  return result
}

export function generateClassName(cssText: string): string {
  return `zc-${hash(cssText)}`
}

export function isServer(): boolean {
  return typeof window === 'undefined'
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function supportsCSSStyleSheet(): boolean {
  return isBrowser() && 'CSSStyleSheet' in window && 'adoptedStyleSheets' in document
}