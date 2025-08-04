# Zero CSS

A TypeScript-first CSS-in-JS library with zero runtime cost and full SSR support.

## Features

- 🎯 **Zero Runtime**: CSS extracted at build time for optimal performance
- 🔒 **Type Safe**: Full TypeScript support with autocomplete using `csstype`
- 🏗️ **Universal**: Works with React, Vue, Angular, and Vanilla JS
- 🚀 **SSR Ready**: Built-in server-side rendering support
- 🎨 **Dual API**: Object notation (with autocomplete) + template literals
- 🔧 **Framework Agnostic**: Vite and Webpack plugins included

## Installation

```bash
npm install zero-css
```

## Quick Start

### Object Notation (Recommended)

```typescript
import { css } from 'zero-css'

const buttonStyles = css({
  backgroundColor: 'blue',
  padding: '12px 24px',
  borderRadius: '4px',
  ':hover': {
    backgroundColor: 'darkblue'
  },
  '@media (max-width: 768px)': {
    padding: '8px 16px'
  }
})

// Use the generated class name
document.getElementById('button').className = buttonStyles
```

### Template Literals

```typescript
import { css } from 'zero-css'

const cardStyles = css`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
`
```

## Build Setup

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { zeroCSSPlugin } from 'zero-css/plugins/vite'

export default defineConfig({
  plugins: [
    zeroCSSPlugin({
      outputFile: 'styles.css',
      minify: true
    })
  ]
})
```

### Webpack

```typescript
// webpack.config.js
import { ZeroCSSWebpackPlugin } from 'zero-css/plugins/webpack'

export default {
  plugins: [
    new ZeroCSSWebpackPlugin({
      outputFile: 'styles.css',
      minify: true
    })
  ]
}
```

## Advanced Usage

### Initialization with Custom Options

```typescript
import { initializeZeroCss } from 'zero-css'

initializeZeroCss({
  mode: 'development',
  enableDebugger: true,
  target: document.getElementById('style-container')
})
```

### SSR Support

```typescript
import { getSSRStyles, clearSSRStyles } from 'zero-css'

// On the server
const cssString = getSSRStyles()

// Include in your HTML
const html = `
  <style>${cssString}</style>
  <div class="${buttonStyles}">Button</div>
`

// Clean up after rendering
clearSSRStyles()
```

## API Reference

### Core Functions

- `css(styles)` - Main function for creating styles
- `styled(styles)` - Alias for css with semantic naming
- `applyStyles(cssText)` - Apply raw CSS text
- `initializeZeroCss(options)` - Initialize with custom options

### Development Utilities

- `getDebugInfo(id?)` - Get debug information for styles
- `getAllStyles()` - Get all registered styles
- `clearStyles()` - Clear all styles

### SSR Utilities

- `getSSRStyles()` - Get collected styles for server rendering
- `clearSSRStyles()` - Clear SSR style collection

## TypeScript Support

Zero CSS provides full TypeScript support with autocomplete for all CSS properties:

```typescript
import type { ZeroCSSProperties } from 'zero-css'

const styles: ZeroCSSProperties = {
  display: 'flex', // ✅ Autocomplete
  alignItems: 'center', // ✅ Autocomplete
  gap: '1rem',
  ':hover': {
    opacity: 0.8 // ✅ Nested autocomplete
  }
}
```

## License

MIT