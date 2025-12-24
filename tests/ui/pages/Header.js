import { SignupLoginPage, CartPage, ProductsPage } from ".";
export class Header {
    constructor(page) {
        this.page = page;
    }

    get logoutBtn() {
        return this.page.getByRole("link", { name: /logout/i });
    }

    get deleteAccountButton() {
        return this.page.locator("[href='/delete_account']");
    }

    get continueButton() {
        return this.page.locator("[data-qa='continue-button']");
    }

    get loginAndSignupLink() {
        return this.page.getByRole("link", { name: /Signup \/ Login/i });
    }

    get productsLink() {
        return this.page.locator('a[href="/products"]');
    }

    get cartLink() {
        return this.page.getByRole("link", { name: / Cart/i }).first();
    }

    get subtitle() {
        return this.page
            .locator(
                "h2:has-text('Full-Fledged practice website for Automation Engineers')"
            )
            .first();
    }

    async goToSignupLoginPage() {
        await this.loginAndSignupLink.click();
        return new SignupLoginPage(this.page);
    }

    async goToProductsPage() {
        await this.productsLink.click();
        return new ProductsPage(this.page);
    }

    async goToCartPage() {
        await this.cartLink.click();
        return new CartPage(this.page);
    }

    async logout() {
        await this.logoutBtn.click();
    }

    async deleteAccount() {
        await this.deleteAccountButton.click();
        await this.continueButton.click();
    }
}
