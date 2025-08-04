import { useState } from "react";
import { css } from "zero-css";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const btnCN = (count: number) =>
    css({
      backgroundColor: count % 2 === 0 ? "blue" : "green",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "red",
      },
      "::after": {
        content: `" Click me!"`,
        display: "block",
        marginTop: "5px",
        fontSize: "12px",
        color: "yellow",
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
      <button className={btnCN(count)} onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <button className={btnCN(count2)} onClick={() => setCount2(count2 + 1)}>
        Count: {count2}
      </button>
    </div>
  );
}

export default App;
