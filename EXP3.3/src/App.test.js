import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders product cards", () => {
  render(<App />);
  expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
});

