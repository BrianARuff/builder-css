// Example React component using zero-css
import React from 'react'
import { css } from 'zero-css'

// Object notation with full TypeScript autocomplete
const buttonStyles = css({
  backgroundColor: '#3b82f6',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '6px',
  border: 'none',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: '#2563eb',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
  },
  ':active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)'
  },
  '@media (max-width: 768px)': {
    padding: '10px 20px',
    fontSize: '14px'
  }
})

const cardStyles = css({
  backgroundColor: 'white',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  margin: '0 auto',
  '--custom-spacing': '16px',
  '& h2': {
    margin: '0 0 var(--custom-spacing) 0',
    color: '#1f2937',
    fontSize: '24px'
  },
  '& p': {
    margin: '0 0 var(--custom-spacing) 0',
    color: '#6b7280',
    lineHeight: '1.6'
  }
})

// Template literal example for copy-paste CSS
const gradientBackground = css`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
`

export function ExampleComponent() {
  const [count, setCount] = React.useState(0)

  return (
    <div className={gradientBackground}>
      <div className={cardStyles}>
        <h2>Zero CSS Example</h2>
        <p>
          This component demonstrates zero-css with both object notation 
          (with TypeScript autocomplete) and template literals.
        </p>
        <p>Current count: {count}</p>
        <button 
          className={buttonStyles}
          onClick={() => setCount(c => c + 1)}
        >
          Click me! ({count})
        </button>
      </div>
    </div>
  )
}

// Usage in your app:
// import { ExampleComponent } from './example-react-component'
// 
// function App() {
//   return <ExampleComponent />
// }