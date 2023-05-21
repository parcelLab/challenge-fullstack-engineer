import puppeteer, { Browser, Page } from "puppeteer";

const BASE_URL = "http://localhost:5173";
const TEST_ORDER_ID = "ORD-123-2018";

describe("App.tsx", () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: "new",
		});
		page = await browser.newPage();
	});

	describe("Home page", () => {
		beforeEach(async () => {
			await page.goto(BASE_URL);
		});
		it("contains signin text", async () => {
			await page.waitForSelector("h1");
			const text = await page.$eval("h1", (e) => e.textContent);
			expect(text).toContain("Sign In");
		});
		it("container email input", async () => {
			await page.waitForSelector("input[name=email]");
			const value = await page.$eval("h1", (e) => e.nodeValue);
			expect(value).toBe(null);
		});
		it("shows error text if invalid email is entered", async () => {
			await page.waitForSelector("input[name=email]");
			await page.waitForSelector("button[type=submit]");

			await page.$eval(
				"input[name=email]",
				(el) => (el.value = "yolo@yolo.com")
			);

			await page.click("button[type=submit]");

			await page.waitForSelector("#signInServerError");
			const text = await page.$eval(
				"#signInServerError",
				(e) => e.textContent
			);
			expect(text).toContain("Invalid Email");
		});

		it("redirects to orders if valid email is entered", async () => {
			await page.waitForSelector("input[name=email]");
			await page.waitForSelector("button[type=submit]");

			await page.$eval(
				"input[name=email]",
				(el) => (el.value = "julian@parcellab.com")
			);

			await page.click("button[type=submit]");

			await page.waitForNavigation({ waitUntil: "networkidle0" });

			const url = await page.url();

			expect(url).toContain("/orders");
		});
	});

	describe("Orders page", () => {
		it("contains title 'Orders'", async () => {
			await page.goto(`${BASE_URL}/orders`);
			await page.waitForSelector("h1");
			const text = await page.$eval("h1", (e) => e.textContent);
			expect(text).toContain("Orders");
		});

		it(`contains order with ${TEST_ORDER_ID}`, async () => {
			await page.goto(`${BASE_URL}/orders`);
			await page.waitForSelector(`a[href='/order/${TEST_ORDER_ID}']`);

			const text = await page.$eval(
				`a[href='/order/${TEST_ORDER_ID}']`,
				(e) => e.textContent
			);
			expect(text).toContain("parcelLab Tote Bag");
		});

		it("goes to order page when clicked on", async () => {
			await page.goto(`${BASE_URL}/orders`);
			await page.waitForSelector(`a[href='/order/${TEST_ORDER_ID}']`);

			await page.click(`a[href='/order/${TEST_ORDER_ID}']`);

			const url = await page.url();

			expect(url).toContain(`/order/${TEST_ORDER_ID}`);
		});
	});
	describe("Order/:id page", () => {
		it("contains title 'Order Details'", async () => {
			await page.goto(`${BASE_URL}/order/${TEST_ORDER_ID}`);
			await page.waitForSelector("h1");
			const text = await page.$eval("h1", (e) => e.textContent);
			expect(text).toContain("Order Details");
		});

		it("contains checkpoints", async () => {
			await page.goto(`${BASE_URL}/order/${TEST_ORDER_ID}`);
			await page.waitForSelector("h3");

			const text = await page.$eval("h3", (e) => e.textContent);
			expect(text).toContain("Checkpoints");
		});
	});

	describe("Logout", () => {
		it("redirects to signin screen", async () => {
			await page.goto(`${BASE_URL}/order/${TEST_ORDER_ID}`);
			await page.waitForSelector("nav button");

			await page.click("nav button");

			const url = await page.url();

			expect(url).toBe(`${BASE_URL}/`);
		});

		it("authorized pages are not accessible", async () => {
			await page.goto(`${BASE_URL}/orders`);
			await page.waitForSelector("h1");
			const text = await page.$eval("h1", (e) => e.textContent);
			expect(text).not.toContain("Orders");
			expect(text).toContain("Sign In");
		});
	});

	afterAll(() => browser.close());
});
