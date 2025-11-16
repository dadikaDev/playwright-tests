import { test } from "@playwright/test";
import { homePageIsVisible } from "../../../utils/home.js";
import {
  ProductsPage,
  CartPage,
  AuthNavigation,
  LoginForm,
  DeleteAccountPage,
} from "../../../pages/index.js";
import { validUser } from "../../../data/users.js";
import {
  firstProductIndex,
  secondProductIndex,
  expectedProductCount,
  productId,
  quantity,
} from "../../../data/testData.js";

test.beforeEach(async ({ page }) => {
  await homePageIsVisible(page);
});

test.describe("Cart Functionality Tests", () => {
  test("Test Case 1: Add Products in Cart", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.goToProductsPage();
    await productsPage.addProductToCartAndContinueShopping(firstProductIndex);
    await productsPage.addProductToCartAndContinueShopping(secondProductIndex);
    await cartPage.goToCartPage();
    await cartPage.expectProductsAddedToCart(expectedProductCount + 1);
    await cartPage.verifyProductsInfoInCart(expectedProductCount + 1);
  });

  test("Test Case 2: Verify Product quantity in Cart", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.goToProductDetailPage(productId);
    await productsPage.increaseProductQuantity(quantity);
    await productsPage.addToCartFromDetail();
    await cartPage.viewCart();
    await cartPage.verifyQuantityOfProducts(quantity);
  });

  test("Test Case 3: Remove Products From Cart", async ({ page }) => {
    const productPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productPage.addProductToCartAndContinueShopping(firstProductIndex);
    await cartPage.goToCartPage();
    await cartPage.expectProductsAddedToCart(expectedProductCount);
    await cartPage.removeProductFromCart();
  });

  test("Test Case 4: Search Products and Verify Cart After Login", async ({
    page,
  }) => {
    const productPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const authNav = new AuthNavigation(page);
    const loginForm = new LoginForm(page);
    const deleteAccountPage = new DeleteAccountPage(page);

    await test.step("Search products", async () => {
      await productPage.goToProductsPage();
      await productPage.searchProduct("Dress");
    });

    await test.step("Add product to cart", async () => {
      await productPage.addProductToCart(firstProductIndex);
      await cartPage.viewCart();
      await cartPage.expectProductsAddedToCart(expectedProductCount);
    });

    await test.step("Login", async () => {
      await authNav.goToAuth();
      await loginForm.login(validUser.email, validUser.password);
      await loginForm.expectUserLoggedIn();
    });

    await test.step("Verify that those products are visible in cart after login as well", async () => {
      await cartPage.goToCartPage();
      await cartPage.expectProductsAddedToCart(expectedProductCount);
      await deleteAccountPage.deleteAccount();
    });
  });
});
