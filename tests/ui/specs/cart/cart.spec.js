import { test, expect } from "../../fixtures/homePageInit.fixture.js";
import { HomePage } from "../../pages";
import {
    firstProductIndex,
    secondProductIndex,
    productId,
    quantity,
    productName,
    expectedQuantity,
    expectedProductCount,
} from "../../data/testData.js";

test.describe("Cart Functionality Tests", () => {
    let homePage;
    let productsPage;

    test.beforeEach(async ({ mainPage }) => {
        homePage = new HomePage(mainPage);
    });

    test("Test Case 1: Add Products to Cart", async () => {
        productsPage = await homePage.header.goToProductsPage();
        await productsPage.addProductToCartAndContinueShopping(
            firstProductIndex
        );
        await productsPage.addProductToCartAndContinueShopping(
            secondProductIndex
        );

        const cartPage = await productsPage.header.goToCartPage();
        const productCount = await cartPage.cartItems.count();

        for (let i = 0; i < productCount; i++) {
            const item = cartPage.cartItems.nth(i);
            const price = Number(
                (await item.locator(".cart_price p").textContent())
                    ?.replace("$", "")
                    .trim() || "0"
            );
            const totalPrice = Number(
                (await item.locator(".cart_total p").textContent())
                    ?.replace("$", "")
                    .trim() || "0"
            );
            const itemQuantity = Number(
                (
                    await item.locator(".cart_quantity button").textContent()
                )?.trim() || "1"
            );
            expect(totalPrice).toBe(price * itemQuantity);
        }
    });

    test("Test Case 2: Verify Product quantity in Cart", async ({
        mainPage,
    }) => {
        productsPage = await homePage.header.goToProductsPage();
        const productDetailPage = await productsPage.goToProductDetailPage(
            productId
        );

        await expect(mainPage).toHaveURL(
            new RegExp(`/product_details/${productId}`)
        );

        await productDetailPage.increaseProductQuantity(quantity);
        await productDetailPage.addToCart();

        const cartPage = await productDetailPage.goToCartPage();
        const actualQuantity = await cartPage.getProductQuantity();
        expect(actualQuantity).toBe(expectedQuantity);
    });

    test("Test Case 3: Remove Products From Cart", async () => {
        productsPage = await homePage.header.goToProductsPage();
        await productsPage.addProductToCartAndContinueShopping(
            firstProductIndex
        );

        const cartPage = await productsPage.header.goToCartPage();
        const initialCount = await cartPage.cartItems.count();

        await cartPage.removeProductFromCart();
        await expect(cartPage.cartItems).toHaveCount(initialCount - 1);
    });

    test("Test Case 4: Search Products and Verify Cart After Login", async ({
        testUser,
    }) => {
        productsPage = await homePage.header.goToProductsPage();
        await productsPage.searchForProduct(productName);

        const searchedCards = productsPage.getSearchResults(productName);

        for (const card of await searchedCards.all()) {
            await expect(card).toContainText(new RegExp(productName, "i"));
        }

        await productsPage.addProductToCart(firstProductIndex);
        let cartPage = await productsPage.viewCart();
        await expect(cartPage.cartItems).toHaveCount(expectedProductCount);

        const signupLoginPage = await cartPage.header.goToSignupLoginPage();
        await signupLoginPage.loginUser(testUser);
        await expect(signupLoginPage.loginForm.loggedInText).toBeVisible();

        cartPage = await productsPage.header.goToCartPage();
        await expect(cartPage.cartItems).toHaveCount(expectedProductCount);

        await cartPage.header.deleteAccount();
    });

    test("Test Case 5: Add to cart from Recommended items", async () => {
        await expect(homePage.recommendedItemsHeader).toBeVisible();

        await homePage.clickAddRecommendedItemToCart();
        const cartPage = await homePage.viewCart();

        await expect(cartPage.cartItems).toHaveCount(expectedProductCount);
    });
});
