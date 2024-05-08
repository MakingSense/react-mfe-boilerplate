import { StrictMode, useState } from "react";

type FrontendFacade = {
  demo: () => void;
};

export function App(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  const frontendFacade: FrontendFacade = {
    demo: () => {
      setIsVisible(true);
    },
  };

  (window as any)["react-mfe-boilerplate"] = frontendFacade;

  return (
    <StrictMode>
      {isVisible ? <>Hello react-mfe-boilerplate!</> : null}
    </StrictMode>
  );
}
