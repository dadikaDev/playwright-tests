import { test as base, expect } from "@playwright/test";
import { generateUser } from "../data/usersData.js";

let sharedUser;

export const test = base.extend({
    mainPage: async ({ page }, use) => {
        await page.goto("/");
        await expect(page).toHaveURL(/automationexercise\.com/);
        await use(page);
    },

    testUser: async ({}, use) => {
        if (!sharedUser) {
            sharedUser = generateUser();
        }
        await use(sharedUser);
    },
});

export { expect };
