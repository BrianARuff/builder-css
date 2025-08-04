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
import { css } from "zero-css";

const buttonStyles = css({
  backgroundColor: "blue",
  padding: "12px 24px",
  borderRadius: "4px",
  ":hover": {
    backgroundColor: "darkblue",
  },
  "@media (max-width: 768px)": {
    padding: "8px 16px",
  },
});

// Use the generated class name
document.getElementById("button").className = buttonStyles;
```

### Template Literals

```typescript
import { css } from "zero-css";

const cardStyles = css`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
`;
```

## Build Setup

### Initialization with Custom Options

```typescript
import { initializeZeroCss } from "zero-css";

// optional - will run w/o initialization
initializeZeroCss({
  mode: "development",
  enableDebugger: true,
  target: document.getElementById("style-container"),
});
```

### SSR Support

```typescript
import { getSSRStyles, clearSSRStyles } from "zero-css";

// On the server
const cssString = getSSRStyles();

// Include in your HTML
const html = `
  <style>${cssString}</style>
  <div class="${buttonStyles}">Button</div>
`;

// Clean up after rendering
clearSSRStyles();
```

## API Reference

### Core Functions

- `css(styles)` - Main function for creating styles
- `styled(styles)` - Alias for css with semantic naming
- `applyStyles(cssText)` - Apply raw CSS text
- `initializeZeroCss(options)` - Initialize with custom options (optional)

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
import type { ZeroCSSProperties } from "zero-css";

const containerClassName: = css({
  display: "flex", // ✅ Autocomplete
  alignItems: "center", // ✅ Autocomplete
  gap: "1rem", // ✅ Autocomplete
  ":hover": { // ✅ Also supports psuedo selectors (both classes and elements)
    opacity: 0.8, // ✅ Nested autocomplete
  },
});
```

## License

MIT
