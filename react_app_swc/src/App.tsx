import { useState } from "react";
import { css } from "zero-css";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [isCount3Disabled, setIsCount3Disabled] = useState(true);

  const btnCN = (count: number) =>
    css({
      backgroundColor: count % 2 === 0 ? "paleturquoise" : "palevioletred",
      color: count % 2 === 0 ? "black" : "white",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "green",
      },
      ":focus": {
        outline: "2px solid orange",
      },
      "[aria-disabled='false']": {
        backgroundColor: count % 2 === 0 ? "springgreen" : "sandybrown",
      },
      "[data-disabled='true']": {
        backgroundColor: "lightgray",
        cursor: "not-allowed",
        userSelect: "none",
        opacity: 0.5,
      },
      "::after": {
        content: `"Click me!"`,
        display: "block",
        marginTop: "5px",
        fontSize: "12px",
        color: "lightblack",
      },
    });

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        height: "100vh",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
      })}
    >
      <div
        className={css({
          display: "flex",
          gap: "32px",
        })}
      >
        <button
          className={btnCN(count)}
          onClick={() => setCount((prev) => prev + 1)}
        >
          Count 1: {count}
        </button>
        <button
          aria-disabled={false}
          className={btnCN(count2)}
          onClick={() => setCount2((prev) => prev + 1)}
        >
          Count 2: {count2}
        </button>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        })}
      >
        <button
          data-disabled={isCount3Disabled}
          className={btnCN(count3)}
          onClick={() =>
            !isCount3Disabled ? setCount3((prev) => prev + 1) : undefined
          }
        >
          Count 3: {count3}
        </button>
        {/* checkmark to toggle disable count 3 */}
        <label>
          <input
            type="checkbox"
            checked={isCount3Disabled}
            onChange={(e) => setIsCount3Disabled(e.target.checked)}
          />
          Disable Count 3
        </label>
      </div>
    </div>
  );
}

export default App;
