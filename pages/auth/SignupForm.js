// pages/auth/SignupForm.js
import { expect } from "@playwright/test";

export class SignupForm {
  constructor(page) {
    this.page = page;
    this.signupHeader = page.locator(".signup-form h2");
    this.nameInput = page.getByPlaceholder("Name");
    this.emailInput = page.locator("[data-qa='signup-email']");
    this.signupBtn = page.locator("[data-qa='signup-button']");
    this.accountHeader = page.getByText("Enter Account Information");
    this.newsletter = page.locator("#newsletter");
    this.offersCheckbox = page.locator("#optin");
    this.genderFemale = page.locator("#id_gender2");
    this.accountName = page.locator("#name");
    this.accountEmail = page.locator("#email");
    this.accountPassword = page.locator("#password");
    this.day = page.locator("#days");
    this.month = page.locator("#months");
    this.year = page.locator("#years");
    this.firstNameInput = page.locator("#first_name");
    this.lastNameInput = page.locator("#last_name");
    this.companyInput = page.locator("#company");
    this.addressInput = page.locator("#address1");
    this.address2Input = page.locator("#address2");
    this.countryInput = page.locator("#country");
    this.stateInput = page.locator("#state");
    this.cityInput = page.locator("#city");
    this.zipcodeInput = page.locator("#zipcode");
    this.mobileInput = page.locator("#mobile_number");
    this.createAccountBtn = page.locator("[data-qa='create-account']");
    this.accountCreatedMsg = page.locator("h2:first-child b");
    this.continueBtn = page.locator("[data-qa='continue-button']");
    this.existingEmailMessage = page.getByText("Email Address already exist!");
  }

  async signupWithFullForm(user) {
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.signupBtn.click();
    await expect(this.accountHeader).toBeVisible();

    await this.newsletter.check();
    await this.offersCheckbox.check();
    await this.genderFemale.check();

    await expect(this.accountName).toHaveValue(user.name);
    await expect(this.accountEmail).toHaveValue(user.email);
    await this.accountPassword.fill(user.password);
    await this.day.selectOption("15");
    await this.month.selectOption({ label: "May" });
    await this.year.selectOption("1990");
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    if (user.company) await this.companyInput.fill(user.company);
    await this.addressInput.fill(user.address);
    await this.address2Input.fill(user.address2);
    await this.countryInput.selectOption({ label: "United States" });
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(String(user.zipcode));
    await this.mobileInput.fill(`${user.mobile}`);

    await this.createAccountBtn.click();
    await expect(this.accountCreatedMsg).toBeVisible();
    await this.continueBtn.click();
  }

  async signupBasicInfo(user) {
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.signupBtn.click();
  }

  async expectExistingEmailError() {
    await expect(this.existingEmailMessage).toBeVisible();
  }

  async expectSignupPageVisible() {
    await expect(this.signupHeader).toBeVisible();
  }
}
