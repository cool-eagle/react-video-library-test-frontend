import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

describe("Navbar", () => {
  test("renders correctly", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const companyNameElement = screen.getByText("The Video Library");
    expect(companyNameElement).toBeInTheDocument();

    const usersNavElement = screen.getByText("Videos");
    expect(usersNavElement).toBeInTheDocument();

    const addUserNavElement = screen.getByText("Add Video");
    expect(addUserNavElement).toBeInTheDocument();
  });
});
