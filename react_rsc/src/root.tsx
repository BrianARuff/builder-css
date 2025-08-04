import { css } from "builder-css";
import { getServerCounter, updateServerCounter } from "./action.tsx";
import { ClientCounter } from "./client.tsx";
import "./index.css"; // css import is automatically injected in exported server components
import { ServerCounterButton } from "./ServerCounterButton.tsx";

export function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + RSC</title>
      </head>
      <body>
        <App />
      </body>
    </html>
  );
}

async function App() {
  const serverCount = Number(await getServerCounter());

  const svbtn2 = css({
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  });

  // Styles for server generated code can't be dynamically generated like client styles, but you can define them statically and then use them conditionally.
  const powerBlueCN = css({
    backgroundColor: "powderblue",
  });

  // Styles for server generated code can't be dynamically generated like client styles, but you can define them statically and then use them conditionally.
  const rebeccaPurpleCN = css({
    backgroundColor: "rebeccapurple",
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
      <ClientCounter />
      <form
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        })}
        action={updateServerCounter.bind(null, 1)}
      >
        <ServerCounterButton serverCount={serverCount} />

        {/* These styles are statically defined in index.css, and like the css function, cannot be dynamically generated. */}
        <button
          className={`server-btn ${
            serverCount % 2 === 0 ? "bgc-blue" : "bgc-green"
          }`}
        >
          Server Counter: {serverCount}
        </button>

        {/* Styles for server generated code can't be dynamically generated like client styles, but you can define them statically and then use them conditionally. */}
        <button
          className={`${svbtn2} ${
            serverCount % 2 === 0 ? rebeccaPurpleCN : powerBlueCN
          }`}
        >
          Server Counter: {serverCount}
        </button>
      </form>
    </div>
  );
}
