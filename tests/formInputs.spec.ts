import { test, expect } from "@playwright/test";

test.describe("Form Inputs Validation Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/inputs");
  });

  test("Enter Numbers - Validate Input", async ({ page }) => {
    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").fill("12345");
    await expect(page.getByRole("spinbutton")).toHaveValue("12345");
  });

  test("Enter Alphabets - Reject Input", async ({ page }) => {
    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").pressSequentially("abcde");
    await expect(page.getByRole("spinbutton")).toHaveValue("");
  });
});
