import { CartPage, Header, ProductDetailPage } from ".";
export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.header = new Header(page);
    }

    get products() {
        return this.page.locator(".features_items .col-sm-4");
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

    mainCategory(main) {
        return this.page.locator(`a[href='#${main}']`);
    }

    subCategory(sub) {
        return this.page.getByRole("link", { name: sub });
    }

    get categoryHeader() {
        return this.page.locator(".features_items h2.title");
    }

    get brandsHeader() {
        return this.page.getByRole("heading", { name: "Brands" });
    }

    get brandTitleText() {
        return this.page.locator(".title.text-center");
    }

    async selectMainCategory(main) {
        await this.mainCategory(main).click();
    }

    async selectSubCategory(sub) {
        await this.subCategory(sub).click();
    }

    async selectCategory(main, sub) {
        await this.selectMainCategory(main);
        await this.selectSubCategory(sub);
    }

    async addProductToCartAndContinueShopping(index) {
        await this.products.nth(index).hover();
        await this.overlayLinks.nth(index).click();
        await this.continueShoppingBtn.click();
    }

    getViewProductButton(productId) {
        return this.page.locator(`[href='/product_details/${productId}']`);
    }

    async goToProductDetailPage(productId) {
        await this.getViewProductButton(productId).click();
        return new ProductDetailPage(this.page);
    }

    async searchForProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    getSearchResults(productName) {
        return this.productCards.filter({
            hasText: productName,
        });
    }

    async addProductToCart(index) {
        const product = this.products.nth(index);
        await product.hover();
        const addToCartButton = this.overlayLinks.nth(index);
        await addToCartButton.click();
    }

    async viewCart() {
        await this.viewCartBtn.click();
        return new CartPage(this.page);
    }

    brandName(brand) {
        return this.page.getByRole("link", { name: brand });
    }

    async selectBrand(brand) {
        await this.brandName(brand).click();
    }
}
