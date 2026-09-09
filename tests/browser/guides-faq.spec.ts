import { test, expect } from "@playwright/test";
import { guideRedirects, guides } from "../../src/data/guides";
import { carFaqs, generalFaqGroups } from "../../src/data/faq";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/notify", (route) => route.fulfill({ status: 503, json: { ok: false, error: "本機測試：暫時無法收件" } }));
});

test("FAQ filters, text search, empty state and keyboard disclosure work", async ({ page }, testInfo) => {
  await page.goto("/faq");
  await expect(page.locator("main details")).toHaveCount(16);
  await page.getByRole("button", { name: "預算與付款", exact: true }).click();
  await expect(page.getByRole("button", { name: "預算與付款", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("main details")).toHaveCount(3);
  await page.getByRole("searchbox", { name: "想先了解什麼？" }).fill("零利率");
  await expect(page.locator("main details")).toHaveCount(1);
  const summary = page.locator("main details summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#cash-or-loan")).toHaveAttribute("open", "");
  await page.keyboard.press("Space");
  await expect(page.locator("#cash-or-loan")).not.toHaveAttribute("open", "");
  await page.getByRole("searchbox").fill("找不到的問題xyz");
  await expect(page.getByRole("heading", { name: "暫時沒有符合的問題" })).toBeVisible();
  await page.getByRole("button", { name: "查看全部問題", exact: true }).click();
  await expect(page.locator("main details")).toHaveCount(16);
  await page.getByRole("button", { name: "SWIFT 重點問答", exact: true }).click();
  await page.locator("#swift-vs-small-cars summary").click();
  await expect(page.locator("#swift-vs-small-cars table")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("faq-swift-comparison.png"), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole("link", { name: "前往 SWIFT 車型頁看完整問答" }).first().click();
  await expect(page).toHaveURL(/\/cars\/swift#swift-vs-small-cars$/);
  await expect(page.locator("#swift-vs-small-cars")).toHaveAttribute("open", "");
});

test("old guide URLs redirect permanently and open the right car answer", async ({ page, request }, testInfo) => {
  for (const redirect of guideRedirects) {
    const response = await request.get(redirect.source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(redirect.destination);
    await page.goto(redirect.source);
    expect(new URL(page.url()).pathname + new URL(page.url()).hash).toBe(redirect.destination);
    const hash = redirect.destination.split("#")[1];
    if (hash && redirect.destination.startsWith("/cars/")) {
      await expect(page.locator(`#${hash}`)).toHaveAttribute("open", "");
      await expect(page.locator(`#${hash} p`).first()).toBeVisible();
      await page.screenshot({ path: testInfo.outputPath(`${hash}.png`) });
    }
  }
});

test("guides link to readable answers and all FAQ content is present without JavaScript", async ({ page, request }) => {
  const bodyOnly = (html: string) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const hub = bodyOnly(await (await request.get("/faq")).text());
  for (const item of generalFaqGroups.flatMap((group) => group.items)) {
    expect(hub).toContain(item.answer);
  }
  for (const [carId, items] of Object.entries(carFaqs)) {
    const html = bodyOnly(await (await request.get(`/cars/${carId}`)).text());
    for (const item of items) expect(html).toContain(item.answer);
  }
  await page.goto("/guides/delivery-process");
  await expect(page).toHaveURL(/\/guides\/first-car#delivery$/);
  await expect(page.locator("#delivery h2")).toBeVisible();
  await page.getByRole("link", { name: "還有疑問？查看常見 QA →", exact: true }).click();
  await page.locator("#payment-inspection summary").click();
  await expect(page.locator("#payment-inspection")).toHaveAttribute("open", "");
  await expect(page.locator("#payment-inspection p").first()).toBeVisible();
});


test("compact entrances, single-line filters and answer typography retain a clear hierarchy", async ({ page }, testInfo) => {
  await page.goto("/");
  const entrance = page.locator("#guides");
  expect((await entrance.boundingBox())!.height).toBeLessThan(100);
  await expect(entrance.getByRole("heading")).toHaveText("購車指南");
  await expect(page.locator("#faq").getByRole("heading")).toHaveText("常見 QA");
  await entrance.scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("home-compact-entrances.png") });
  await entrance.getByRole("link").click();
  await expect(page.getByRole("navigation", { name: "購車流程", exact: true }).getByRole("link")).toHaveCount(6);
  await expect(page.getByRole("heading", { name: "第一次買車", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "舊車換新車", exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("guide-overview.png"), fullPage: true });
  await page.goto("/faq");
  const filters = page.getByRole("group", { name: "問題分類" });
  const buttons = await filters.getByRole("button").evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().top));
  expect(new Set(buttons).size).toBe(1);
  await filters.getByRole("button", { name: "Jimny 重點問答", exact: true }).click();
  await expect(page.locator("main details")).toHaveCount(2);
  await page.getByRole("button", { name: "清除篩選" }).click();
  await expect(filters.getByRole("button", { name: "全部問題", exact: true })).toBeInViewport();
  await page.locator("#total-cost summary").click();
  const sizes = await page.locator("#total-cost").evaluate((el) => ({
    question: parseFloat(getComputedStyle(el.querySelector("summary")!).fontSize),
    answer: parseFloat(getComputedStyle(el.querySelector("p")!).fontSize),
    source: parseFloat(getComputedStyle(el.querySelector('[aria-label="參考資料"] a')!).fontSize),
  }));
  expect(sizes.question).toBeGreaterThan(sizes.answer);
  expect(sizes.answer).toBeGreaterThan(sizes.source);
  expect(sizes.source).toBeLessThanOrEqual(12);
  await page.screenshot({ path: testInfo.outputPath("faq-readable-answer.png") });
  await page.locator("#total-cost").screenshot({ path: testInfo.outputPath("faq-answer-detail.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});


test("both guide flows navigate to readable steps and retain advisor identity", async ({ page, request }, testInfo) => {
  for (const guide of guides) {
    await page.goto("/guides");
    await page.getByRole("link", { name: `閱讀${guide.audience}指南` }).click();
    await expect(page).toHaveURL(new RegExp(`/guides/${guide.slug}$`));
    const flow = page.getByRole("navigation", { name: "購車流程", exact: true });
    for (const section of guide.sections) {
      const stepLink = flow.getByRole("link", { name: section.step });
      await stepLink.focus();
      await page.keyboard.press("Enter");
      await expect(page.locator(`#${section.id} h2`)).toBeInViewport();
    }
    const returnLink = page.getByRole("link", { name: "返回聯絡區，找鈺漣聊聊 ↑", exact: true });
    await returnLink.focus();
    await page.getByRole("region", { name: "找鈺漣聊，可以這樣開始" }).screenshot({ path: testInfo.outputPath(`${guide.slug}-return-contact.png`) });
    await page.keyboard.press("Enter");
    await expect(page.locator("#guide-contact")).toBeInViewport();
    await expect(page.locator("#guide-contact")).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "LINE 諮詢", exact: true })).toBeFocused();
    await expect(page.locator("[data-contact-actions]")).toHaveCount(1);
    const html = await (await request.get(`/guides/${guide.slug}`)).text();
    const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    for (const section of guide.sections) for (const paragraph of section.paragraphs) expect(body).toContain(paragraph);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const article = schemas.flatMap((schema) => schema["@graph"] || [schema]).find((node) => node["@type"] === "Article");
    expect(article.url).toBe(`https://suzuki-taipei.com/guides/${guide.slug}`);
    expect(article.headline).toBe(guide.title);
  }
  await page.goto("/guides#budget");
  await page.locator("#budget a").click();
  await expect(page).toHaveURL(/\/guides\/first-car#budget$/);
  for (const path of ["/", "/guides"]) {
    await page.goto(path);
    await expect(page.getByText(/我是鈺漣，從 2018 年/)).toContainText("2025 年起在 Suzuki 服務");
    await expect(page.getByRole("navigation", { name: "主要導覽", exact: true })).toContainText("張鈺漣");
    if (path === "/") await expect(page.getByRole("heading", { level: 1 })).toContainText("張鈺漣");
    else await expect(page.locator("main")).not.toContainText("張鈺漣");
  }
});
