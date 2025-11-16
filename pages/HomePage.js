import { expect } from "@playwright/test";
import { SubscriptionSection } from "./SubscriptionSection";

export class HomePage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator("[href='/logout']");
    this.deleteButton = page.locator("[href='/delete_account']");
    this.homepageLink = page.locator(".navbar-nav li:first-child a");
    this.subscription = new SubscriptionSection(page);
    this.categoriesHeader = page.locator(".category-products");
    this.footer = page.locator("#footer");
    this.header = page.locator("#header");
    this.recommendedItemsHeader = page.getByRole("heading", {
      name: "recommended items",
    });
    this.scrollUpBtn = page.locator("#scrollUp");
    this.headerText = page
      .locator(
        "h2:has-text('Full-Fledged practice website for Automation Engineers')"
      )
      .first();
  }

  async goToRecommendedItems() {
    await expect(this.recommendedItemsHeader).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
    await expect(
      this.page.getByRole("link", { name: /Signup \/ Login/i })
    ).toBeVisible();
  }
  async expectDeleteButtonVisible() {
    await expect(this.deleteButton).toBeVisible();
  }

  async goToHomepage() {
    await this.homepageLink.click();
    await expect(this.homepageLink).toHaveCSS("color", "rgb(255, 165, 0)");
  }

  async scrollUpUsingArrowBtn() {
    await this.scrollUpBtn.click();
    await expect(this.headerText).toBeVisible();
  }

  async scrollUpWhithoutArrow() {
    await this.header.scrollIntoViewIfNeeded();
    await expect(this.headerText).toBeVisible();
  }
}
