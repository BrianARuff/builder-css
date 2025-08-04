"use client";

import { useEffect } from 'react';
import { clearSSRStyles } from 'zero-css';

// Client component to clear SSR styles after hydration
export default function ZeroCSSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Clear SSR styles cache after client-side hydration
    clearSSRStyles();
  }, []);

  return <>{children}</>;
}