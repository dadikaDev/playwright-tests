import { expect } from "@playwright/test";

export function expectHttpStatus(response, status = 200) {
    expect(response.status()).toBe(status);
}
