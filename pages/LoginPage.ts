import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async loginToPortal(): Promise<void> {
    await this.page.locator('input#txt-username').fill('John Doe');
    await this.page.locator('input#txt-password').fill('ThisIsNotAPassword');
    await this.page.locator('button#btn-login').click();
  }
}