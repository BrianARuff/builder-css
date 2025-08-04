import { initializeBuilderCss } from 'builder-css';

// Initialize builder-css for SSR
if (typeof window === 'undefined') {
  // Server-side initialization
  initializeBuilderCss({
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    enableDebugger: process.env.NODE_ENV === 'development',
  });
} else {
  // Client-side initialization
  initializeBuilderCss({
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    enableDebugger: process.env.NODE_ENV === 'development',
  });
}

export {};