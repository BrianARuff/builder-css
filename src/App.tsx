import React from "react";
import { css, initializeZeroCss } from "zero-css";

console.log(React);

// Initialize the zero-css library
initializeZeroCss();

function App() {
  // Test basic CSS object syntax
  const containerStyle = css({
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  });

  // Test nested selectors and hover states
  const buttonStyle = css({
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "10px",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "#0056b3",
      transform: "translateY(-2px)",
    },

    "&:active": {
      transform: "translateY(0)",
    },
  });

  // Test CSS template literal syntax
  const cardStyle = css`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 24px;
    margin: 20px 0;
    color: white;
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  `;

  // Test media queries
  const responsiveStyle = css({
    fontSize: "18px",
    "@media (max-width: 768px)": {
      fontSize: "16px",
      padding: "16px",
    },
    "@media (max-width: 480px)": {
      fontSize: "14px",
      padding: "12px",
    },
  });

  return (
    <div className={containerStyle}>
      <h1 className={responsiveStyle}>Zero CSS Test App</h1>

      <div className={cardStyle}>
        <h2>Welcome to Zero CSS!</h2>
        <p>This is a test of the zero-runtime CSS-in-JS library.</p>
      </div>

      <div>
        <button
          className={buttonStyle}
          onClick={() => alert("Button clicked!")}
        >
          Primary Button
        </button>

        <button
          className={css({
            backgroundColor: "#28a745",
            "&:hover": {
              backgroundColor: "#1e7e34",
            },
          })}
          onClick={() => console.log("Green button clicked!")}
        >
          Success Button
        </button>
      </div>

      <div
        className={css({
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
        })}
      >
        <h3>Features Demonstrated:</h3>
        <ul>
          <li>✅ CSS object syntax</li>
          <li>✅ CSS template literal syntax</li>
          <li>✅ Nested selectors (&:hover, &:active)</li>
          <li>✅ Media queries</li>
          <li>✅ Dynamic styles</li>
          <li>✅ CSS-in-JS without runtime overhead</li>
        </ul>
        <h3>Other Demo Apps:</h3>
        <ul>
          <li>react_app</li>
          <li>react_app_swc</li>
          <li>react_app_rsc</li>
        </ul>
        {/* how to run them (cd to app directory and then run npm install then npm run dev) */}
        <p>
          To run these apps, navigate to the app directory and run:
          <code>npm install</code> followed by <code>npm run dev</code>.
        </p>
        {/* mention special files to view like root.tsx and client.tsx in react_app_swc */}
        <div>
          In <code>react_app_swc</code>, pay attention to the special files:
          <ul>
            <li>
              <code>root.tsx</code> - The main entry point
            </li>
            <li>
              <code>client.tsx</code> - The client-side rendering logic
            </li>
            <li>
              <code>entry.browser.tsx</code> - The browser entry point for RSC
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
