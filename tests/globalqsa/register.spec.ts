import { test, expect } from "@playwright/test";

test.describe("Register and Login Flow", () => {
  test("User can register and login successfully", async ({ page }) => {
    await page.goto(
      "https://globalsqa.com/angularJs-protractor/registration-login-example/#/login"
    );

    // wait for register link and click it
    const registerLink = page.locator("a", { hasText: "Register" });
    await expect(registerLink).toBeVisible();
    await registerLink.click();

    // Check h2 title is Register
    await expect(page.locator("h2")).toHaveText("Register");

    // fill registration form
    await page.fill('input[ng-model="vm.user.firstName"]', "John");
    await page.fill('input[ng-model="vm.user.lastName"]', "Doe");
    await page.fill('input[ng-model="vm.user.username"]', "username");
    await page.fill('input[ng-model="vm.user.password"]', "Test@1234");

    // click register button
    // using role for find button
    await page.getByRole("button", { name: "Register" }).click();

    // after register, it should redirect to login page
    await expect(page).toHaveURL(/.*#\/login/);

    await expect(page.locator("div.alert-success")).toHaveText(
      "Registration successful"
    );
  });
});
