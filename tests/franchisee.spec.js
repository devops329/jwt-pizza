import { test, expect } from "playwright-test-coverage";
test("franchisee", async ({ page }) => {
	test.slow();
	await page.goto("/");
	await page.getByRole("link", { name: "Login" }).click();
	await page.getByPlaceholder("Email address").click();
	await page.getByPlaceholder("Email address").fill("f@jwt.com");
	await page.getByPlaceholder("Password").click();
	await page.getByPlaceholder("Password").fill("franchisee");
	await page.getByRole("button", { name: "Login" }).click();
	await expect(page.getByRole("link", { name: "pf" })).toBeVisible();

	await page
		.getByLabel("Global")
		.getByRole("link", { name: "Franchise" })
		.click();
	await expect(page.getByRole("cell", { name: "SLC" })).toBeVisible();

	await page.getByRole("button", { name: "Create store" }).click();
	await page.getByPlaceholder("store name").click();
	await page.getByPlaceholder("store name").fill("AAA");
	await page.getByRole("button", { name: "Create" }).click();
	await expect(page.getByRole("cell", { name: "AAA" })).toBeVisible();
	await page
		.getByRole("row", { name: "AAA 0 ₿ Close" })
		.getByRole("button")
		.click();

	await expect(page.getByText("Sorry to see you go")).toBeVisible();
	await expect(page.getByText("pizzaPocket")).toBeVisible();
	await expect(page.getByText("AAA")).toBeVisible();
	await page.getByRole("button", { name: "Close" }).click();

	await expect(page.getByRole("cell", { name: "AAA" })).not.toBeVisible();
	await page.getByRole("link", { name: "Logout" }).click();
});
