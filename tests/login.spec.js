import { test, expect } from "playwright-test-coverage";
test("buy pizza with login", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Order now" }).click();
	await expect(page.locator("h2")).toContainText("Awesome is a click away");
	await page.getByRole("combobox").selectOption("1");
	await page.getByRole("link", { name: "Image Description Veggie A" }).click();
	await page.getByRole("link", { name: "Image Description Pepperoni" }).click();
	await expect(page.locator("form")).toContainText("Selected pizzas: 2");
	await page.getByRole("button", { name: "Checkout" }).click();
	await page.getByPlaceholder("Email address").click();
	await page.getByPlaceholder("Email address").fill("d@jwt.com");
	await page.getByPlaceholder("Email address").press("Tab");
	await page.getByPlaceholder("Password").fill("a");
	await page.getByRole("button", { name: "Login" }).click();
	await expect(page.getByRole("main")).toContainText(
		"Send me those 2 pizzas right now!"
	);
	await expect(page.locator("tbody")).toContainText("Veggie");
	await page.getByRole("button", { name: "Pay now" }).click();
	await expect(page.getByRole("main")).toContainText("0.008 ₿");
});
