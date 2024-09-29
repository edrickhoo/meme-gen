import { test, expect } from "@playwright/test";

test("Expect Home Page to redirect to /search?q=", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  //   await page.waitForURL(/.*search\?q=/);
  await expect(page).toHaveURL(/.*search\?q=/);
});
