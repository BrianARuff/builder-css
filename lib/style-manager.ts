import type { CompiledStyle, ZeroCSSOptions, StyleDebugInfo } from './types'
import { computeChecksum, isServer, isBrowser, supportsCSSStyleSheet } from './utils'

export class UniversalStyleManager {
  private styles = new Map<string, CompiledStyle>()
  private injectedStyles = new Set<string>()
  private debugStyles = new Map<string, StyleDebugInfo>()
  private styleSheet: CSSStyleSheet | null = null
  private styleElement: HTMLStyleElement | null = null

  constructor(private options: ZeroCSSOptions = {}) {
    if (isBrowser()) {
      this.initializeBrowserTarget()
    }
  }

  private initializeBrowserTarget() {
    if (this.options.target instanceof CSSStyleSheet) {
      this.styleSheet = this.options.target
    } else if (this.options.target instanceof HTMLElement) {
      this.styleElement = this.createStyleElement(this.options.target)
    } else if (supportsCSSStyleSheet()) {
      // Use CSSStyleSheet API when available
      this.styleSheet = new CSSStyleSheet()
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, this.styleSheet]
    } else {
      // Fallback to style element
      this.styleElement = this.createStyleElement()
    }
  }

  private createStyleElement(parent?: HTMLElement): HTMLStyleElement {
    const styleElement = document.createElement('style')
    styleElement.setAttribute('data-zero-css', 'true')
    ;(parent || document.head).appendChild(styleElement)
    return styleElement
  }

  addStyle(id: string, cssText: string, metadata?: any): string {
    // Check if we already have this style
    if (this.injectedStyles.has(id)) {
      return id
    }

    // Store debug info in development
    if (this.options.mode === 'development' && this.options.enableDebugger) {
      this.debugStyles.set(id, {
        css: cssText,
        metadata,
        addedAt: Date.now(),
        stackTrace: new Error().stack
      })
    }

    const compiledStyle: CompiledStyle = {
      id,
      cssText,
      checksum: computeChecksum(cssText),
      metadata
    }

    this.styles.set(id, compiledStyle)

    if (isServer()) {
      this.collectForSSR(id, cssText)
    } else {
      this.injectStyle(id, cssText)
    }

    this.injectedStyles.add(id)
    return id
  }

  private injectStyle(id: string, cssText: string) {
    try {
      if (this.styleSheet) {
        // Use CSSStyleSheet API - need to split multiple rules
        const rules = this.parseCSS(cssText)
        for (const rule of rules) {
          this.styleSheet.insertRule(rule, this.styleSheet.cssRules.length)
        }
      } else if (this.styleElement) {
        // Use style element - can handle multiple rules at once
        this.styleElement.textContent += cssText + '\n'
      } else {
        // Last resort: create new style element
        const styleElement = document.createElement('style')
        styleElement.setAttribute('data-zero-css-id', id)
        styleElement.textContent = cssText
        document.head.appendChild(styleElement)
      }
    } catch (error) {
      console.warn(`[zero-css] Failed to inject style ${id}:`, error)
    }
  }

  private parseCSS(cssText: string): string[] {
    // Simple but more reliable CSS rule splitting
    const rules: string[] = []
    
    // Use regex to match complete CSS rules
    // Pattern: selector { declarations }
    const rulePattern = /([^{}]+)\s*\{([^{}]*)\}/g
    let match
    
    while ((match = rulePattern.exec(cssText)) !== null) {
      const selector = match[1].trim()
      const declarations = match[2].trim()
      
      if (selector && declarations) {
        rules.push(`${selector} { ${declarations} }`)
      }
    }
    
    // If no rules were found with regex (fallback), return the original as single rule
    if (rules.length === 0 && cssText.trim()) {
      rules.push(cssText.trim())
    }
    
    return rules.filter(rule => {
      const trimmed = rule.trim()
      // Filter out invalid rules (empty, just punctuation, etc.)
      return trimmed.length > 3 && trimmed.includes('{') && trimmed.includes('}')
    })
  }

  private collectForSSR(id: string, cssText: string) {
    if (typeof globalThis !== 'undefined') {
      ;(globalThis as any).__ZERO_CSS_STYLES__ = (globalThis as any).__ZERO_CSS_STYLES__ || new Map()
      ;(globalThis as any).__ZERO_CSS_STYLES__.set(id, cssText)
    }
  }

  getStyle(id: string): CompiledStyle | undefined {
    return this.styles.get(id)
  }

  getDebugInfo(id?: string): StyleDebugInfo | Array<[string, StyleDebugInfo]> | null {
    if (this.options.mode !== 'development') return null
    
    if (id) {
      return this.debugStyles.get(id) || null
    }
    
    return Array.from(this.debugStyles.entries())
  }

  getAllStyles(): Map<string, CompiledStyle> {
    return new Map(this.styles)
  }

  // New method to view all injected CSS
  getAllInjectedCSS(): string {
    if (this.styleElement) {
      return this.styleElement.textContent || ''
    } else if (this.styleSheet) {
      const rules = Array.from(this.styleSheet.cssRules)
      return rules.map(rule => rule.cssText).join('\n')
    }
    return ''
  }

  // Get CSS for a specific style ID
  getStyleCSS(styleId: string): string | null {
    const style = this.styles.get(styleId)
    return style ? (style.cssText || null) : null
  }

  clear() {
    this.styles.clear()
    this.injectedStyles.clear()
    this.debugStyles.clear()
    
    if (this.styleSheet) {
      // Clear CSSStyleSheet
      while (this.styleSheet.cssRules.length > 0) {
        this.styleSheet.deleteRule(0)
      }
    } else if (this.styleElement) {
      // Clear style element
      this.styleElement.textContent = ''
    }
  }

  // Static method for SSR
  static getSSRStyles(): string {
    if (typeof globalThis === 'undefined' || !(globalThis as any).__ZERO_CSS_STYLES__) {
      return ''
    }

    const styles = Array.from((globalThis as any).__ZERO_CSS_STYLES__.entries()) as [string, string][]
    return styles
      .map(([, cssText]) => cssText) // cssText is already complete CSS rules
      .join('\n')
  }

  static clearSSRStyles() {
    if (typeof globalThis !== 'undefined') {
      ;(globalThis as any).__ZERO_CSS_STYLES__?.clear()
    }
  }
}