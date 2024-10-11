import { test, expect } from "playwright-test-coverage";
test("login", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "Login" }).click();
	await page.getByPlaceholder("Email address").click();
	await page.getByPlaceholder("Email address").fill("a@jwt.com");
	await page.getByPlaceholder("Password").click();
	await page.getByPlaceholder("Password").fill("admin");
	await page.getByRole("button", { name: "Login" }).click();
	await expect(page.getByRole("link", { name: "常" })).toBeVisible();

	await page.getByRole("link", { name: "Logout" }).click();
});
