import puppeteer, { Browser, Page } from "puppeteer";

describe("App.tsx", () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: "new",
		});
		page = await browser.newPage();
	});

	it("contains signin text", async () => {
		await page.goto("http://localhost:5173");
		await page.waitForSelector("h1");
		const text = await page.$eval("h1", (e) => e.textContent);
		expect(text).toContain("Sign In");
	});

	afterAll(() => browser.close());
});
