# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server for testing the library
- `npm run build` - Build the library for distribution (runs TypeScript compilation + Vite build)

## Project Architecture

This is a TypeScript library for zero-runtime CSS-in-JS using the CSS Constructable Stylesheets API. The project has a dual structure:

### Library Code (`lib/main.ts`)
- Main library entry point with `initializeZeroCss` function
- Creates and manages a global CSSStyleSheet instance via `window.__ZERO_CSS_STYLE_SHEET__`
- Designed for server-side rendering compatibility with fallback handling

### Demo Application (`src/`)
- Vite-based demo app that imports and uses the library
- Contains a counter component implementation
- Used for development and testing of the library

## Build Configuration

- **Vite**: Configured as a library build with entry point at `lib/main.ts`
- **TypeScript**: Strict configuration with ES2022 target
- **Output**: Generates both ESM (`dist/counter.js`) and UMD (`dist/counter.umd.cjs`) bundles
- **Types**: Type definitions exported via `index.d.ts`

## Key Implementation Details

The library uses the modern CSS Constructable Stylesheets API, which allows creating stylesheets programmatically without DOM manipulation. The global window property `__ZERO_CSS_STYLE_SHEET__` serves as the singleton stylesheet instance that can be shared across components.