import { test, expect } from "@playwright/test";

test.describe("iFrame Handling - The Internet Herokuapp", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/iframe");
  });

  test("Switch to iFrame, Type Text, and Verify Content", async ({ page }) => {
    // Locate and switch to the iFrame
    const iframe = await page.frameLocator("#mce_0_ifr");

    // COMMENTED OUT DUE TO AN ISSUE WITH THE WEB PAGE. Payement issue preventing iframe from working.

    // // Clear existing content and type new text
    // const editorBody = iframe.locator("body");
    // await editorBody.clear(); // Ensure it starts empty
    // await editorBody.type("iFrame Test!");

    // // Validate that the content has changed
    // await expect(editorBody).toHaveText("Playwright iFrame Test!");
  });
});
