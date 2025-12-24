import { CartPage } from ".";
export class ProductDetailPage {
    constructor(page) {
        this.page = page;
    }

    get quantityInput() {
        return this.page.locator("#quantity");
    }

    get addToCartButton () {
        return this.page.locator(".cart");
    }

    get viewCartLink() {
        return this.page.getByRole("link", { name: "View Cart" });
    }

    get writeReviewTitle() {
        return this.page.getByText("Write Your Review");
    }

    get submitReviewButton() {
        return this.page.getByRole("button", { name: /submit/i });
    }

    get successMessage() {
        return this.page.getByText("Thank you for your review.");
    }

    get productDetails() {
        return {
            name: this.page.locator(".product-information h2"),
            category: this.page.locator(".product-information p:first-of-type"),
            price: this.page.locator(".product-information span span"),
            availability: this.page
                .locator(".product-information b:has-text('Availability:')")
                .locator(".."),
            condition: this.page
                .locator(".product-information b:has-text('Condition:')")
                .locator(".."),
            brand: this.page
                .locator(".product-information b:has-text('Brand:')")
                .locator(".."),
        };
    }

    get nameInput() {
        return this.page.locator("#name");
    }

    get emailInput() {
        return this.page.locator("#email");
    }

    get reviewInput() {
        return this.page.locator("#review");
    }

    async increaseProductQuantity(quantity) {
        await this.quantityInput.fill(String(quantity));
    }

    async addToCart() {
        await this.addToCartButton .click();
    }

    async goToCartPage() {
        await this.viewCartLink.click();
        return new CartPage(this.page);
    }

    async fillReviewForm({ name, email, review }) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.reviewInput.fill(review);
    }

    async clickSubmitReviewButton() {
        await this.submitReviewButton.click();
    }
}
