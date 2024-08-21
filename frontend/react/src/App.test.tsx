import { render } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "vitest";

import App from "./App";
import "@testing-library/jest-dom";

describe("App component", () => {
  it("should render without crashing", () => {
    const { getByText } = render(<App />);
    expect(getByText("Vite + React")).toBeInTheDocument();
  });
});