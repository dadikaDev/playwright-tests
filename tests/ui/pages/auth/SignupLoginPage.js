import { SignupForm, LoginForm, Header } from "../";

export class SignupLoginPage {
    constructor(page) {
        this.page = page;
        this.signupForm = new SignupForm(page);
        this.loginForm = new LoginForm(page);
        this.header = new Header(page);
    }

    async registerUser(user) {
        await this.signupForm.signupWithFullForm(user);
    }

    async loginUser(user) {
        await this.loginForm.login(user);
    }
}
