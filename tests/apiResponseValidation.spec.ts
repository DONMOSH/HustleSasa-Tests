import { test, expect } from "@playwright/test";

test.describe("API Response Validation - Login Simulation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
  });

  test("Successful Login - Validate API Response & Redirect", async ({
    page,
  }) => {
    let loginResponseStatus: number | null = null;
    let securePageStatus: number | null = null;

    // Capture API response statuses
    page.on("response", async (response) => {
      if (response.url().includes("/authenticate"))
        loginResponseStatus = response.status();
      if (response.url().includes("/secure"))
        securePageStatus = response.status();
    });

    await page.fill("#username", "tomsmith");
    await page.fill("#password", "SuperSecretPassword!");
    await page.click('button[type="submit"]');

    // Wait for redirection to /secure
    await page.waitForURL("https://the-internet.herokuapp.com/secure", {
      timeout: 5000,
    });

    // Validate API responses
    expect(loginResponseStatus).toBe(303);
    expect(securePageStatus).toBe(200);

    // Validate final URL
    expect(page.url()).toBe("https://the-internet.herokuapp.com/secure");
  });

  test("Failed Login - Validate API Response & Error Handling", async ({
    page,
  }) => {
    let loginResponseStatus: number | null = null;
    let loginPageStatus: number | null = null;

    // Capture API response statuses
    page.on("response", async (response) => {
      if (response.url().includes("/authenticate"))
        loginResponseStatus = response.status();
      if (response.url().includes("/login"))
        loginPageStatus = response.status();
    });

    await page.fill("#username", "wronguser");
    await page.fill("#password", "wrongpass");
    await page.click('button[type="submit"]');

    // Wait for redirection back to login page
    await page.waitForURL("https://the-internet.herokuapp.com/login", {
      timeout: 5000,
    });

    // Validate API responses
    expect(loginResponseStatus).toBe(303);
    expect(loginPageStatus).toBe(200);

    // Validate final URL remains /login
    expect(page.url()).toBe("https://the-internet.herokuapp.com/login");

    // Validate error message
    const errorMessage = await page.locator(".flash.error");
    await expect(errorMessage).toHaveText(/Your username is invalid!/);
  });
});
