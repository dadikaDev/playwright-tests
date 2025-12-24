export class SignupForm {
    constructor(page) {
        this.page = page;
    }

    get signupHeader() {
        return this.page.locator(".signup-form h2");
    }

    get nameInput() {
        return this.page.getByPlaceholder("Name");
    }

    get emailInput() {
        return this.page.locator("[data-qa='signup-email']");
    }

    get signupBtn() {
        return this.page.locator("[data-qa='signup-button']");
    }

    get newsletter() {
        return this.page.locator("#newsletter");
    }

    get specialOffersCheckbox() {
        return this.page.locator("#optin");
    }

    get genderFemale() {
        return this.page.locator("#id_gender2");
    }

    get accountPassword() {
        return this.page.locator("#password");
    }

    get day() {
        return this.page.locator("#days");
    }

    get month() {
        return this.page.locator("#months");
    }

    get year() {
        return this.page.locator("#years");
    }

    get firstNameInput() {
        return this.page.locator("#first_name");
    }

    get lastNameInput() {
        return this.page.locator("#last_name");
    }

    get companyInput() {
        return this.page.locator("#company");
    }

    get primaryAddress() {
        return this.page.locator("#address1");
    }

    get secondaryAddress() {
        return this.page.locator("#address2");
    }

    get countryInput() {
        return this.page.locator("#country");
    }

    get stateInput() {
        return this.page.locator("#state");
    }

    get cityInput() {
        return this.page.locator("#city");
    }

    get zipcodeInput() {
        return this.page.locator("#zipcode");
    }

    get mobileInput() {
        return this.page.locator("#mobile_number");
    }

    get createAccountButton() {
        return this.page.locator("[data-qa='create-account']");
    }

    get continueButton() {
        return this.page.locator("[data-qa='continue-button']");
    }

    get existingEmailMessage() {
        return this.page.getByText("Email Address already exist!");
    }

    async signupWithFullForm(user) {
        await this.nameInput.fill(user.name);
        await this.emailInput.fill(user.email);
        await this.signupBtn.click();
        await this.newsletter.check();
        await this.specialOffersCheckbox.check();
        await this.genderFemale.check();
        await this.accountPassword.fill(user.password);
        await this.day.selectOption("15");
        await this.month.selectOption({ label: "May" });
        await this.year.selectOption("1990");
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.primaryAddress.fill(user.address);
        await this.secondaryAddress.fill(user.address2);
        await this.countryInput.selectOption({ label: "United States" });
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipcodeInput.fill(String(user.zipcode));
        await this.mobileInput.fill(`${user.mobile}`);
        await this.createAccountButton.click();
        await this.continueButton.click();
    }

    async signupBasicInfo(user) {
        await this.nameInput.fill(user.name);
        await this.emailInput.fill(user.email);
        await this.signupBtn.click();
    }
}
