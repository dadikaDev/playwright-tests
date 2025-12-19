import { test, expect } from "../../fixtures/homePageInit.fixture.js";
import { HomePage } from "../../pages/HomePage.js";
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
        productsPage = await homePage.goToProductsPage();
    });
    test("Test Case 1: Add Products to Cart", async () => {
        await productsPage.addProductToCartAndContinueShopping(
            firstProductIndex
        );
        await productsPage.addProductToCartAndContinueShopping(
            secondProductIndex
        );
        const cartPage = await productsPage.goToCartPage();
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
            const quantity = Number(
                (
                    await item.locator(".cart_quantity button").textContent()
                )?.trim() || "1"
            );

            expect(totalPrice).toBe(price * quantity);
        }
    });

    test("Test Case 2: Verify Product quantity in Cart", async ({ page }) => {
        const productDetailPage = await productsPage.goToProductDetailPage(
            productId
        );

        await expect(page).toHaveURL(
            new RegExp(`/product_details/${productId}`)
        );

        await productDetailPage.increaseProductQuantity(quantity);
        await productDetailPage.addToCart();

        const cartPage = await productDetailPage.goToCartPage();

        let actualQuantity;

        if ((await cartPage.quantityInput.count()) > 0) {
            actualQuantity = Number(await cartPage.quantityInput.inputValue());
        } else {
            actualQuantity = Number(
                (await cartPage.quantityButton.textContent())?.trim() || "1"
            );
        }

        expect(actualQuantity).toBe(expectedQuantity);
    });

    test("Test Case 3: Remove Products From Cart", async () => {
        await productsPage.addProductToCartAndContinueShopping(
            firstProductIndex
        );
        const cartPage = await productsPage.goToCartPage();

        await cartPage.removeProductFromCart();

        const initialCount = await cartPage.cartItems.count();
        await expect(cartPage.cartItems).toHaveCount(initialCount - 1);
    });

    test("Test Case 4: Search Products and Verify Cart After Login", async ({
        testUser,
    }) => {
        let cartPage;

        await test.step("Search products", async () => {
            const searchedCards = await productsPage.searchProduct(productName);
            for (const card of await searchedCards.all()) {
                await expect(card).toContainText(new RegExp(productName, "i"));
            }
        });

        await test.step("Add product to cart", async () => {
            await productsPage.addProductToCart(firstProductIndex);
            cartPage = await productsPage.viewCart();
            await expect(cartPage.cartItems).toHaveCount(expectedProductCount);
        });

        await test.step("Login", async () => {
            const signupLoginPage = await cartPage.goToSignupLoginPage();
            await signupLoginPage.loginUser(testUser);
            await expect(signupLoginPage.loginForm.loggedInText).toBeVisible();
        });

        await test.step("Verify that those products are visible in cart after login as well", async () => {
            const cartPage = await productsPage.goToCartPage();
            await expect(cartPage.cartItems).toHaveCount(expectedProductCount);

            await cartPage.deleteAccount();
        });
    });
});
