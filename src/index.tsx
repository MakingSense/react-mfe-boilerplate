import { createRoot } from "react-dom/client";

import { App } from "./App";

const rootElementId = "react-mfe-boilerplate-root";
const container = document.getElementById(rootElementId);

if (container === null) {
  console.error(`Element with id '${rootElementId}' does not exist`);
} else {
  // TODO: move into a configuration abstraction
  // const cfg = (window as any)["react-mfe-configuration"] || {};

  const root = createRoot(container);
  root.render(<App />);
}
