// src/components/__tests__/FavouriteButton.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toggleFavouriteMemeAction } from "./actions"; // Import the action to mock it
import FavouriteButton from "./favourite-button";
import "@testing-library/jest-dom";

jest.mock("./actions", () => ({
  toggleFavouriteMemeAction: jest.fn(),
}));

describe("FavouriteButton", () => {
  const fileId = "1";
  const filePath = "/path/test.png";
  const fileWidth = 300;
  const fileHeight = 200;

  it("renders the filled heart icon when isFavourited is true", () => {
    render(
      <FavouriteButton
        fileId={fileId}
        isFavourited={true}
        filePath={filePath}
        fileWidth={fileWidth}
        fileHeight={fileHeight}
      />
    );

    const filledHeart = screen.getByRole("button").querySelector("svg");
    expect(filledHeart).toHaveClass("text-red-500");
  });

  it("renders the empty heart icon when isFavourited is false", () => {
    render(
      <FavouriteButton
        fileId={fileId}
        isFavourited={false}
        filePath={filePath}
        fileWidth={fileWidth}
        fileHeight={fileHeight}
      />
    );

    const emptyHeart = screen.getByRole("button").querySelector("svg");
    expect(emptyHeart).not.toHaveClass("text-red-500");
  });

  it("triggers toggleFavouriteMemeAction on form submission", async () => {
    render(
      <FavouriteButton
        fileId={fileId}
        isFavourited={false}
        filePath={filePath}
        fileWidth={fileWidth}
        fileHeight={fileHeight}
      />
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(toggleFavouriteMemeAction).toHaveBeenCalledWith(
        fileId,
        filePath,
        `/customise/${fileId}`,
        fileWidth,
        fileHeight
      );
    });
  });
});
