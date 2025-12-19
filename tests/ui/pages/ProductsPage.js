import { CartPage } from "./CartPage";
import { ProductDetailPage } from "./ProductDetailPage";

export class ProductsPage {
    constructor(page) {
        this.page = page;
    }

    get products() {
        return this.page.locator(".features_items .col-sm-4");
    }

    get cartLink() {
        return this.page.getByRole("link", { name: / Cart/i });
    }

    get overlayLinks() {
        return this.page.locator(".overlay-content a");
    }

    get continueShoppingBtn() {
        return this.page.locator(".close-modal");
    }

    get searchButton() {
        return this.page.locator("button#submit_search");
    }

    get searchInput() {
        return this.page.getByPlaceholder("Search Product");
    }

    get viewCartBtn() {
        return this.page.locator("p [href='/view_cart']");
    }

    get productCards() {
        return this.page.locator(".single-products");
    }

    async addProductToCartAndContinueShopping(index) {
        await this.products.nth(index).hover();
        await this.overlayLinks.nth(index).click();
        await this.continueShoppingBtn.click();
        return this;
    }

    async goToCartPage() {
        await this.cartLink.click();
        return new CartPage(this.page);
    }

    getViewProductButton(productId) {
        return this.page.locator(`[href='/product_details/${productId}']`);
    }

    async goToProductDetailPage(productId) {
        await this.getViewProductButton(productId).click();
        return new ProductDetailPage(this.page);
    }

    async searchProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();

        const searchedCards = this.productCards.filter({
            hasText: productName,
        });

        return searchedCards;
    }

    async addProductToCart(index) {
        const product = this.products.nth(index);
        await product.hover();
        const addToCartButton = this.overlayLinks.nth(index);
        await addToCartButton.click();
        return this;
    }

    async viewCart() {
        await this.viewCartBtn.click();
        return new CartPage(this.page);
    }





















    get productsLink() {
        return this.page.getByRole("link", { name: / Products/i });
    }

   

    get productsList() {
        return this.page.locator(
            'div.features_items:has(h2:has-text("All Products"))'
        );
    }

    get productName() {
        return this.page.locator(".product-information h2");
    }

    get productCategory() {
        return this.page.locator(".product-information p:first-of-type");
    }

    get productPrice() {
        return this.page.locator("span span");
    }

    get productAvailability() {
        return this.page.locator("b:has-text('Availability:')");
    }

    get productCondition() {
        return this.page.locator("b:has-text('Condition:')");
    }

    get productBrand() {
        return this.page.locator("b:has-text('Brand:')");
    }

    



    get searchedProductsHeader() {
        return this.page.locator("h2:has-text('Searched Products')");
    }

    





    get categoryHeader() {
        return this.page.locator("h2:has-text('Category')");
    }

    get brandsHeader() {
        return this.page.getByRole("heading", { name: "Brands" });
    }

    get brandProducts() {
        return this.page.locator(".features_items");
    }

    get brandTitleText() {
        return this.page.locator(".title.text-center");
    }

    get reviewTitle() {
        return this.page.getByRole("link", { name: "Write Your Review" });
    }

    get nameField() {
        return this.page.locator("#name");
    }

    get emailField() {
        return this.page.locator("#email");
    }

    get reviewField() {
        return this.page.locator("#review");
    }

    get submitReviewButton() {
        return this.page.getByRole("button", { name: /submit/i });
    }

    get successMessage() {
        return this.page.getByText("Thank you for your review.");
    }

    





    

    










    async expectProductInfoVisible() {
        await expect(this.productName).toBeVisible();
        await expect(this.productCategory).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productCondition).toBeVisible();
        await expect(this.productBrand).toBeVisible();
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
