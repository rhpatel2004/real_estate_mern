// real_estate_tests/pages/register-page.js
const { By } = require('selenium-webdriver');
const BasePage = require('./base-page');

class RegisterPage extends BasePage {
    // Locators
    USERNAME_INPUT = By.id("username");
    PASSWORD_INPUT = By.id("password");
    ROLE_SELECT = By.id("role");
    REGISTER_BUTTON = By.css(".register-button");
    ERROR_MESSAGE = By.css(".register-error");

    constructor(driver) {
        super(driver);
    }
    async enterUsername(username) {
        await this.inputText(this.USERNAME_INPUT, username);
    }

    async enterPassword(password) {
        await this.inputText(this.PASSWORD_INPUT, password);
    }

    async selectRole(role) {
       const roleDropdown = await this.findElement(this.ROLE_SELECT);
       await roleDropdown.sendKeys(role);
    }

    async clickRegister() {
        await this.click(this.REGISTER_BUTTON);
    }

    async getErrorMessage() {
        return await this.getText(this.ERROR_MESSAGE);
    }

    async register(username, password, role) {
        await this.open("/register");
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.selectRole(role);
        await this.clickRegister();
    }
}

module.exports = RegisterPage;