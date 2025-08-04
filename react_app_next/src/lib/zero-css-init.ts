import { initializeZeroCss } from 'zero-css';

// Initialize zero-css for SSR
if (typeof window === 'undefined') {
  // Server-side initialization
  initializeZeroCss({
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    enableDebugger: process.env.NODE_ENV === 'development',
  });
} else {
  // Client-side initialization
  initializeZeroCss({
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    enableDebugger: process.env.NODE_ENV === 'development',
  });
}

export {};