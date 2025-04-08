// real_estate_tests/pages/login-page.js
const { By } = require('selenium-webdriver');
const BasePage = require('./base-page');

class LoginPage extends BasePage {
    // Locators
    USERNAME_INPUT = By.id("username");
    PASSWORD_INPUT = By.id("password");
    LOGIN_BUTTON = By.css(".login-button");
    ERROR_MESSAGE = By.css(".login-error");

    constructor(driver) {
        super(driver);
    }

    async enterUsername(username) {
        await this.inputText(this.USERNAME_INPUT, username);
    }

    async enterPassword(password) {
        await this.inputText(this.PASSWORD_INPUT, password);
    }

    async clickLogin() {
        await this.click(this.LOGIN_BUTTON);
    }

    async getErrorMessage() {
        return await this.getText(this.ERROR_MESSAGE);
    }

    async login(username, password) {
        await this.open("/login"); // Open the login page directly
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}

module.exports = LoginPage;