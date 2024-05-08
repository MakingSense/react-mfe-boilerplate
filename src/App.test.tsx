import { act, render, screen } from "@testing-library/react";

import { App } from "./App";

describe(App.name, () => {
  it("should render Hello content after calling demo()", () => {
    // Arrange
    render(<App />);

    // Assert
    expect(screen.queryAllByText("Hello react-mfe-boilerplate!")).toEqual([]);

    // Act
    act(() => {
      (window as any)["react-mfe-boilerplate"].demo();
    });

    // Assert
    screen.getByText("Hello react-mfe-boilerplate!");
  });
});
