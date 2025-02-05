import { test, expect } from "@playwright/test";

test.describe("JavaScript Alerts Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the JavaScript Alerts page before each test
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  });

  test("Accept JS Alert", async ({ page }) => {
    // Listen for the alert dialog and accept it
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("I am a JS Alert"); // Validate alert message
      await dialog.accept(); // Accept the alert
    });

    // Click the "Click for JS Alert" button
    await page.getByRole("button", { name: "Click for JS Alert" }).click();

    // Verify the result message
    await expect(page.locator("#result")).toContainText(
      "You successfully clicked an alert"
    );
  });

  test("Dismiss JS Confirm", async ({ page }) => {
    // Listen for the confirm dialog and dismiss it
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("I am a JS Confirm"); // Validate confirm message
      await dialog.dismiss(); // Dismiss the confirm
    });

    // Click the "Click for JS Confirm" button
    await page.getByRole("button", { name: "Click for JS Confirm" }).click();

    // Verify the result message
    await expect(page.locator("#result")).toContainText("You clicked: Cancel");
  });
});
