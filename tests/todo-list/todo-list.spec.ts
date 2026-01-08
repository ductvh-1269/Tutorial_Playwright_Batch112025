import { test, expect } from "@playwright/test";

test.describe("Todo List Tests", () => {
  test("User can add and complete a todo item", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");

    // FInd input with class 'new-todo' by role, then typing three Task, enter after each task
    const todoInput = page.locator("input.new-todo");
    await todoInput.fill("Task 1");
    await todoInput.press("Enter");
    await todoInput.fill("Task 2");
    await todoInput.press("Enter");
    await todoInput.fill("Task 3");
    await todoInput.press("Enter");

    // Get All list task and check completed for task 2

    const todoItems = page.locator(".todo-list li");
    await expect(todoItems).toHaveCount(3);

    const task2 = todoItems.nth(1);
    const toggle = task2.locator("input.toggle");
    await toggle.check();

    // Verify first task is Task 1
    const task1 = todoItems.nth(0);
    await expect(task1.locator("label")).toHaveText("Task 1");

    // Find task have text Task 3 and delete it
    const task3 = todoItems.filter({ hasText: "Task 3" });
    const destroyButton = task3.locator("button.destroy");
    await task3.hover();
    await destroyButton.click();

    // Verify only 2 tasks left and Task 3 is deleted
    await expect(todoItems).toHaveCount(2);
    await expect(page.locator('li', { hasText: 'Task 3' })).toHaveCount(0);
  });
});
