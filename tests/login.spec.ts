import { test, expect } from "@playwright/test";

test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto("https://the-internet.herokuapp.com/login");
  });

  test("Valid Login", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("SuperSecretPassword!");
    await page.getByRole("button", { name: " Login" }).click();
    await expect(page.getByText("You logged into a secure area")).toBeVisible();
    await expect(page.locator("h2")).toContainText("Secure Area");
    await expect(page.locator("h4")).toContainText(
      "Welcome to the Secure Area. When you are done click logout below."
    );
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
  });

  test("Invalid Login", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill("invaliduser");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("invalidpassword");
    await page.getByRole("button", { name: " Login" }).click();
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
  });

  test("Empty Fields", async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
  });
});
