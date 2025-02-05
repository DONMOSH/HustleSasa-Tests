import { test, expect } from "@playwright/test";

test.describe("Drag and Drop Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Drag and Drop page before each test
    await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
  });

  test("Drag A onto B and Validate Position Change", async ({ page }) => {
    await expect(page.locator("#content")).toMatchAriaSnapshot(`
    - heading "Drag and Drop" [level=3]
    - banner: A
    - banner: B
    `);

    // Perform the drag-and-drop action
    await page.locator("#column-a").dragTo(page.locator("#column-b"));

    await expect(page.locator("#content")).toMatchAriaSnapshot(`
    - heading "Drag and Drop" [level=3]
    - banner: B
 
    `);
  });
});
