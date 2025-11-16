import { test } from "@playwright/test";
import { homePageIsVisible } from "../../../utils/home.js";
import {
  ProductsPage,
  CartPage,
  AuthNavigation,
  LoginForm,
  HomePage,
} from "../../../pages/index.js";
import { validUser } from "../../../data/users.js";
import {
  firstProductIndex,
  expectedProductCount,
  productId,
} from "../../../data/testData.js";

test.beforeEach(async ({ page }) => {
  await homePageIsVisible(page);
});

test.describe("Product Browsing & Interaction Tests", () => {
  test("Test Case 1: Verify All Products and product detail page", async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goToProductsPage();
    await productsPage.goToProductDetailPage(productId);
    await productsPage.expectProductInfoVisible();
  });

  test("Test Case 2: Search Product", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goToProductsPage();
    await productsPage.searchProduct("Top");
  });
  test("Test Case 3: View Category Products", async ({ page }) => {
    const productPage = new ProductsPage(page);

    await productPage.goToProductsPage();
    await productPage.chooseCategory("Women", "Dress");
    await productPage.chooseCategory("Men", "Jeans");
  });

  test("Test Case 4: View & Cart Brand Products", async ({ page }) => {
    const productPage = new ProductsPage(page);

    await productPage.goToProductsPage();
    await productPage.viewBrandProducts("Madame");
  });

  test("Test Case 5: Search Products and Verify Cart After Login", async ({
    page,
  }) => {
    const productPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const authNav = new AuthNavigation(page);
    const loginForm = new LoginForm(page);

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
    });
  });

  test("Test Case 6: Add review on product", async ({ page }) => {
    const productPage = new ProductsPage(page);

    await productPage.goToProductsPage();
    await productPage.goToProductDetailPage(productId);
    await productPage.addReview(validUser.name, validUser.email, "Review");
  });

  test("Test Case 7: Add to cart from Recommended items", async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.subscription.expectVisible();
    await homePage.goToRecommendedItems();
    await cartPage.addRecommendedItem();
    await cartPage.expectProductsAddedToCart(expectedProductCount);
  });
});
