import { test, expect } from "../../fixtures/homePageInit.fixture.js";
import { HomePage } from "../../pages";
import {
    firstProductIndex,
    expectedProductCount,
    paymentData,
} from "../../data/testData.js";

test.describe("Checkout & Order Placement Tests", () => {
    let homePage;
    let productsPage;

    test.beforeEach(async ({ mainPage }) => {
        homePage = new HomePage(mainPage);
    });

    test("Test Case 1: Place Order: Register while Checkout", async ({
        testUser,
    }) => {
        productsPage = await homePage.header.goToProductsPage();
        await productsPage.addProductToCart(firstProductIndex);

        let cartPage = await productsPage.viewCart();
        await expect(cartPage.cartItems).toHaveCount(expectedProductCount);

        await cartPage.proceedToCheckoutExpectingRegistration(testUser);

        cartPage = await homePage.header.goToCartPage();
        const checkoutPage = await cartPage.goToCheckoutPage();

        const paymentPage = await checkoutPage.fillOrderDetails(
            "Comment text",
            { preventSubmit: true }
        );
        await paymentPage.fillPaymentDetails(paymentData);

        await expect(paymentPage.successMessage).toHaveText(
            "Your order has been placed successfully!"
        );

        await paymentPage.header.deleteAccount();
    });

    test("Test Case 2: Place Order: Register before Checkout", async ({
        testUser,
    }) => {
        const signupLoginPage = await homePage.header.goToSignupLoginPage();
        await signupLoginPage.registerUser(testUser);

        await expect(signupLoginPage.loginForm.loggedInText).toBeVisible();

        productsPage = await homePage.header.goToProductsPage();
        await productsPage.addProductToCart(firstProductIndex);

        const cartPage = await productsPage.viewCart();
        await expect(cartPage.cartItems).toHaveCount(expectedProductCount);

        const checkoutPage = await cartPage.goToCheckoutPage();
        const paymentPage = await checkoutPage.fillOrderDetails("Comment text");
        await paymentPage.fillPaymentDetails(paymentData);

        await paymentPage.header.logout();
        await expect(homePage.header.loginAndSignupLink).toBeVisible();
    });

    test("Test Case 3: Place Order: Login before Checkout", async ({
        testUser,
    }) => {
        const signupLoginPage = await homePage.header.goToSignupLoginPage();
        await signupLoginPage.loginUser(testUser);

        await expect(signupLoginPage.loginForm.loggedInText).toBeVisible();

        productsPage = await homePage.header.goToProductsPage();
        await productsPage.addProductToCart(firstProductIndex);

        const cartPage = await productsPage.viewCart();
        await expect(cartPage.cartItems).toHaveCount(expectedProductCount);

        const checkoutPage = await cartPage.goToCheckoutPage();
        const paymentPage = await checkoutPage.fillOrderDetails("Comment text");
        await paymentPage.fillPaymentDetails(paymentData);

        await paymentPage.header.deleteAccount();
    });

    test("Test Case 4: Verify address details in checkout page", async ({
        testUser,
    }) => {
        const signupLoginPage = await homePage.header.goToSignupLoginPage();
        await signupLoginPage.registerUser(testUser);

        await expect(signupLoginPage.loginForm.loggedInText).toBeVisible();

        productsPage = await homePage.header.goToProductsPage();
        await productsPage.addProductToCart(firstProductIndex);

        const cartPage = await productsPage.viewCart();
        const checkoutPage = await cartPage.goToCheckoutPage();

        await expect(checkoutPage.addressDelivery).toHaveText(testUser.address);
        await expect(checkoutPage.addressInvoice).toHaveText(testUser.address);

        await checkoutPage.header.deleteAccount();
    });

    test("Test Case 5: Download Invoice after purchase order", async ({
        testUser,
    }) => {
        productsPage = await homePage.header.goToProductsPage();
        await productsPage.addProductToCart(firstProductIndex);

        let cartPage = await productsPage.viewCart();
        await expect(cartPage.cartItems).toHaveCount(expectedProductCount);

        await cartPage.proceedToCheckoutExpectingRegistration(testUser);

        cartPage = await homePage.header.goToCartPage();
        const checkoutPage = await cartPage.goToCheckoutPage();

        const paymentPage = await checkoutPage.fillOrderDetails("Comment text");
        await paymentPage.fillPaymentDetails(paymentData);
        await paymentPage.downloadInvoice();

        await paymentPage.header.logout();
    });
});
