# Builder CSS

A TypeScript-first CSS-in-JS library with zero runtime cost and full SSR support.

## Features

- 🎯 **Zero Runtime**: CSS extracted at build time for optimal performance
- 🔒 **Type Safe**: Full TypeScript support with autocomplete using `csstype`
- 🏗️ **Universal**: Works with React, Vue, Angular, and Vanilla JS
- 🚀 **SSR Ready**: Built-in server-side rendering support
- 🎨 **Dual API**: Object notation (with autocomplete) + template literals
- 🔧 **Framework Agnostic**: Vite and Webpack plugins included
- ✨ **Keyframes Support**: Full `@keyframes` animation support

## Installation

```bash
npm install builder-css
```

## Quick Start

### Object Notation (Recommended)

```typescript
import { css } from "builder-css";

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
  // 🆕 Keyframes support
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 }
  },
  animation: "fadeIn 0.3s ease-in-out"
});

// Use the generated class name
document.getElementById("button").className = buttonStyles;
```

### Template Literals

```typescript
import { css } from "builder-css";

const cardStyles = css`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
`;
```

## Framework Setup Guides

### Client-Side Only Setup

For simple client-side applications, just import and use:

```typescript
import { css } from "builder-css";

// That's it! No initialization required for basic usage
const styles = css({ color: "red" });
```

### Next.js App Router Setup

Perfect for server-side rendering with React components.

#### 1. Install and Configure

```bash
npm install builder-css
```

#### 2. Create Builder CSS Initialization (Optional)

```typescript
// src/lib/builder-css-init.ts
import { initializeBuilderCss } from "builder-css";

// Optional: customize builder-css behavior
initializeBuilderCss({
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  enableDebugger: process.env.NODE_ENV === 'development',
});
```

#### 3. Setup Root Layout with SSR

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { getSSRStyles } from "builder-css";
import "../lib/builder-css-init"; // Optional initialization

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Collect styles for server-side rendering
  const ssrStyles = getSSRStyles();

  return (
    <html lang="en">
      <head>
        {/* Inject Builder CSS styles for SSR */}
        {ssrStyles && (
          <style
            id="builder-css-ssr"
            dangerouslySetInnerHTML={{ __html: ssrStyles }}
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### 4. Use in Components

```typescript
// src/components/Button.tsx
import { css } from "builder-css";

const buttonStyles = css({
  backgroundColor: "#3498db",
  color: "white",
  padding: "12px 24px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#2980b9",
  },
});

export function Button({ children }: { children: React.ReactNode }) {
  return <button className={buttonStyles}>{children}</button>;
}
```

#### 5. Dynamic Routes Style Collection

For dynamic routes to have styles on first load, import styles in your layout:

```typescript
// src/app/layout.tsx
import "../styles/dynamic-route-styles"; // Ensure styles are collected

// src/styles/dynamic-route-styles.ts
export const dynamicStyles = css({
  // Your dynamic route styles here
});
```

### Vite + React Server Components (RSC) Setup

For streaming SSR with React Server Components.

#### 1. Install Dependencies

```bash
npm install builder-css
```

#### 2. Setup SSR Entry Point

```typescript
// src/framework/entry.ssr.tsx
import { getSSRStyles, injectSSRPayload } from "builder-css";
import * as ReactDOMServer from "react-dom/server.edge";

export async function renderHTML(
  rscStream: ReadableStream<Uint8Array>,
  options: { nonce?: string }
) {
  // Render your app
  const htmlStream = await ReactDOMServer.renderToReadableStream(<App />);
  
  let responseStream: ReadableStream<Uint8Array> = htmlStream;

  // Inject Builder CSS styles into the HTML stream
  const ssrStyles = getSSRStyles();
  if (ssrStyles) {
    responseStream = responseStream.pipeThrough(
      injectSSRPayload(ssrStyles, { nonce: options?.nonce })
    );
  }

  return responseStream;
}
```

#### 3. Use in Components

```typescript
// src/components/Card.tsx
import { css } from "builder-css";

const cardStyles = css({
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "@keyframes slideIn": {
    "0%": { transform: "translateY(20px)", opacity: 0 },
    "100%": { transform: "translateY(0)", opacity: 1 }
  },
  animation: "slideIn 0.3s ease-out"
});

export function Card({ children }: { children: React.ReactNode }) {
  return <div className={cardStyles}>{children}</div>;
}
```

### Vite + SWC Setup

For fast compilation with SWC instead of Babel.

#### 1. Install Dependencies

```bash
npm install builder-css
```

#### 2. Use in Your Components

Builder CSS works seamlessly with SWC compilation:

```typescript
import { css } from "builder-css";

const appStyles = css({
  fontFamily: "system-ui, sans-serif",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export function App() {
  return <div className={appStyles}>Hello Builder CSS with SWC!</div>;
}
```

### Other Frameworks

Builder CSS works with any JavaScript framework. The basic pattern is:

1. **Client-side**: Just import `css` and use it
2. **SSR**: Use `getSSRStyles()` to collect styles and inject them into your HTML
3. **Streaming SSR**: Use `injectSSRPayload()` for stream-based injection

## API Reference

### Core Functions

- `css(styles)` - Main function for creating styles
- `styled(styles)` - Alias for css with semantic naming  
- `applyStyles(cssText)` - Apply raw CSS text
- `initializeBuilderCss(options)` - Initialize with custom options *(optional)*

### Development Utilities

- `getDebugInfo(id?)` - Get debug information for styles
- `getAllStyles()` - Get all registered styles
- `clearStyles()` - Clear all styles

### SSR Utilities

- `getSSRStyles()` - Get collected styles for server rendering
- `clearSSRStyles()` - Clear SSR style collection
- `injectSSRPayload(cssText, options?)` - Inject styles into HTML streams *(for streaming SSR)*

### Initialization Options

The `initializeBuilderCss()` function is **optional** but useful for:

- **Development debugging**: Enable style inspection tools
- **Custom targets**: Inject styles into specific DOM elements
- **CSP compliance**: Configure nonce for Content Security Policy

```typescript
initializeBuilderCss({
  mode: "development" | "production", // Controls optimizations
  enableDebugger: boolean,           // Adds debugging utilities
  target: HTMLElement,               // Custom style injection target
});
```

## TypeScript Support

Builder CSS provides full TypeScript support with autocomplete for all CSS properties:

```typescript
import type { BuilderCSSProperties } from "builder-css";

const containerStyles = css({
  display: "flex",        // ✅ Autocomplete
  alignItems: "center",   // ✅ Autocomplete
  gap: "1rem",           // ✅ Autocomplete
  ":hover": {            // ✅ Pseudo-selectors
    opacity: 0.8,        // ✅ Nested autocomplete
  },
  "@keyframes bounce": { // ✅ Keyframes support
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-10px)" }
  },
  animation: "bounce 1s infinite"
});
```

### Key Features

- Full CSS property autocomplete
- Pseudo-selector support (`:hover`, `::before`, etc.)
- Media query support (`@media`, `@container`, `@supports`)
- **Keyframes animations** (`@keyframes`) 
- Nested selector support (`&:hover`, `> div`, etc.)
- CSS custom properties (`--variable-name`)

## License

MIT
