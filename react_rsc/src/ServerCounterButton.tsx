"use client";

import { css } from "builder-css";

export const ServerCounterButton = ({
  serverCount,
}: {
  serverCount: number;
}) => {
  if (typeof serverCount !== "number") {
    return null; // Ensure count is a number
  }

  const btnCN = css({
    backgroundColor: serverCount % 2 === 0 ? "yellow" : "orange",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  });

  return <button className={btnCN}>Server Counter: {serverCount}</button>;
};
