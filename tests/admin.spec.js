import { test, expect } from "playwright-test-coverage";

test("admin and dashboard", async ({ page }) => {
	test.slow();
	await page.goto("/");
	await page.getByRole("link", { name: "Login" }).click();
	await page.getByPlaceholder("Email address").click();
	await page.getByPlaceholder("Email address").fill("a@jwt.com");
	await page.getByPlaceholder("Password").click();
	await page.getByPlaceholder("Password").fill("admin");
	await page.getByRole("button", { name: "Login" }).click();
	await expect(page.getByRole("link", { name: "常" })).toBeVisible();

	await page.getByRole("link", { name: "常" }).click();
	await expect(page.getByText("常用名字")).toBeVisible();
	await expect(page.getByText("a@jwt.com")).toBeVisible();
	await expect(page.getByText("admin", { exact: true })).toBeVisible();
	await page.getByText("a@jwt.com").click();
	await expect(
		page.getByRole("img", { name: "Employee stock photo" })
	).toBeVisible();

	await page.getByRole("link", { name: "Admin" }).click();
	await expect(
		page
			.locator("#root div")
			.filter({ hasText: "Keep the dough rolling and" })
			.nth(3)
	).toBeVisible();
	await page.getByRole("button", { name: "Add Franchise" }).click();
	await page.getByPlaceholder("franchise name").click();
	await page.getByPlaceholder("franchise name").fill("tempPizza");
	await page.getByPlaceholder("franchisee admin email").click();
	await page.getByPlaceholder("franchisee admin email").fill("a@jwt.com");
	await page.getByRole("button", { name: "Create" }).click();
	await expect(page.getByRole("cell", { name: "tempPizza" })).toBeVisible();
	await page
		.getByRole("row", { name: "tempPizza 常用名字" })
		.getByRole("button")
		.click();
	await expect(page.getByText("Are you sure you want to")).toBeVisible();
	await expect(page.getByText("tempPizza")).toBeVisible();
	await page.getByRole("button", { name: "Close" }).click();
	await expect(
		page
			.locator("#root div")
			.filter({ hasText: "Keep the dough rolling and" })
			.nth(3)
	).toBeVisible();
	await expect(page.getByRole("cell", { name: "tempPizza" })).not.toBeVisible();

	await page.getByRole("link", { name: "Logout" }).click();
});
