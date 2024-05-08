import { act, render, screen } from "@testing-library/react";

import { FrontendFacade } from "./abstractions/FrontendFacade";
import { App } from "./App";
import { noop } from "./common/utils";

describe(App.name, () => {
  it("should render Hello content after calling demo()", () => {
    // Arrange
    const frontendFacade: FrontendFacade = {
      demo: noop,
    };

    render(<App frontendFacade={frontendFacade} />);

    // Assert
    expect(screen.queryAllByText("Hello react-mfe-boilerplate!")).toEqual([]);

    // Act
    act(() => {
      frontendFacade.demo();
    });

    // Assert
    screen.getByText("Hello react-mfe-boilerplate!");
  });
});
