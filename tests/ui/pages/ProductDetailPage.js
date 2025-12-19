import { CartPage } from "./CartPage";

export class ProductDetailPage {
    constructor(page) {
        this.page = page;
    }

    get quantityInput() {
        return this.page.locator("#quantity");
    }

    get addToCartBtn() {
        return this.page.locator(".cart");
    }

    get viewCartLink() {
        return this.page.getByRole("link", { name: "View Cart" });
    }

    async increaseProductQuantity(quantity) {
        await this.quantityInput.fill(String(quantity));
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }

    async goToCartPage() {
        await this.viewCartLink.click();
        return new CartPage(this.page);
    }
}
