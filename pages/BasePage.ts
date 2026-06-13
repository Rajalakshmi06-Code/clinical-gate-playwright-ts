import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'networkidle' });
  }

  async smartClick(primaryLocator: Locator, fallbackSelector: string, timeout = 3000): Promise<void> {
    try {
      await primaryLocator.waitFor({ state: 'visible', timeout });
      await primaryLocator.click();
      console.log(`[INFRASTRUCTURE] Action executed via primary semantic locator.`);
    } catch (error) {
      console.warn(`[SELF-HEALING] Primary locator timed out. Resolving via fallback: ${fallbackSelector}`);
      const fallbackElement = this.page.locator(fallbackSelector);
      await fallbackElement.waitFor({ state: 'visible', timeout });
      await fallbackElement.click();
    }
  }

  async smartFill(primaryLocator: Locator, fallbackSelector: string, text: string, timeout = 3000): Promise<void> {
    try {
      await primaryLocator.waitFor({ state: 'visible', timeout });
      await primaryLocator.fill(text);
    } catch (error) {
      console.warn(`[SELF-HEALING] Input locator timed out. Resolving via fallback: ${fallbackSelector}`);
      const fallbackElement = this.page.locator(fallbackSelector);
      await fallbackElement.waitFor({ state: 'visible', timeout });
      await fallbackElement.fill(text);
    }
  }
}