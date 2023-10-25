import { render, screen } from "@testing-library/react";
import Home from "./Home.jsx";
test("test home Title", () => {
  render(<Home />);
  const titleText = screen.getByText(/ /i);
  expect(titleText).toBeInTheDocument();
});
