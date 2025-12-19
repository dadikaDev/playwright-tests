export class AuthNavigation {
    constructor(page) {
        this.page = page;
    }

    get loginLinkInModal() {
        return this.page.locator(".modal-content [href='/login']");
    }

    async openLoginFromModal() {
        await this.loginLinkInModal.click();
    }
}
