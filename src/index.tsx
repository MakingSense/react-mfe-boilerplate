import { createRoot } from "react-dom/client";

import { FrontendFacade } from "./abstractions/FrontendFacade";
import { App } from "./App";
import { noop } from "./common/utils";

const rootElementId = "react-mfe-boilerplate-root";
const container = document.getElementById(rootElementId);
if (container === null) {
  console.error(`Element with id '${rootElementId}' does not exist`);
} else {
  // TODO: move into a configuration abstraction
  // const cfg = (window as any)["react-mfe-configuration"] || {};

  const frontendFacade: FrontendFacade = {
    demo: noop,
  };

  (window as any)["react-mfe-boilerplate"] = frontendFacade;

  const root = createRoot(container);
  root.render(<App frontendFacade={frontendFacade} />);
}
