import { expect } from "@playwright/test";
import { SubscriptionSection } from "./SubscriptionSection";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.getByRole("link", { name: / Cart/i });
    this.subscription = new SubscriptionSection(page);
    this.cartItems = page.locator("tbody tr");
    this.viewCartButton = page.locator("p [href='/view_cart']");
    this.cartInfoSection = page.locator(".cart_info");
    this.removeProductButtons = page.locator(".cart_quantity_delete");
    this.addRecItemBtn = page
      .locator(".carousel-inner")
      .last()
      .getByText("Add to cart")
      .first();
    this.viewCartFromRecsBtn = page.getByRole("link", { name: "View Cart" });
  }

  async goToCartPage() {
    await this.cartLink.click();
  }

  async expectProductsAddedToCart(productCount) {
    await expect(this.page).toHaveURL(/\/view_cart/);
    await expect(this.cartItems).toHaveCount(productCount);
  }

  async verifyProductsInfoInCart(productCount) {
    for (let i = 0; i < productCount; i++) {
      const cartItemRow = this.cartItems.nth(i);
      await expect(cartItemRow).toBeVisible();

      const rawName = await cartItemRow
        .locator(".cart_description h4 a")
        .textContent();
      const rawPrice = await cartItemRow.locator(".cart_price p").textContent();
      const rawTotal = await cartItemRow.locator(".cart_total p").textContent();
      const rawQty = await cartItemRow
        .locator(".cart_quantity button")
        .textContent();

      const name = rawName ? rawName.trim() : "";
      const price = rawPrice ? rawPrice.trim() : "";
      const total = rawTotal ? rawTotal.trim() : "";
      const quantity = rawQty ? rawQty.trim() : "1";

      console.log(
        `Product ${
          i + 1
        }: ${name} | Price: ${price} | Quantity: ${quantity} | Total: ${total}`
      );

      const priceNum = Number(price.replace("$", "").trim());
      const totalNum = Number(total.replace("$", "").trim());
      expect(totalNum).toBe(priceNum * Number(quantity));
    }
  }

  async viewCart() {
    await this.viewCartButton.click();
  }

  async verifyQuantityOfProducts(expectedCount) {
    let quantity;
    if (
      (await this.cartInfoSection.locator(".cart_quantity input").count()) > 0
    ) {
      quantity = await this.cartInfoSection
        .locator(".cart_quantity input")
        .inputValue();
    } else {
      const qtyButtonText = await this.cartInfoSection
        .locator(".cart_quantity button")
        .textContent();
      quantity = qtyButtonText ? qtyButtonText.trim() : "1";
    }

    console.log("Quantity in cart:", quantity);

    expect(Number(quantity)).toBe(expectedCount);
  }

  async removeProductFromCart() {
    const initialCount = await this.cartItems.count();
    await this.removeProductButtons.first().click();
    await expect(this.cartItems).toHaveCount(initialCount - 1);
  }

  async addRecommendedItem() {
    await this.addRecItemBtn.click();
    await this.viewCartFromRecsBtn.click();
  }
}
