import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/notify", (route) => route.fulfill({ status: 503, json: { ok: false, error: "本機測試：暫時無法收件" } }));
  await page.clock.setFixedTime(new Date("2026-09-08T04:00:00+08:00"));
});

test("internal navigation preserves form and comparison state and preselects only the requested car", async ({ page }) => {
  await page.goto("/");
  const quickContact = page.getByRole("navigation", { name: "快速聯絡" });
  await expect(quickContact).toBeHidden();
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
  if (test.info().project.name === "mobile") {
    await expect(quickContact).toBeVisible();
    await expect(quickContact.getByRole("link", { name: "加入 LINE" })).toHaveAttribute("href", /^https:\/\/line\.me\//);
    await expect(quickContact.getByRole("link", { name: "電話諮詢" })).toHaveAttribute("href", "tel:0987629773");
    await page.evaluate(() => window.scrollTo({ top: 450, behavior: "instant" }));
    await expect(quickContact).toBeHidden();
  } else {
    await expect(quickContact).toBeHidden();
  }
  await page.getByRole("textbox", { name: "姓名", exact: true }).fill("本機保留輸入測試");
  await expect(quickContact).toBeHidden();
  await page.getByRole("textbox", { name: "聯絡方式", exact: true }).fill("0900000000");
  await page.getByRole("button", { name: "+ 加入比較", exact: true }).nth(1).click();
  await page.getByRole("link", { name: "查看 SWIFT 完整介紹", exact: true }).click();
  await expect(page).toHaveURL(/\/cars\/swift$/);
  const contacts = page.locator("[data-contact-actions]");
  await expect(contacts.getByRole("link", { name: "LINE 諮詢", exact: true })).toHaveAttribute("href", /^https:\/\/line\.me\//);
  await expect(contacts.getByRole("link", { name: "電話諮詢", exact: true })).toHaveAttribute("href", "tel:0987629773");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("navigation", { name: "主要導覽" }).getByRole("link", { name: "購車諮詢", exact: true }).click();
  await expect(page.locator("#contact-heading")).toBeFocused();
  await expect(page.getByRole("textbox", { name: "姓名", exact: true })).toHaveValue("本機保留輸入測試");
  await expect(page.getByRole("textbox", { name: "聯絡方式", exact: true })).toHaveValue("0900000000");
  await expect(page.getByRole("combobox", { name: "想了解車款", exact: true })).toHaveValue("SWIFT");
  await expect(page.getByRole("button", { name: "✓ 已選取比較", exact: true })).toHaveCount(1);
});
