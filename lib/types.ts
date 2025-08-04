import type { Properties as CSSProperties } from 'csstype'

export interface BuilderCSSProperties extends CSSProperties {
  // === PSEUDO-CLASSES (Based on MDN) ===
  
  // User Action Pseudo-classes
  ':hover'?: BuilderCSSProperties         // Element is hovered by user
  ':active'?: BuilderCSSProperties        // Element is being activated
  ':focus'?: BuilderCSSProperties         // Element has focus
  ':focus-visible'?: BuilderCSSProperties // Element should be visibly focused
  ':focus-within'?: BuilderCSSProperties  // Element or descendant has focus
  
  // Input Pseudo-classes
  ':enabled'?: BuilderCSSProperties       // Form element is enabled
  ':disabled'?: BuilderCSSProperties      // Form element is disabled
  ':checked'?: BuilderCSSProperties       // Checkbox/radio is checked
  ':unchecked'?: BuilderCSSProperties     // Checkbox/radio is unchecked
  ':indeterminate'?: BuilderCSSProperties // Checkbox is indeterminate
  ':default'?: BuilderCSSProperties       // Default form element
  ':valid'?: BuilderCSSProperties         // Form element with valid content
  ':invalid'?: BuilderCSSProperties       // Form element with invalid content
  ':in-range'?: BuilderCSSProperties      // Input value is in range
  ':out-of-range'?: BuilderCSSProperties  // Input value is out of range
  ':required'?: BuilderCSSProperties      // Required form element
  ':optional'?: BuilderCSSProperties      // Optional form element
  ':read-only'?: BuilderCSSProperties     // Read-only form element
  ':read-write'?: BuilderCSSProperties    // Editable form element
  ':placeholder-shown'?: BuilderCSSProperties // Input showing placeholder
  ':blank'?: BuilderCSSProperties         // Empty user input element
  ':user-invalid'?: BuilderCSSProperties  // User has interacted with invalid input
  
  // Location and Link Pseudo-classes
  ':any-link'?: BuilderCSSProperties      // Any link (visited or unvisited)
  ':link'?: BuilderCSSProperties          // Unvisited link
  ':visited'?: BuilderCSSProperties       // Visited link
  ':local-link'?: BuilderCSSProperties    // Link to current domain
  ':target'?: BuilderCSSProperties        // Target of current URL fragment
  ':target-within'?: BuilderCSSProperties // Element contains target
  ':scope'?: BuilderCSSProperties         // Scoping root element
  
  // Structural Pseudo-classes
  ':root'?: BuilderCSSProperties          // Root element (usually html)
  ':empty'?: BuilderCSSProperties         // Element with no children
  ':first-child'?: BuilderCSSProperties   // First child element
  ':first-of-type'?: BuilderCSSProperties // First of its element type
  ':last-child'?: BuilderCSSProperties    // Last child element
  ':last-of-type'?: BuilderCSSProperties  // Last of its element type
  ':only-child'?: BuilderCSSProperties    // Only child element
  ':only-of-type'?: BuilderCSSProperties  // Only element of its type
  
  // Tree Pseudo-classes
  ':dir(ltr)'?: BuilderCSSProperties      // Left-to-right directionality
  ':dir(rtl)'?: BuilderCSSProperties      // Right-to-left directionality
  ':lang(en)'?: BuilderCSSProperties      // English language
  
  // Display State Pseudo-classes
  ':fullscreen'?: BuilderCSSProperties    // Element in fullscreen mode
  ':picture-in-picture'?: BuilderCSSProperties // Element in picture-in-picture
  ':playing'?: BuilderCSSProperties       // Media element is playing
  ':paused'?: BuilderCSSProperties        // Media element is paused
  ':seeking'?: BuilderCSSProperties       // Media element is seeking
  ':buffering'?: BuilderCSSProperties     // Media element is buffering
  ':stalled'?: BuilderCSSProperties       // Media element is stalled
  ':muted'?: BuilderCSSProperties         // Media element is muted
  ':volume-locked'?: BuilderCSSProperties // Media volume is locked
  
  // === PSEUDO-ELEMENTS (Based on MDN) ===
  
  '::before'?: BuilderCSSProperties       // Insert content before element
  '::after'?: BuilderCSSProperties        // Insert content after element
  '::first-line'?: BuilderCSSProperties   // First line of element
  '::first-letter'?: BuilderCSSProperties // First letter of element
  '::selection'?: BuilderCSSProperties    // Selected text
  '::marker'?: BuilderCSSProperties       // List item marker
  '::placeholder'?: BuilderCSSProperties  // Input placeholder text
  '::file-selector-button'?: BuilderCSSProperties // File input button
  '::backdrop'?: BuilderCSSProperties     // Backdrop for top-layer elements
  '::spelling-error'?: BuilderCSSProperties // Misspelled text
  '::grammar-error'?: BuilderCSSProperties // Grammar error text
  
  // Media queries
  [key: `@media ${string}`]: BuilderCSSProperties | undefined
  
  // Container queries
  [key: `@container ${string}`]: BuilderCSSProperties | undefined
  
  // Supports queries
  [key: `@supports ${string}`]: BuilderCSSProperties | undefined
  
  // Keyframes animations
  [key: `@keyframes ${string}`]: Record<string, BuilderCSSProperties> | undefined
  
  // Nested selectors with &
  [key: `& ${string}`]: BuilderCSSProperties
  [key: `&:${string}`]: BuilderCSSProperties
  [key: `&::${string}`]: BuilderCSSProperties
  [key: `&[${string}]`]: BuilderCSSProperties
  [key: `&.${string}`]: BuilderCSSProperties
  [key: `&#${string}`]: BuilderCSSProperties
  
  // Attribute selectors
  [key: `[${string}]`]: BuilderCSSProperties
  
  // Child selectors
  [key: `> ${string}`]: BuilderCSSProperties
  [key: `+ ${string}`]: BuilderCSSProperties
  [key: `~ ${string}`]: BuilderCSSProperties
  
  // Custom nth-child and nth-of-type
  [key: `:nth-child(${string})`]: BuilderCSSProperties
  [key: `:nth-last-child(${string})`]: BuilderCSSProperties
  [key: `:nth-of-type(${string})`]: BuilderCSSProperties
  [key: `:nth-last-of-type(${string})`]: BuilderCSSProperties
  
  // Custom :not, :is, :where, :has
  [key: `:not(${string})`]: BuilderCSSProperties
  [key: `:is(${string})`]: BuilderCSSProperties
  [key: `:where(${string})`]: BuilderCSSProperties
  [key: `:has(${string})`]: BuilderCSSProperties
  
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

export interface BuilderCSSOptions {
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
    __BUILDER_CSS_STYLE_SHEET__?: CSSStyleSheet | HTMLStyleElement['sheet']
    __BUILDER_CSS_STYLES__?: Map<string, string>
  }
  
  var __BUILDER_CSS_STYLES__: Map<string, string> | undefined
}

export const BUILD_TIME = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production' && process.env?.BUILDER_CSS_BUILD_TIME === 'true'