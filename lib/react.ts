import { css as baseCss, styled as baseStyled } from './css'

// React-specific exports (same as base, but with better naming for React context)
export const css = baseCss
export const styled = baseStyled

// React component helper for SSR
export function BuilderCSSProvider({ children }: { children: any }) {
  // This would be implemented to inject SSR styles
  // For now, it's a placeholder that returns children as-is
  return children
}