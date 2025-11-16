import { expect } from "@playwright/test";

export class TestCasesPage {
  constructor(page) {
    this.page = page;
    this.testCasesLink = page
      .getByRole("link", { name: /Test Cases/i })
      .first();
  }

  async goToTestCasesPage() {
    await this.testCasesLink.click();
    await expect(this.page).toHaveURL(/\/test_cases/);
  }
}
