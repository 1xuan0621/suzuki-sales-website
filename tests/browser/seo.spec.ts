import { test, expect, type Page, type Route } from "@playwright/test";
import { contentRoutes, siteUrl } from "../../src/data/content";
import { cars } from "../../src/data/site";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/notify", (route) => route.fulfill({ status: 503, json: { ok: false, error: "本機測試：暫時無法收件" } }));
  await page.clock.setFixedTime(new Date("2026-09-08T04:00:00+08:00"));
});

test("all content is directly readable, has its own metadata and matches the sitemap", async ({ request }) => {
  for (const route of contentRoutes) {
    const response = await request.get(route.path);
    expect(response.status(), route.path).toBe(200);
    const html = await response.text();
    expect(html.match(/<h1[\s>]/g)?.length, route.path).toBe(1);
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*>/g) || [];
    expect(canonical, route.path).toHaveLength(1);
    expect(new URL((canonical[0] || "").match(/href="([^"]+)"/)![1]).href).toBe(siteUrl + route.path);
    expect(html).toContain(`<title>${route.title}</title>`);
    expect(new URL(html.match(/property="og:url" content="([^"]+)"/)![1]).href).toBe(siteUrl + route.path);
    expect(html).not.toMatch(/<meta[^>]*name="robots"[^>]*noindex/);
    expect(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")).not.toContain("2026 年 9 月購車禮遇");
    if (route.path.startsWith("/cars/")) {
      expect(html).toContain("車型常見 QA");
      expect(html).toContain("官方規配表（PDF）");
    }
  }
  for (const path of ["/cars/unknown", "/guides/unknown", "/visit/unknown"]) {
    expect((await request.get(path)).status()).toBe(404);
  }
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml.match(/<loc>/g)).toHaveLength(contentRoutes.length);
  expect(xml).not.toMatch(/<priority>|<changefreq>/);
  for (const route of contentRoutes) expect(xml).toContain(`<loc>${siteUrl}${route.path}</loc>`);
});

test("desktop and mobile content layouts remain usable and screenshot-ready", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of contentRoutes) {
    await page.goto(route.path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const navigation = page.getByRole("navigation", { name: "主要導覽", exact: true });
    await expect(navigation.getByRole("link", { name: "全車款介紹", exact: true })).toHaveAttribute("href", "/#cars");
    await expect(navigation.getByRole("link", { name: /回首頁/ })).toHaveAttribute("href", "/");
    await expect(navigation.getByRole("link", { name: /回首頁/ })).not.toContainText("回首頁");
    await expect(navigation.getByRole("link", { name: /回首頁/ }).locator("svg")).toHaveCount(1);
    const contacts = page.locator("[data-contact-actions]");
    if (route.path === "/") {
      await expect(contacts).toHaveCount(0);
      const cards = page.getByRole("region", { name: "聯絡資訊", exact: true });
      await expect(cards.locator("article")).toHaveCount(3);
      await expect(cards.getByRole("link", { name: "立即撥打", exact: true })).toHaveAttribute("href", "tel:0987629773");
      await expect(cards.getByRole("link", { name: "加入好友", exact: true })).toHaveAttribute("href", /^https:\/\/line\.me\//);
      await expect(cards.getByRole("link", { name: "查看地圖", exact: true })).toHaveAttribute("href", /^https:\/\/www\.google\.com\/maps\//);
    } else {
      await expect(contacts).toHaveCount(1);
      await expect(contacts.getByRole("link")).toHaveCount(2);
      await expect(contacts.getByRole("link", { name: "LINE 諮詢", exact: true })).toHaveAttribute("href", /^https:\/\/line\.me\//);
      await expect(contacts.getByRole("link", { name: "電話諮詢", exact: true })).toHaveAttribute("href", "tel:0987629773");
      await expect(contacts.locator('svg[aria-hidden="true"]')).toHaveCount(2);
      await expect(contacts.getByRole("link", { name: "LINE 諮詢", exact: true })).toHaveCSS("background-color", "rgb(6, 199, 85)");
    }
    await expect(page.getByRole("link", { name: "諮詢這款車", exact: true })).toHaveCount(0);

    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.evaluate(() => document.fonts.ready);
    if (route.path.startsWith("/cars/")) {
      await expect.poll(() => page.locator("main img").first().evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    await page.screenshot({ path: testInfo.outputPath(`${route.path.replace(/\//g, "-") || "home"}-top.png`) });
    await page.screenshot({ path: testInfo.outputPath(`${route.path.replace(/\//g, "-") || "home"}.png`), fullPage: true });
  }
  expect(errors).toEqual([]);
});

test("internal navigation preserves form and comparison state and preselects only the requested car", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("姓名", { exact: true }).fill("本機保留輸入測試");
  await page.getByLabel("聯絡方式", { exact: true }).fill("0900000000");
  await page.getByRole("button", { name: "+ 加入比較", exact: true }).nth(1).click();
  await page.getByRole("link", { name: "查看 SWIFT 完整介紹", exact: true }).click();
  await expect(page).toHaveURL(/\/cars\/swift$/);
  await page.getByRole("navigation", { name: "主要導覽" }).getByRole("link", { name: "購車諮詢", exact: true }).click();
  await expect(page.locator("#contact-heading")).toBeFocused();
  await expect(page.getByLabel("姓名", { exact: true })).toHaveValue("本機保留輸入測試");
  await expect(page.getByLabel("聯絡方式", { exact: true })).toHaveValue("0900000000");
  await expect(page.getByRole("combobox", { name: "想了解車款", exact: true })).toHaveValue("SWIFT");
  await expect(page.getByRole("button", { name: "✓ 已選取比較", exact: true })).toHaveCount(1);
  await page.getByRole("link", { name: "查看 Jimny 2026 完整介紹", exact: true }).click();
  await expect(page).toHaveURL(/\/cars\/jimny$/);
  await page.getByRole("navigation", { name: "主要導覽" }).getByRole("link", { name: "購車諮詢", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "想了解車款", exact: true })).toHaveValue("Jimny 2026");
  await expect(page.getByLabel("姓名", { exact: true })).toHaveValue("本機保留輸入測試");
});

test("direct consultation links accept all six IDs and ignore unknown input", async ({ page }) => {
  for (const car of cars) {
    await page.goto(`/?car=${car.id}#contact`);
    await expect(page.getByRole("combobox", { name: "想了解車款", exact: true })).toHaveValue(car.name);
    await expect(page.locator("#contact-heading")).toBeFocused();
  }
  await page.goto("/?car=unknown#contact");
  await expect(page.getByRole("combobox", { name: "想了解車款", exact: true })).toHaveValue("");
  expect(await page.locator('script[src*="googletagmanager"]').count()).toBe(0);
});

test("an interrupted request keeps its ID and an in-flight receipt survives navigation", async ({ page }) => {
  let pending: Route | undefined;
  const ids: string[] = [];
  await page.route("**/api/notify", async (route) => {
    ids.push(route.request().postDataJSON().requestId);
    if (ids.length === 1) await route.abort("failed");
    else pending = route;
  });
  await page.goto("/?car=swift#contact");
  await page.getByLabel("姓名", { exact: true }).fill("本機非同步測試");
  await page.getByLabel("聯絡方式", { exact: true }).fill("0900000000");
  await page.getByRole("button", { name: "送出需求", exact: true }).click();
  await expect(page.getByText(/連線中斷，暫時無法確認收件/)).toBeVisible();
  await page.getByRole("button", { name: "送出需求", exact: true }).click();
  await expect.poll(() => Boolean(pending)).toBe(true);
  await page.getByRole("link", { name: "查看 SWIFT 完整介紹", exact: true }).click();
  await expect(page).toHaveURL(/\/cars\/swift$/);
  await page.getByRole("navigation", { name: "主要導覽" }).getByRole("link", { name: "購車諮詢", exact: true }).click();
  await expect(page.getByRole("button", { name: "送出中⋯", exact: true })).toBeDisabled();
  await pending!.fulfill({ status: 200, json: { ok: true, receipt: ids[1] } });
  await expect(page.getByRole("heading", { name: "需求已收件" })).toBeVisible();
  expect(ids).toHaveLength(2);
  expect(ids[0]).toBe(ids[1]);
});

test("standalone gallery restores focus and expired campaigns do not remove useful car content", async ({ page }) => {
  await page.goto("/cars/swift");
  const enlarge = page.getByRole("button", { name: /^放大 SWIFT/ });
  await enlarge.click();
  await page.getByRole("button", { name: "下一張", exact: true }).last().click();
  await expect(page.getByRole("dialog", { name: "SWIFT 照片檢視器" }).getByText("後側行駛外觀 · 2 / 3", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(enlarge).toBeFocused();
  await page.clock.setFixedTime(new Date("2026-10-01T00:00:00+08:00"));
  await page.reload();
  await expect(page.getByText("2026 年 9 月購車禮遇")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "SWIFT，你可能想問" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "主要導覽" }).getByRole("link", { name: "購車諮詢", exact: true })).toBeVisible();
});

async function analyticsEvents(page: Page) {
  return page.evaluate(() => (window.dataLayer || []).map((entry) => Array.from(entry as ArrayLike<unknown>)).filter((entry) => entry[0] === "event"));
}

test("production analytics is isolated: clicks, routes, receipt retries and failures are counted correctly", async ({ page, baseURL }) => {
  // Present the local server under the production hostname. Every request is
  // fulfilled locally; the real Google script and consultation API never run.
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ contentType: "application/javascript", body: "/* isolated analytics receiver */" }));
  await page.route(/https:\/\/[^/]*google-analytics\.com\//, (route) => route.abort());
  let attempts = 0;
  const ids: string[] = [];
  await page.route(`${siteUrl}/**`, async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === "/api/notify") {
      attempts++;
      const payload = route.request().postDataJSON();
      ids.push(payload.requestId);
      const responses = [
        { status: 503, json: { ok: false, error: "本機模擬暫時失敗" } },
        { status: 200, json: { ok: true, receipt: "mismatched-receipt" } },
        { status: 429, json: { ok: false } },
      ];
      await route.fulfill(responses[attempts - 1] || { status: 200, json: { ok: true, receipt: payload.requestId } });
      return;
    }
    const response = await route.fetch({ url: `${baseURL}${url.pathname}${url.search}` });
    await route.fulfill({ response });
  });
  await page.goto(`${siteUrl}/?contact=private-value#contact`);
  await expect.poll(async () => (await analyticsEvents(page)).filter((row) => row[1] === "page_view").length).toBe(1);
  // Cancel only the external navigation, leaving click instrumentation active.
  await page.evaluate(() => document.addEventListener("click", (event) => {
    if ((event.target as Element)?.closest('a[href^="tel:"], a[href^="https://line.me"]')) event.preventDefault();
  }));
  await page.getByRole("link", { name: "立即撥打", exact: true }).first().click();
  await page.getByRole("link", { name: "加入好友", exact: true }).click();
  await page.getByLabel("姓名", { exact: true }).fill("分析隔離測試");
  await page.getByLabel("聯絡方式", { exact: true }).fill("0900000000");
  await page.getByRole("combobox", { name: "想了解車款", exact: true }).selectOption("SWIFT");
  await page.getByRole("button", { name: "送出需求", exact: true }).click();
  await expect(page.getByText("本機模擬暫時失敗")).toBeVisible();
  // Returning with the same car must not reset the failed request's UUID.
  await page.getByRole("link", { name: "查看 SWIFT 完整介紹", exact: true }).click();
  await expect(page).toHaveURL(/\/cars\/swift$/);
  await page.getByRole("navigation", { name: "主要導覽" }).getByRole("link", { name: "購車諮詢", exact: true }).click();
  for (let attempt = 2; attempt <= 3; attempt++) {
    await page.getByRole("button", { name: "送出需求", exact: true }).click();
    await expect.poll(() => attempts).toBe(attempt);
    await expect(page.getByRole("button", { name: "送出需求", exact: true })).toBeEnabled();
    expect((await analyticsEvents(page)).filter((row) => row[1] === "generate_lead")).toHaveLength(0);
  }
  await page.getByRole("button", { name: "送出需求", exact: true }).click();
  await expect(page.getByRole("heading", { name: "需求已收件" })).toBeVisible();
  await page.getByRole("button", { name: /^SWIFT 靈活小車/ }).click();
  await page.getByRole("button", { name: "我有興趣", exact: true }).click();
  await page.getByRole("button", { name: "送出需求", exact: true }).click();
  await expect.poll(() => attempts).toBe(5);
  await expect(page.getByRole("heading", { name: "需求已收件" })).toBeVisible();
  const events = await analyticsEvents(page);
  expect(new Set(ids).size).toBe(1);
  expect(events.filter((row) => row[1] === "generate_lead")).toHaveLength(1);
  expect(events.filter((row) => row[1] === "phone_click")).toHaveLength(1);
  expect(events.filter((row) => row[1] === "line_click")).toHaveLength(1);
  expect(events.filter((row) => row[1] === "page_view")).toHaveLength(3);
  expect(events.filter((row) => row[1] === "consultation_click")).toHaveLength(2);
  expect(JSON.stringify(events)).not.toMatch(/分析隔離測試|0900000000|private-value|mismatched-receipt/);
  expect(JSON.stringify(events)).not.toContain(ids[0]);
});
