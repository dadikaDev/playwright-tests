import { SubscriptionSection, Header, CartPage } from ".";
export class HomePage {
    constructor(page) {
        this.page = page;
        this.subscription = new SubscriptionSection(page);
        this.header = new Header(page);
    }

    get scrollUpBtn() {
        return this.page.locator("#scrollUp");
    }

    get headerSection() {
        return this.page.locator("#header");
    }

    get recommendedAddToCartButton () {
        return this.page
            .locator(".carousel-inner")
            .last()
            .getByText("Add to cart")
            .first();
    }

    get recommendedItemsHeader() {
        return this.page.getByRole("heading", { name: /recommended items/i });
    }

    get viewCartBtn() {
        return this.page.locator("p [href='/view_cart']");
    }

    async scrollUpUsingArrowBtn() {
        await this.scrollUpBtn.click();
    }

    async scrollUpWithoutArrow() {
        await this.headerSection.scrollIntoViewIfNeeded();
    }

    async clickAddRecommendedItemToCart() {
        await this.recommendedAddToCartButton .scrollIntoViewIfNeeded();
        await this.recommendedAddToCartButton .click();
    }

    async viewCart() {
        await this.viewCartBtn.click();
        return new CartPage(this.page);
    }
}
