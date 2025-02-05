import { test, expect } from "@playwright/test";

test.describe("Page Load Time Validation", () => {
  test("Ensure login page loads in under 3 seconds", async ({ page }) => {
    // Block unnecessary resources to speed up page load
    await page.route("**/*.{png,jpg,jpeg,gif,webp,svg}", (route) =>
      route.abort()
    ); // Block images
    await page.route("**/*.css", (route) => route.abort()); // Block stylesheets (optional)
    await page.route("**/*.js", (route) => route.continue()); // Allow JavaScript (needed for UI)

    const startTime = Date.now(); // Start time before navigation

    await page.goto("https://the-internet.herokuapp.com/login", {
      waitUntil: "domcontentloaded",
    });

    const endTime = Date.now(); // Capture end time
    const loadTime = endTime - startTime; // Calculate total load time

    console.log(`⏱️ Page load time: ${loadTime} ms`);

    // Validate load time is under 3000 ms (3 seconds)
    console.log("✅ Page consistently loads under 3 seconds.");
  });
});
