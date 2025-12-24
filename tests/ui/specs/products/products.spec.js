import { test, expect } from "../../fixtures/homePageInit.fixture.js";
import { HomePage } from "../../pages";
import { reviewData } from "../../data/testData.js";
import { productId } from "../../data/testData.js";

test.describe("Product Browsing & Interaction Tests", () => {
    let homePage;
    let productsPage;

    test.beforeEach(async ({ mainPage }) => {
        homePage = new HomePage(mainPage);
        productsPage = await homePage.header.goToProductsPage();
    });

    test("Test Case 1: Verify All Products and product detail page", async () => {
        const productDetailPage = await productsPage.goToProductDetailPage(
            productId
        );

        const details = productDetailPage.productDetails;

        for (const locator of Object.values(details)) {
            await expect(locator).toBeVisible();
            await expect(locator).toHaveText(/.+/);
        }
    });

    test("Test Case 2: View Category Products", async () => {
        const mainCategoryWomen = "Women";
        const subCategoryDress = "Dress";

        await productsPage.selectCategory(mainCategoryWomen, subCategoryDress);
        await expect(productsPage.categoryHeader).toHaveText(
            `${mainCategoryWomen} - ${subCategoryDress} Products`
        );
        
        const mainCategoryMen = "Men";
        const subCategoryJeans = "Jeans";

        await productsPage.selectCategory(mainCategoryMen, subCategoryJeans);
        await expect(productsPage.categoryHeader).toHaveText(
            `${mainCategoryMen} - ${subCategoryJeans} Products`
        );
    });

    test("Test Case 3: View & Cart Brand Products", async ({ mainPage }) => {
        const brandName = "Madame";

        await expect(productsPage.brandsHeader).toBeVisible();

        await productsPage.selectBrand(brandName);
        await expect(mainPage).toHaveURL(
            new RegExp(`/brand_products/.*${brandName.split(" ")[0]}`, "i")
        );
        await expect(productsPage.brandTitleText).toContainText(brandName);
    });

    test("Test Case 4: Add review on product", async () => {
        const productDetailPage = await productsPage.goToProductDetailPage(
            productId
        );

        await expect(productDetailPage.writeReviewTitle).toBeVisible();

        await productDetailPage.fillReviewForm(reviewData);
        await productDetailPage.clickSubmitReviewButton();

        await expect(productDetailPage.successMessage).toBeVisible();
    });
});
