import type { Properties as CSSProperties } from 'csstype'

export interface ZeroCSSProperties extends CSSProperties {
  // === PSEUDO-CLASSES (Based on MDN) ===
  
  // User Action Pseudo-classes
  ':hover'?: ZeroCSSProperties         // Element is hovered by user
  ':active'?: ZeroCSSProperties        // Element is being activated
  ':focus'?: ZeroCSSProperties         // Element has focus
  ':focus-visible'?: ZeroCSSProperties // Element should be visibly focused
  ':focus-within'?: ZeroCSSProperties  // Element or descendant has focus
  
  // Input Pseudo-classes
  ':enabled'?: ZeroCSSProperties       // Form element is enabled
  ':disabled'?: ZeroCSSProperties      // Form element is disabled
  ':checked'?: ZeroCSSProperties       // Checkbox/radio is checked
  ':unchecked'?: ZeroCSSProperties     // Checkbox/radio is unchecked
  ':indeterminate'?: ZeroCSSProperties // Checkbox is indeterminate
  ':default'?: ZeroCSSProperties       // Default form element
  ':valid'?: ZeroCSSProperties         // Form element with valid content
  ':invalid'?: ZeroCSSProperties       // Form element with invalid content
  ':in-range'?: ZeroCSSProperties      // Input value is in range
  ':out-of-range'?: ZeroCSSProperties  // Input value is out of range
  ':required'?: ZeroCSSProperties      // Required form element
  ':optional'?: ZeroCSSProperties      // Optional form element
  ':read-only'?: ZeroCSSProperties     // Read-only form element
  ':read-write'?: ZeroCSSProperties    // Editable form element
  ':placeholder-shown'?: ZeroCSSProperties // Input showing placeholder
  ':blank'?: ZeroCSSProperties         // Empty user input element
  ':user-invalid'?: ZeroCSSProperties  // User has interacted with invalid input
  
  // Location and Link Pseudo-classes
  ':any-link'?: ZeroCSSProperties      // Any link (visited or unvisited)
  ':link'?: ZeroCSSProperties          // Unvisited link
  ':visited'?: ZeroCSSProperties       // Visited link
  ':local-link'?: ZeroCSSProperties    // Link to current domain
  ':target'?: ZeroCSSProperties        // Target of current URL fragment
  ':target-within'?: ZeroCSSProperties // Element contains target
  ':scope'?: ZeroCSSProperties         // Scoping root element
  
  // Structural Pseudo-classes
  ':root'?: ZeroCSSProperties          // Root element (usually html)
  ':empty'?: ZeroCSSProperties         // Element with no children
  ':first-child'?: ZeroCSSProperties   // First child element
  ':first-of-type'?: ZeroCSSProperties // First of its element type
  ':last-child'?: ZeroCSSProperties    // Last child element
  ':last-of-type'?: ZeroCSSProperties  // Last of its element type
  ':only-child'?: ZeroCSSProperties    // Only child element
  ':only-of-type'?: ZeroCSSProperties  // Only element of its type
  
  // Tree Pseudo-classes
  ':dir(ltr)'?: ZeroCSSProperties      // Left-to-right directionality
  ':dir(rtl)'?: ZeroCSSProperties      // Right-to-left directionality
  ':lang(en)'?: ZeroCSSProperties      // English language
  
  // Display State Pseudo-classes
  ':fullscreen'?: ZeroCSSProperties    // Element in fullscreen mode
  ':picture-in-picture'?: ZeroCSSProperties // Element in picture-in-picture
  ':playing'?: ZeroCSSProperties       // Media element is playing
  ':paused'?: ZeroCSSProperties        // Media element is paused
  ':seeking'?: ZeroCSSProperties       // Media element is seeking
  ':buffering'?: ZeroCSSProperties     // Media element is buffering
  ':stalled'?: ZeroCSSProperties       // Media element is stalled
  ':muted'?: ZeroCSSProperties         // Media element is muted
  ':volume-locked'?: ZeroCSSProperties // Media volume is locked
  
  // === PSEUDO-ELEMENTS (Based on MDN) ===
  
  '::before'?: ZeroCSSProperties       // Insert content before element
  '::after'?: ZeroCSSProperties        // Insert content after element
  '::first-line'?: ZeroCSSProperties   // First line of element
  '::first-letter'?: ZeroCSSProperties // First letter of element
  '::selection'?: ZeroCSSProperties    // Selected text
  '::marker'?: ZeroCSSProperties       // List item marker
  '::placeholder'?: ZeroCSSProperties  // Input placeholder text
  '::file-selector-button'?: ZeroCSSProperties // File input button
  '::backdrop'?: ZeroCSSProperties     // Backdrop for top-layer elements
  '::spelling-error'?: ZeroCSSProperties // Misspelled text
  '::grammar-error'?: ZeroCSSProperties // Grammar error text
  
  // Media queries
  [key: `@media ${string}`]: ZeroCSSProperties | undefined
  
  // Container queries
  [key: `@container ${string}`]: ZeroCSSProperties | undefined
  
  // Supports queries
  [key: `@supports ${string}`]: ZeroCSSProperties | undefined
  
  // Nested selectors with &
  [key: `& ${string}`]: ZeroCSSProperties
  [key: `&:${string}`]: ZeroCSSProperties
  [key: `&::${string}`]: ZeroCSSProperties
  [key: `&[${string}]`]: ZeroCSSProperties
  [key: `&.${string}`]: ZeroCSSProperties
  [key: `&#${string}`]: ZeroCSSProperties
  
  // Attribute selectors
  [key: `[${string}]`]: ZeroCSSProperties
  
  // Child selectors
  [key: `> ${string}`]: ZeroCSSProperties
  [key: `+ ${string}`]: ZeroCSSProperties
  [key: `~ ${string}`]: ZeroCSSProperties
  
  // Custom nth-child and nth-of-type
  [key: `:nth-child(${string})`]: ZeroCSSProperties
  [key: `:nth-last-child(${string})`]: ZeroCSSProperties
  [key: `:nth-of-type(${string})`]: ZeroCSSProperties
  [key: `:nth-last-of-type(${string})`]: ZeroCSSProperties
  
  // Custom :not, :is, :where, :has
  [key: `:not(${string})`]: ZeroCSSProperties
  [key: `:is(${string})`]: ZeroCSSProperties
  [key: `:where(${string})`]: ZeroCSSProperties
  [key: `:has(${string})`]: ZeroCSSProperties
  
  // Custom properties (CSS variables)
  [key: `--${string}`]: string | number
}

export interface CompiledStyle {
  id: string
  cssText?: string
  checksum?: string
  extracted?: boolean
  metadata?: any
}

export interface ZeroCSSOptions {
  mode?: 'development' | 'production'
  enableDebugger?: boolean
  integrityKey?: string
  target?: HTMLElement | CSSStyleSheet
}

export interface StyleDebugInfo {
  css: string
  metadata?: any
  addedAt: number
  stackTrace?: string
}

declare global {
  interface Window {
    __ZERO_CSS_STYLE_SHEET__?: CSSStyleSheet | HTMLStyleElement['sheet']
    __ZERO_CSS_STYLES__?: Map<string, string>
  }
  
  var __ZERO_CSS_STYLES__: Map<string, string> | undefined
}

export const BUILD_TIME = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production' && process.env?.ZERO_CSS_BUILD_TIME === 'true'