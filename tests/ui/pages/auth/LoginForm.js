export class LoginForm {
    constructor(page) {
        this.page = page;
    }

    get loggedInText() {
        return this.page.locator("li:has-text('Logged in as')");
    }

    get loginHeader() {
        return this.page.locator(".login-form h2");
    }

    get incorrectLoginText() {
        return this.page.locator("[action='/login'] p");
    }

    get loginEmailInput() {
        return this.page.locator("[data-qa='login-email']");
    }

    get passwordInput() {
        return this.page.locator("[data-qa='login-password']");
    }

    get loginButton() {
        return this.page.locator("[data-qa='login-button']");
    }

    async login(user) {
        await this.loginEmailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();
    }
}
