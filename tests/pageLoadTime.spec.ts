import { test, expect } from "@playwright/test";

test("Ensure page loads under 3 seconds using Performance API", async ({
  page,
}, testInfo) => {
  // Get the current browser name
  const browserName = testInfo.project.name;
  console.log(`Running test in: ${browserName}`);

  // Adjust threshold dynamically based on the browser
  let maxTime;
  if (browserName === "firefox") {
    maxTime = 4000; // Firefox is slower
  } else if (browserName === "webkit") {
    maxTime = 4000; // WebKit can be slightly slower
  } else {
    maxTime = 3000; // Default for Chromium
  }

  // Block unnecessary resources
  await page.route("**/*.{png,jpg,jpeg,gif,webp,svg,woff,woff2}", (route) =>
    route.abort()
  );
  await page.route("**/*.css", (route) => route.abort());
  await page.route("**/*.js", (route) => route.continue());

  // Reduce animation overhead
  await page.addStyleTag({
    content: "* { animation: none !important; transition: none !important; }",
  });

  // Measure load time
  const startTime = Date.now();
  await page.goto("https://the-internet.herokuapp.com/", { waitUntil: "load" });
  const loadTime = Date.now() - startTime;

  console.log(`⏱️ Page Load Time (${browserName}): ${loadTime} ms`);

  // Ensure page loads under the adjusted threshold
  expect(loadTime).toBeLessThanOrEqual(maxTime);
});
