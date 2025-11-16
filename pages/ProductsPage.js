import { expect } from "@playwright/test";

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productsLink = page.getByRole("link", { name: / Products/i });
    this.productsList = page.locator(
      'div.features_items:has(h2:has-text("All Products"))'
    );
    this.productName = page.locator(".product-information h2");
    this.productCategory = page.locator(".product-information p:first-of-type");
    this.productPrice = page.locator("span span");
    this.productAvailability = page.locator("b:has-text('Availability:')");
    this.productCondition = page.locator("b:has-text('Condition:')");
    this.productBrand = page.locator("b:has-text('Brand:')");
    this.productCards = page.locator(".single-products");
    this.searchButton = page.locator("button#submit_search");
    this.searchInput = page.getByPlaceholder("Search Product");
    this.searchedProductsHeader = page.locator(
      "h2:has-text('Searched Products')"
    );
    this.products = page.locator(".features_items .col-sm-4");
    this.overlayLinks = page.locator(".overlay-content a");
    this.modalClose = page.locator(".close-modal");
    this.quantityInput = page.locator("#quantity");
    this.addToCartButton = page.locator(".cart");
    this.categoryHeader = page.locator("h2:has-text('Category')");
    this.brandsHeader = page.getByRole("heading", { name: "Brands" });
    this.brandProducts = page.locator(".features_items");
    this.brandTitleText = page.locator(".title.text-center");
    this.reviewTitle = page.getByRole("link", { name: "Write Your Review" });
    this.nameField = page.locator("#name");
    this.emailField = page.locator("#email");
    this.reviewField = page.locator("#review");
    this.submitReviewButton = page.getByRole("button", { name: /submit/i });
    this.successMessage = page.getByText("Thank you for your review.");
  }
  async addProductToCartAndContinueShopping(index) {
    await this.products.nth(index).hover();
    await this.overlayLinks.nth(index).click();
    await this.modalClose.click();
  }

  async addProductToCart(index) {
    const product = this.products.nth(index);
    await product.hover();
    const addButton = this.overlayLinks.nth(index);
    await expect(addButton).toBeVisible();
    await addButton.click();
  }

  async addToCartFromDetail() {
    await this.addToCartButton.click();
  }

  getViewProductButton(productId) {
    return this.page.locator(`[href='/product_details/${productId}']`);
  }

  async goToProductsPage() {
    await this.productsLink.click();
    await expect(this.page).toHaveURL(/\/products/);
    await expect(this.productsList).toBeVisible();
  }

  async goToProductDetailPage(productId) {
    await this.getViewProductButton(productId).click();
    await expect(this.page).toHaveURL(
      new RegExp(`/product_details/${productId}`)
    );
  }

  async expectProductInfoVisible() {
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
    await expect(this.searchedProductsHeader).toBeVisible();

    const searchedCards = this.productCards.filter({ hasText: productName });
    for (const card of await searchedCards.all()) {
      await expect(card).toBeVisible();
      await expect(card).toContainText(new RegExp(productName, "i"));
    }
  }

  async increaseProductQuantity(quantity) {
    await this.quantityInput.fill(String(quantity));
  }

  async chooseCategory(mainCategory, subCategory) {
    await expect(this.categoryHeader).toBeVisible();

    const mainCat = this.page.locator(`a[href='#${mainCategory}']`);
    await mainCat.click();

    const subCat = this.page.getByRole("link", { name: subCategory });
    await subCat.click();

    await expect(
      this.page.getByRole("heading", {
        name: `${mainCategory} - ${subCategory} Products`,
      })
    ).toBeVisible();
  }

  async viewBrandProducts(brand) {
    await expect(this.brandsHeader).toBeVisible();

    await this.page.getByRole("link", { name: brand }).click();

    await expect(this.page).toHaveURL(
      new RegExp(`/brand_products/.*${brand.split(" ")[0]}`, "i")
    );

    await expect(this.brandTitleText).toContainText(brand);
  }
  
  async addReview(name, email, review) {
    await expect(this.reviewTitle).toBeVisible();
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.reviewField.fill(review);
    await this.submitReviewButton.click();
    await expect(this.successMessage).toBeVisible();
  }
}
