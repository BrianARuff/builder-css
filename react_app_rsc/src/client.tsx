"use client";

import { useState } from "react";
import { css } from "zero-css";

export function ClientCounter() {
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
    <>
      <button className={btnCN(count)} onClick={() => setCount(count + 1)}>
        Client Counter: {count}
      </button>
      <button className={btnCN(count2)} onClick={() => setCount2(count2 + 1)}>
        Client Counter 2: {count2}
      </button>
    </>
  );
}
