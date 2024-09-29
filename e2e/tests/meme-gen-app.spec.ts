import { test, expect } from "@playwright/test";

// test.beforeEach(async ({ page }) => {
//   await page.goto("https://demo.playwright.dev/todomvc");
// });

test.describe("Home Page", () => {
  test("Expect Home Page to redirect to /search?q=", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/.*search\?q=/);
  });
});
test.describe("Search Page", () => {
  test("Searching 'sdjkfnkljasndfkljasnd' would result in no results ", async ({
    page,
  }) => {
    await page.goto("/");

    const searchInput = page.getByPlaceholder(/search memes/i);
    await searchInput.fill("sdjkfnkljasndfkljasnd");
    await searchInput.press("Enter");

    await page.waitForURL(/.*search\?q=sdjkfnkljasndfkljasnd/);

    const noResultsText = page.getByText(
      /Unfortunately, no results were found/
    );
    console.log({ noResultsText });
    await expect(noResultsText).toBeVisible();
  });

  test("Customising a meme and downloading it", async ({ page }) => {
    await page.goto("/search/?q=");

    await page
      .getByText(/Customise/)
      .nth(0)
      .click();

    await page.waitForTimeout(500);

    await expect(page).toHaveURL(/customise/i);

    //Check Image visible
    await expect(
      page.getByRole("img", { name: "default-image.jpg" })
    ).toBeVisible();

    // Check blur
    await page.getByLabel("blur").check();

    // Assert that the img src contains 'tr:bl'

    expect(
      await page
        .getByRole("img", { name: "default-image.jpg" })
        .getAttribute("src")
    ).toContain("tr:bl");

    // Check Sharpen
    await page.getByLabel(/sharpen/i).check();

    //Assert img src for 'e-sharpen'
    expect(
      await page
        .getByRole("img", { name: "default-image.jpg" })
        .getAttribute("src")
    ).toContain("e-sharpen");

    // Check grayscale
    await page.getByLabel(/greyscale/i).check();

    //Assert that grayscale is in src
    expect(
      await page
        .getByRole("img", { name: "default-image.jpg" })
        .getAttribute("src")
    ).toContain("e-grayscale");

    // Check text overlay input
    await page.getByLabel(/text overlay/i).fill("Sample");

    // Debouncer
    await page.waitForTimeout(500);

    // Assert that the image src includes the text overlay
    expect(
      await page
        .getByRole("img", { name: "default-image.jpg" })
        .getAttribute("src")
    ).toContain("Sample");

    // Check font size
    await page.getByLabel(/font size/i).fill("383");

    // Debouncer
    await page.waitForTimeout(500);

    // Assert 383 is in imge src
    expect(
      await page
        .getByRole("img", { name: "default-image.jpg" })
        .getAttribute("src")
    ).toContain("383");

    // Check "Remove" button functionality
    await page.getByRole("button", { name: "Remove" }).click();
    expect(
      await page
        .getByRole("img", { name: "default-image.jpg" })
        .getAttribute("src")
    ).not.toContain("Sample");

    // Check download would download a file
    await page.getByTestId("download").click();
    const download = await page.waitForEvent("download");
    const downloadPath = await download.path();

    expect(downloadPath).toBeTruthy();
  });
});
