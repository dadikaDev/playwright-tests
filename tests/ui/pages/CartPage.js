import { SubscriptionSection, SignupLoginPage, CheckoutPage, Header } from ".";
export class CartPage {
    constructor(page) {
        this.page = page;
        this.subscription = new SubscriptionSection(page);
        this.header = new Header(page);
    }

    get cartItems() {
        return this.page.locator("tbody tr");
    }

    get cartInfoSection() {
        return this.page.locator(".cart_info");
    }

    get quantityButton() {
        return this.cartInfoSection.locator(".cart_quantity button");
    }

    get quantityInput() {
        return this.cartInfoSection.locator(".cart_quantity input");
    }

    get removeFromCartButtons() {
        return this.page.locator(".cart_quantity_delete");
    }

    get proceedToCheckoutBtn() {
        return this.page.locator(".check_out");
    }

    get loginLinkInModal() {
        return this.page.locator(".modal-content [href='/login']");
    }

    async removeProductFromCart(index = 0) {
        await this.removeFromCartButtons.nth(index).click();
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutBtn.click();
    }

    async openLoginFromModal() {
        await this.loginLinkInModal.click();
        return new SignupLoginPage(this.page);
    }

    async proceedToCheckoutExpectingRegistration(testUser) {
        await this.clickProceedToCheckout();
        const signupLoginPage = await this.openLoginFromModal();
        await signupLoginPage.registerUser(testUser);
    }

    async goToCheckoutPage() {
        await this.proceedToCheckoutBtn.click();
        return new CheckoutPage(this.page);
    }

    async getProductQuantity() {
        if ((await this.quantityInput.count()) > 0) {
            return Number(await this.quantityInput.inputValue());
        }

        return Number((await this.quantityButton.textContent())?.trim() || "1");
    }
}
