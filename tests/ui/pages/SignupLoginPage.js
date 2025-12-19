import { AuthNavigation } from "./auth/AuthNavigation";
import { SignupForm } from "./auth/SignupForm";
import { LoginForm } from "./auth/LoginForm";
import { HomePage } from "./HomePage";

export class SignupLoginPage {
    constructor(page) {
        this.page = page;
        this.authNavigation = new AuthNavigation(page);
        this.signupForm = new SignupForm(page);
        this.loginForm = new LoginForm(page);
    }

    get logoutButton() {
        return this.page.locator("[href='/logout']");
    }

    async registerUser(user) {
        await this.signupForm.signupWithFullForm(user);
        return this;
    }

    async loginUser(user) {
        await this.loginForm.login(user);
        return this;
    }

    async logout() {
        await this.logoutButton.click();
        return new HomePage(this.page);
    }
}
