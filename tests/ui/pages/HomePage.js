import { expect } from "@playwright/test";
import { SubscriptionSection } from "./SubscriptionSection";
import { SignupLoginPage } from "./SignupLoginPage.js";
import { ProductsPage } from "./ProductsPage.js";

export class HomePage {
    constructor(page) {
        this.page = page;
        this.subscription = new SubscriptionSection(page);
    }

    get loginAndSignupLink() {
        return this.page.getByRole("link", { name: /Signup \/ Login/i });
    }

    get productsLink(){
        return this.page.getByRole("link", { name: / Products/i });
    }

    async goToSignupLoginPage() {
        await this.loginAndSignupLink.click();
        return new SignupLoginPage(this.page);
    }

    async goToProductsPage() {
        await this.productsLink.click();
        return new ProductsPage(this.page);
    }








    

    get deleteButton() {
        return this.page.locator("[href='/delete_account']");
    }

    get homepageLink() {
        return this.page.locator(".navbar-nav li:first-child a");
    }

    get categoriesHeader() {
        return this.page.locator(".category-products");
    }

    get footer() {
        return this.page.locator("#footer");
    }

    get header() {
        return this.page.locator("#header");
    }

    get recommendedItemsHeader() {
        return this.page.getByRole("heading", { name: "recommended items" });
    }

    get scrollUpBtn() {
        return this.page.locator("#scrollUp");
    }

    get headerText() {
        return this.page
            .locator(
                "h2:has-text('Full-Fledged practice website for Automation Engineers')"
            )
            .first();
    }









    

    async goToRecommendedItems() {
        await expect(this.recommendedItemsHeader).toBeVisible();
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
