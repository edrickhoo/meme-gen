import { render } from "@testing-library/react";
import Home from "./page";
import { redirect } from "next/navigation";

jest.mock("next/navigation", () => {
  return {
    redirect: jest.fn(),
  };
});

describe("Home Page Test", () => {
  it("should redirect to /search?q=", async () => {
    render(<Home />);

    expect(redirect).toHaveBeenCalledWith("/search?q=");
  });
});
