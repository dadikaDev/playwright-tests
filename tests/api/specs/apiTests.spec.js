import { test, expect } from "@playwright/test";
import { expectHttpStatus } from "../utils/api.assertions";
import { parseJson } from "../utils/api.parsers";
import { VALID_USER, INVALID_USER, NEW_USER } from "../data/usersData";

const BASE_URL = "https://automationexercise.com/api";
const PRODUCTS_LIST = "/productsList";
const BRANDS_LIST = "/brandsList";
const SEARCH_PRODUCT = "/searchProduct";
const VERIFY_LOGIN = "/verifyLogin";
const CREATE_ACCOUNT = "/createAccount";
const DELETE_ACCOUNT = "/deleteAccount";
const UPDATE_ACCOUNT = "/updateAccount";
const GET_USER_DETAIL_BY_EMAIL = "/getUserDetailByEmail";

test.describe("api tests", () => {
    test("API 1: Get All Products List", async ({ request }) => {
        const response = await request.get(`${BASE_URL}${PRODUCTS_LIST}`);

        expectHttpStatus(response);

        const body = await parseJson(response);
        expect(body.responseCode).toBe(200);
        expect(body.products.length).toBeGreaterThan(0);
    });

    test("API 2: POST To All Products List", async ({ request }) => {
        const response = await request.post(`${BASE_URL}${PRODUCTS_LIST}`);

        const body = await parseJson(response);
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe("This request method is not supported.");
    });

    test("API 3: Get All Brands List", async ({ request }) => {
        const response = await request.get(`${BASE_URL}${BRANDS_LIST}`);

        expectHttpStatus(response);

        const body = await parseJson(response);
        expect(body).toHaveProperty("brands");
        expect(body.brands.length).toBeGreaterThan(0);
    });

    test("API 4: PUT To All Brands List", async ({ request }) => {
        const response = await request.put(`${BASE_URL}${BRANDS_LIST}`);

        const body = await parseJson(response);
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe("This request method is not supported.");
    });

    test("API 5: POST To Search Product", async ({ request }) => {
        const response = await request.post(`${BASE_URL}${SEARCH_PRODUCT}`, {
            form: {
                search_product: "tshirt",
            },
        });

        expectHttpStatus(response);

        const body = await parseJson(response);
        expect(body.responseCode).toBe(200);
        expect(body.products.length).toBeGreaterThan(0);
    });

    test("API 6: POST To Search Product without search_product parameter", async ({
        request,
    }) => {
        const response = await request.post(`${BASE_URL}${SEARCH_PRODUCT}`);

        const body = await parseJson(response);
        expect(body.responseCode).toBe(400);
        expect(body.message).toBe(
            "Bad request, search_product parameter is missing in POST request."
        );
    });

    test("API 7: POST To Verify Login with valid details", async ({
        request,
    }) => {
        const response = await request.post(`${BASE_URL}${VERIFY_LOGIN}`, {
            form: {
                ...VALID_USER,
            },
        });

        expectHttpStatus(response);

        const body = await parseJson(response);
        expect(body.responseCode).toBe(200);
        expect(body.message).toContain("User exists!");
    });

    test("API 8: POST To Verify Login without email parameter", async ({
        request,
    }) => {
        const response = await request.post(`${BASE_URL}${VERIFY_LOGIN}`, {
            form: {
                password: VALID_USER.password,
            },
        });

        const body = await parseJson(response);
        expect(body.responseCode).toBe(400);
        expect(body.message).toBe(
            "Bad request, email or password parameter is missing in POST request."
        );
    });

    test("API 9: DELETE To Verify Login", async ({ request }) => {
        const response = await request.delete(`${BASE_URL}${VERIFY_LOGIN}`);

        const body = await parseJson(response);
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe("This request method is not supported.");
    });

    test("API 10: POST To Verify Login with invalid details", async ({
        request,
    }) => {
        const response = await request.post(`${BASE_URL}${VERIFY_LOGIN}`, {
            form: {
                ...INVALID_USER,
            },
        });

        const body = await parseJson(response);
        expect(body.responseCode).toBe(404);
        expect(body.message).toContain("User not found!");
    });

    test("API 11: POST To Create/Register User Account", async ({
        request,
    }) => {
        const response = await request.post(`${BASE_URL}${CREATE_ACCOUNT}`, {
            form: {
                ...NEW_USER,
            },
        });

        expectHttpStatus(response);

        const body = await parseJson(response);
        expect(body.responseCode).toBe(201);
        expect(body.message).toContain("User created!");
    });

    test("API 12: PUT METHOD To Update User Account", async ({ request }) => {
        const response = await request.put(`${BASE_URL}${UPDATE_ACCOUNT}`, {
            form: {
                ...NEW_USER,
                country: "United States",
                state: "New York",
                city: "New York",
            },
        });

        expectHttpStatus(response);

        const body = await parseJson(response);
        expect(body.responseCode).toBe(200);
        expect(body.message).toContain("User updated!");
    });

    test("API 13: DELETE METHOD To Delete User Account", async ({
        request,
    }) => {
        const response = await request.delete(`${BASE_URL}${DELETE_ACCOUNT}`, {
            form: {
                email: NEW_USER.email,
                password: NEW_USER.password,
            },
        });

        expectHttpStatus(response);

        const body = await parseJson(response);
        expect(body.responseCode).toBe(200);
        expect(body.message).toContain("Account deleted!");
    });

    test("API 14: GET user account detail by email", async ({ request }) => {
        const response = await request.get(
            `${BASE_URL}${GET_USER_DETAIL_BY_EMAIL}`,
            {
                params: { email: VALID_USER.email },
            }
        );

        expectHttpStatus(response);

        const body = await parseJson(response);
        expect(body).not.toBeNull(); 
        expect(typeof body).toBe("object"); 
        expect(body.user).toHaveProperty("id");
        expect(body.user).toHaveProperty("name");
        expect(body.user).toHaveProperty("email");
        expect(body.user.email).toBe(VALID_USER.email); 
        expect(Object.keys(body).length).toBeGreaterThan(0); 
    });
});
