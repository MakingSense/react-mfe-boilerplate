import { StrictMode, useState } from "react";

import { FrontendFacade } from "./abstractions/FrontendFacade";

export function App({
  frontendFacade,
}: {
  frontendFacade: FrontendFacade;
}): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  frontendFacade.demo = () => {
    setIsVisible(true);
  };

  return (
    <StrictMode>
      {isVisible ? <>Hello react-mfe-boilerplate!</> : null}
    </StrictMode>
  );
}
