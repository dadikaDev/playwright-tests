import { test } from "@playwright/test";
import { homePageIsVisible } from "../../../utils/home.js";
import {
    ProductsPage,
    CartPage,
    DeleteAccountPage,
    CheckoutPage,
    AuthNavigation,
    SignupForm,
    LoginForm,
    HomePage,
} from "../../../../pages/index.js";
import { validUser } from "../../../data/users.js";
import {
    firstProductIndex,
    expectedProductCount,
    paymentData,
} from "../../../data/testData.js";

test.beforeEach(async ({ page }) => {
    await homePageIsVisible(page);
});

test.describe("Checkout & Order Placement Tests", () => {
    test("Test Case 1: Place Order: Register while Checkout", async ({
        page,
    }) => {
        const productPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const authNav = new AuthNavigation(page);
        const signupForm = new SignupForm(page);
        const deleteAccountPage = new DeleteAccountPage(page);

        await test.step("Add product to cart", async () => {
            await productPage.addProductToCart(firstProductIndex);
            await cartPage.viewCart();
            await cartPage.expectProductsAddedToCart(expectedProductCount);
        });

        await test.step("Register while checking out", async () => {
            await checkoutPage.goToCheckoutPage();
            await authNav.openLoginFromModal();
            await signupForm.signupWithFullForm(validUser);
        });

        await test.step("Place order with payment", async () => {
            await cartPage.goToCartPage();
            await checkoutPage.goToCheckoutPage();
            await checkoutPage.fillOrderDetailsPreventSubmit("Comment text");
            await checkoutPage.fillPaymentDetails(paymentData);
        });

        await test.step("Delete account after checkout", async () => {
            await deleteAccountPage.deleteAccount();
        });
    });

    test("Test Case 2: Place Order: Register before Checkout", async ({
        page,
    }) => {
        const authNav = new AuthNavigation(page);
        const signupForm = new SignupForm(page);
        const productPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const homePage = new HomePage(page);

        await test.step("Register before checkout", async () => {
            await authNav.goToAuth();
            await signupForm.expectSignupPageVisible();
            await signupForm.signupWithFullForm(validUser);
        });

        await test.step("Add product to cart", async () => {
            await productPage.addProductToCart(firstProductIndex);
            await cartPage.viewCart();
            await cartPage.expectProductsAddedToCart(expectedProductCount);
        });

        await test.step("Place order with payment", async () => {
            await checkoutPage.goToCheckoutPage();
            await checkoutPage.fillOrderDetails("Comment text");
            await checkoutPage.fillPaymentDetailsRealSubmit(paymentData);
        });

        await test.step("Logout after checkout", async () => {
            await homePage.logout();
        });
    });

    test("Test Case 3: Place Order: Login before Checkout", async ({
        page,
    }) => {
        const authNav = new AuthNavigation(page);
        const loginForm = new LoginForm(page);
        const productPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const deleteAccountPage = new DeleteAccountPage(page);

        await test.step("Login before checkout", async () => {
            await authNav.goToAuth();
            await loginForm.expectLoginPageVisible();
            await loginForm.login(validUser.email, validUser.password);
            await loginForm.expectUserLoggedIn();
        });

        await test.step("Add product to cart", async () => {
            await productPage.addProductToCart(firstProductIndex);
            await cartPage.viewCart();
            await cartPage.expectProductsAddedToCart(expectedProductCount);
        });

        await test.step("Place order with payment", async () => {
            await checkoutPage.goToCheckoutPage();
            await checkoutPage.fillOrderDetailsPreventSubmit("Comment text");
            await checkoutPage.fillPaymentDetails(paymentData);
        });
        await test.step("Delete account after checkout", async () => {
            await deleteAccountPage.deleteAccount();
        });
    });
    test("Test Case 4: Verify address details in checkout page", async ({
        page,
    }) => {
        const authNav = new AuthNavigation(page);
        const signupForm = new SignupForm(page);
        const productPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const deleteAccountPage = new DeleteAccountPage(page);

        await test.step("Register new user", async () => {
            await authNav.goToAuth();
            await signupForm.expectSignupPageVisible();
            await signupForm.signupWithFullForm(validUser);
        });

        await test.step("Add product to cart", async () => {
            await productPage.addProductToCart(firstProductIndex);
            await cartPage.viewCart();
        });

        await test.step("Navigate to checkout page", async () => {
            await checkoutPage.goToCheckoutPage();
        });

        await test.step("Verify address details", async () => {
            await checkoutPage.verifyAddressDetails(validUser);
        });

        await test.step("Delete account", async () => {
            await deleteAccountPage.deleteAccount();
        });
    });

    test("Test Case 5: Download Invoice after purchase order", async ({
        page,
    }) => {
        const productPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const authNav = new AuthNavigation(page);
        const signupForm = new SignupForm(page);
        const homePage = new HomePage(page);

        await test.step("Add product to cart", async () => {
            await productPage.addProductToCart(firstProductIndex);
            await cartPage.viewCart();
            await cartPage.expectProductsAddedToCart(expectedProductCount);
        });

        await test.step("Register while checking out", async () => {
            await checkoutPage.goToCheckoutPage();
            await authNav.openLoginFromModal();
            await signupForm.signupWithFullForm(validUser);
        });

        await test.step("Place order with payment", async () => {
            await cartPage.goToCartPage();
            await checkoutPage.goToCheckoutPage();
            await checkoutPage.fillOrderDetails("Comment");
            await checkoutPage.fillPaymentDetailsRealSubmit(paymentData);
        });

        await test.step("Download invoice", async () => {
            await checkoutPage.downloadInvoice();
        });

        await test.step("Logout after checkout", async () => {
            await homePage.logout();
        });
    });
});
