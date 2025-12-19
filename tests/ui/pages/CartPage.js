import { SubscriptionSection } from "./SubscriptionSection";
import { SignupLoginPage } from "./SignupLoginPage";
import { DeleteAccountPage } from "./DeleteAccountPage";

export class CartPage {
    constructor(page) {
        this.page = page;
        this.subscription = new SubscriptionSection(page);
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

    get loginAndSignupLink() {
        return this.page.getByRole("link", { name: /Signup \/ Login/i });
    }

    async goToSignupLoginPage() {
        await this.loginAndSignupLink.click();
        return new SignupLoginPage(this.page);
    }

    async deleteAccount() {
        const deleteAccountPage = new DeleteAccountPage(this.page);
        await deleteAccountPage.deleteAccount();
    }

    async removeProductFromCart(index = 0) {
        await this.removeFromCartButtons.nth(index).click();
    }










    get cartLink() {
        return this.page.getByRole("link", { name: / Cart/i });
    }



    get addRecItemBtn() {
        return this.page
            .locator(".carousel-inner")
            .last()
            .getByText("Add to cart")
            .first();
    }



    async addRecommendedItem() {
        await this.addRecItemBtn.click();
        await this.viewCartFromRecsBtn.click();
    }
}
