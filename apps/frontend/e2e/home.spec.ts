import { test, expect } from "@playwright/test";

const LOCAL_HOST_URL = "http://localhost:3001/";

test("should shown home page", async ({ page }) => {
  await page.goto(LOCAL_HOST_URL);
});
